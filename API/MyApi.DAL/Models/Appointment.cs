using System.ComponentModel.DataAnnotations;

namespace MyApi.DAL.Models
{
    public class Appointment : BaseModel
    {

        public int Id { get; set; }


        [Required]
        public DateTime Date { get; set; }



        [Required]
        public string Time { get; set; } = string.Empty;



        // هل الموعد متاح للحجز
        public bool IsAvailable { get; set; } = true;




        // المستخدم الذي قام بالحجز
        public string? PatientId { get; set; }

        public ApplicationUser? Patient { get; set; }




        // اسم المريض (للحجوزات حتى لو بدون حساب)
        public string? PatientName { get; set; }



        public string? PhoneNumber { get; set; }




        // سبب الزيارة
        public string? Reason { get; set; }





        // الخدمة المطلوبة
        public int? MedicalServiceId { get; set; }

        public MedicalService? MedicalService { get; set; }



    }
}