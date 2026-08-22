using System.ComponentModel.DataAnnotations;

namespace MyApi.DAL.DTO.Requests
{
    public class ReviewRequest
    {
        [Required]
        public int HotelId { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(500)]
        public string Comment { get; set; } = string.Empty;
    }
}