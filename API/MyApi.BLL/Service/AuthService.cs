using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyApi.DAL.DTO.Requests;
using MyApi.DAL.Models;
using MyApi.DAL.DTO.Responses;
using Microsoft.AspNetCore.Identity;   
        

namespace MyApi.BLL.Service
{
public class AuthService : IAuthService    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IEmailSender emailSender,
            SignInManager<ApplicationUser> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailSender = emailSender;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

      public async Task<LoginResponse> LoginAsync(LoginRequest loginRequest)
{
    try
    {
        if (string.IsNullOrWhiteSpace(loginRequest.Email))
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "Email is required",
                UserId = null
            };
        }

        if (string.IsNullOrWhiteSpace(loginRequest.Password))
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "Password is required",
                UserId = null
            };
        }

        var user = await _userManager.FindByEmailAsync(loginRequest.Email);

        if (user == null)
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "User not found",
                UserId = null
            };
        }

        if (await _userManager.IsLockedOutAsync(user))
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "User account is locked",
                UserId = null
            };
        }

        var result = await _signInManager.CheckPasswordSignInAsync(
            user,
            loginRequest.Password,
            true
        );

        if (result.IsLockedOut)
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "User account is locked due to multiple failed attempts",
                UserId = null
            };
        }

        if (result.IsNotAllowed)
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "Please confirm your email",
                UserId = null
            };
        }

        if (!result.Succeeded)
        {
            return new LoginResponse
            {
                IsSuccess = false,
                Message = "Invalid email or password",
                UserId = null
            };
        }

        await _userManager.ResetAccessFailedCountAsync(user);

        // الحصول على الرول
        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault();

        // إنشاء التوكنات
        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        // حفظ Refresh Token
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);

        return new LoginResponse
        {
            IsSuccess = true,
            Message = "Login successful",
            UserId = user.Id,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            Role = role
        };
    }
    catch (Exception ex)
    {
        return new LoginResponse
        {
            IsSuccess = false,
            Message = "An error occurred during login",
            UserId = null,
            Errors = new List<string> { ex.Message }
        };
    }
}
        public async Task<RegisterResponse> RegisterAsync(RegisterUserRequest registerRequest)
        {
            try
            {
                var user = registerRequest.Adapt<ApplicationUser>();
                user.UserName = registerRequest.Email;
                user.Email = registerRequest.Email;

                var result = await _userManager.CreateAsync(user, registerRequest.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User");

                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    token = Uri.EscapeDataString(token);

                   var frontendUrl = _configuration["FrontendUrl"];

var emailUrl =
    $"{frontendUrl}/confirm-email?userId={user.Id}&token={token}";
                    var htmlMessage = $@"
                        <h1>Welcome to Hotelio!</h1>
                        <p>Thank you for registering in Hotelio Hotel Booking System.</p>
                        <a href='{emailUrl}'>Click here to verify your email</a>
                    ";

                    await _emailSender.SendEmailAsync(
                        user.Email!,
                        "Welcome to Hotelio",
                        htmlMessage
                    );

                    return new RegisterResponse
                    {
                        IsSuccess = true,
                        Message = "Registration successful. Please check your email to confirm.",
                        UserId = user.Id,
                        Errors = Array.Empty<string>()
                    };
                }

                return new RegisterResponse
                {
                    IsSuccess = false,
                    Message = "Registration failed",
                    UserId = null!,
                    Errors = result.Errors.Select(e => e.Description)
                };
            }
            catch (Exception ex)
            {
                return new RegisterResponse
                {
                    IsSuccess = false,
                    Message = "An error occurred during registration",
                    UserId = null!,
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<string> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return "User not found";

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
                return "Email confirmed successfully. Welcome to Hotelio.";

            return "Email confirmation failed: " +
                   string.Join(", ", result.Errors.Select(e => e.Description));
        }

        public async Task<ForgotPasswordResponse> RequestPasswordResetAsync(ForgotPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new ForgotPasswordResponse
                {
                    IsSuccess = false,
                    Message = "User not found",
                    Errors = Array.Empty<string>()
                };
            }

            var random = new Random();
            var resetCode = random.Next(1000, 9999).ToString();

            user.CodeResetPassword = resetCode;
            user.ExpireResetPassword = DateTime.UtcNow.AddMinutes(15);

            await _userManager.UpdateAsync(user);

            await _emailSender.SendEmailAsync(
                user.Email!,
                "Hotelio Password Reset Code",
                $"Your Hotelio password reset code is: {resetCode}"
            );

            return new ForgotPasswordResponse
            {
                IsSuccess = true,
                Message = "Password reset code sent. Please check your email.",
                Errors = Array.Empty<string>()
            };
        }

        public async Task<RestPasswordResponse> ResetPasswordAsync(ResetPasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return new RestPasswordResponse
                {
                    IsSuccess = false,
                    Message = "Email is required",
                    Errors = Array.Empty<string>()
                };
            }

            if (string.IsNullOrWhiteSpace(request.ResetCode))
            {
                return new RestPasswordResponse
                {
                    IsSuccess = false,
                    Message = "Reset code is required",
                    Errors = Array.Empty<string>()
                };
            }

            if (string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return new RestPasswordResponse
                {
                    IsSuccess = false,
                    Message = "New password is required",
                    Errors = Array.Empty<string>()
                };
            }

            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new RestPasswordResponse
                {
                    IsSuccess = false,
                    Message = "User not found",
                    Errors = Array.Empty<string>()
                };
            }

            if (user.CodeResetPassword != request.ResetCode ||
                user.ExpireResetPassword < DateTime.UtcNow)
            {
                return new RestPasswordResponse
                {
                    IsSuccess = false,
                    Message = "Invalid or expired reset code",
                    Errors = Array.Empty<string>()
                };
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(
                user,
                token,
                request.NewPassword
            );

            if (!result.Succeeded)
            {
                return new RestPasswordResponse
                {
                    IsSuccess = false,
                    Message = "Password does not meet requirements",
                    Errors = result.Errors.Select(e => e.Description)
                };
            }

            user.CodeResetPassword = null;
            user.ExpireResetPassword = null;

            await _userManager.UpdateAsync(user);

            await _emailSender.SendEmailAsync(
                user.Email!,
                "Hotelio Password Reset Successful",
                "Your Hotelio password has been successfully reset."
            );

            return new RestPasswordResponse
            {
                IsSuccess = true,
                Message = "Password reset successful",
                Errors = Array.Empty<string>()
            };
        }

        public async Task<LoginResponse> RefreshTokenAsync(TokenApiModelRequest request)
        {
            var accessToken = request.AccessToken;
            var refreshToken = request.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var userName = principal.Identity!.Name;

            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.UserName == userName);

            if (user == null ||
                user.RefreshToken != refreshToken ||
                user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return new LoginResponse
                {
                    IsSuccess = false,
                    Message = "Invalid refresh token",
                    UserId = null,
                    AccessToken = null,
                    RefreshToken = null
                };
            }

            var newAccessToken = await _tokenService.GenerateAccessToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _userManager.UpdateAsync(user);

            return new LoginResponse
            {
                IsSuccess = true,
                Message = "Token refreshed successfully",
                UserId = user.Id,
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }
    }
}