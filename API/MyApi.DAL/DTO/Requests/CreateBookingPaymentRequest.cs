namespace MyApi.DAL.DTO.Requests
{
    public class CreateBookingPaymentRequest
    {
        public int RoomId { get; set; }

        public string UserId { get; set; } = string.Empty;

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }
    }
}