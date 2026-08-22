namespace MyApi.DAL.Models
{
    public class Patient : BaseModel
    {
        public int Id { get; set; }


        public string FullName { get; set; } = string.Empty;


        public string PhoneNumber { get; set; } = string.Empty;


        public DateTime? BirthDate { get; set; }


        public string? Gender { get; set; }


        public ICollection<Appointment> Appointments { get; set; }
            = new List<Appointment>();
    }
}