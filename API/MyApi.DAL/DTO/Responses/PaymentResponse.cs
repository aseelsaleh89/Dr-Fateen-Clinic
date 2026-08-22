using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.DAL.DTO.Responses
{
    public class PaymentResponse
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public string StripeSessionId { get; set; } = string.Empty;
    }
}