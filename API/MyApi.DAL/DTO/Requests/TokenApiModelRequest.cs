using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace MyApi.DAL.DTO.Requests
{
    public class TokenApiModelRequest
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}