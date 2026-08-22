using Microsoft.AspNetCore.Mvc;
using MyApi.BLL.Service;
using MyApi.DAL.DTO.Requests;
using MyApi.DAL.DTO.Responses;

namespace MyApi.PLL.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest dto)
        {
            var result = await _authService.RegisterAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
        {
            var result = await _authService.ConfirmEmailAsync(userId, token);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest dto)
        {
            var result = await _authService.LoginAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var result = await _authService.RequestPasswordResetAsync(request);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest dto)
        {
            var result = await _authService.ResetPasswordAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenApiModelRequest request)
        {
            var result = await _authService.RefreshTokenAsync(request);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
    }
}