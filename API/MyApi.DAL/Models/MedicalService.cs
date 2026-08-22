namespace MyApi.DAL.Models
{
    public class MedicalService : BaseModel
    {
        public int Id { get; set; }


        public string Name { get; set; } = string.Empty;


        public string? Description { get; set; }


        public decimal Price { get; set; }


        public ICollection<Appointment> Appointments { get; set; }
            = new List<Appointment>();

    }
}