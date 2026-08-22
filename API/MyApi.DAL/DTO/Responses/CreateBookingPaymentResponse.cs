namespace MyApi.DAL.DTO.Responses
{
    public class CreateBookingPaymentResponse
    {
        public int BookingId { get; set; }
        public string PaymentIntentId { get; set; } = string.Empty;
        public string ClientSecret { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}