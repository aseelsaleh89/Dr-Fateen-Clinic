using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.DAL.DTO.Requests
{
    public class ResetPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
        public string ResetCode { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}