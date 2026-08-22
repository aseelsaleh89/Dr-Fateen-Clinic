using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.DAL.DTO.Responses
{
    public class LoginResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public IEnumerable<string>? Errors { get; set; }
   public string? Role { get; set; }
    }
}