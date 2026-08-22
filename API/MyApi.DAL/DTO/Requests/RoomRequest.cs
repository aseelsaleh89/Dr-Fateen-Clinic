using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.DAL.DTO.Requests
{
    public class RoomRequest
    {
        public int HotelId { get; set; }
        public string RoomType { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public bool IsAvailable { get; set; } = true;
        public string ImageUrl { get; set; } = string.Empty;
    }
}