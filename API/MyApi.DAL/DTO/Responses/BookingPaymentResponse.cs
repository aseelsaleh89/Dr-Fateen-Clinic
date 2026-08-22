using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace MyApi.DAL.DTO.Responses
{
    public class BookingPaymentResponse
    {
        public int BookingId { get; set; }

        public int RoomId { get; set; }

        public string RoomType { get; set; } = string.Empty;

        public string HotelName { get; set; } = string.Empty;

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }

        public decimal TotalPrice { get; set; }

        public string Status { get; set; } = string.Empty;

        public string PaymentIntentId { get; set; } = string.Empty;

        public string ClientSecret { get; set; } = string.Empty;
    }
}