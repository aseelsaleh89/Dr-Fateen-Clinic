using System.ComponentModel.DataAnnotations;
namespace MyApi.DAL.DTO.Requests
{
    public class BookingRequest
    {
        [Required]
        public int RoomId { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public DateTime CheckInDate { get; set; }
        [Required]
        public DateTime CheckOutDate { get; set; }
    }
}