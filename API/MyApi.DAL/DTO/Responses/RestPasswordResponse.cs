using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.DAL.DTO.Responses
{
    public class RestPasswordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public IEnumerable<string>? Errors { get; set; }
    }
}