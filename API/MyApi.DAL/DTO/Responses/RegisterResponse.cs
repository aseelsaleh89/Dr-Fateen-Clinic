using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.DAL.DTO.Responses
{
    public class RegisterResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}