using System.ComponentModel.DataAnnotations;
namespace MyApi.DAL.Models
{
    public class Appointment : BaseModel
    {
        public int Id { get; set; }


        public DateTime Date { get; set; }


        public string Time { get; set; } = string.Empty;


        public bool IsAvailable { get; set; } = true;



        // المريض الذي حجز الموعد
        public string? PatientId { get; set; }

        public ApplicationUser? Patient { get; set; }



        // سبب الزيارة
        public string? Reason { get; set; }



        // خدمة طبية
        public int? MedicalServiceId { get; set; }

        public MedicalService? MedicalService { get; set; }



        public string? PatientName { get; set; }

        public string? PhoneNumber { get; set; }

    }
}