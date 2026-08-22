namespace MyApi.DAL.Models
{
    public class Payment : BaseModel
    {
        public int Id { get; set; }


        public int AppointmentId { get; set; }

        public Appointment? Appointment { get; set; }



        public decimal Amount { get; set; }


        public string PaymentStatus { get; set; } = "Pending";


        public string? StripePaymentIntentId { get; set; }

    }
}