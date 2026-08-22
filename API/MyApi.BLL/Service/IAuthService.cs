using MyApi.DAL.DTO.Requests;
using MyApi.DAL.DTO.Responses;

namespace MyApi.BLL.Service
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);

        Task<RegisterResponse> RegisterAsync(RegisterUserRequest request);

        Task<string> ConfirmEmailAsync(string userId, string token);

        Task<ForgotPasswordResponse> RequestPasswordResetAsync(ForgotPasswordRequest request);

        Task<RestPasswordResponse> ResetPasswordAsync(ResetPasswordRequest request);

        Task<LoginResponse> RefreshTokenAsync(TokenApiModelRequest request);
    }
}