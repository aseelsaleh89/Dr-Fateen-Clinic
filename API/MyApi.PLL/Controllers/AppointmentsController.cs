using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Data;
using MyApi.DAL.Models;
using MyApi.DAL.DTO.Requests;
using System.Security.Claims;


namespace MyApi.PLL.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {


        private readonly ApplicationDbContext _context;


        public AppointmentsController(
            ApplicationDbContext context
        )
        {
            _context = context;
        }





        // =====================================
        // GET AVAILABLE APPOINTMENTS
        // Patient
        // =====================================


        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableAppointments()
        {


            var appointments = await _context.Appointments

                .Where(x => x.IsAvailable)

                .OrderBy(x => x.Date)

                .Select(x => new
                {

                    id = x.Id,

                    date = x.Date,

                    time = x.Time,

                    isAvailable = x.IsAvailable


                })

                .ToListAsync();



            return Ok(appointments);


        }








        // =====================================
        // BOOK APPOINTMENT
        // Patient
        // =====================================


        [Authorize]
        [HttpPost("book")]

        public async Task<IActionResult> BookAppointment(

            [FromBody] BookAppointmentRequest request

        )
        {


            var userId = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );



            var appointment = await _context.Appointments

                .FirstOrDefaultAsync(
                    x => x.Id == request.AppointmentId
                );



            if(appointment == null)

                return NotFound(
                    "Appointment not found"
                );




            if(!appointment.IsAvailable)

                return BadRequest(
                    "Appointment already booked"
                );





            var user = await _context.Users

                .FirstOrDefaultAsync(
                    x => x.Id == userId
                );





            appointment.IsAvailable = false;


            appointment.PatientId = userId;


            appointment.PatientName =
                user?.FullName;



            appointment.PhoneNumber =
                user?.PhoneNumber;



            await _context.SaveChangesAsync();





            return Ok(new
            {

                message =
                "Appointment booked successfully",


                appointmentId =
                appointment.Id

            });



        }










        // =====================================
        // MY APPOINTMENTS
        // Patient
        // =====================================


        [Authorize]

        [HttpGet("my")]

        public async Task<IActionResult> GetMyAppointments()
        {



            var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );



            var appointments =
            await _context.Appointments

            .Where(
                x => x.PatientId == userId
            )

            .OrderBy(x => x.Date)

            .ToListAsync();





            return Ok(appointments);



        }









        // =====================================
        // CREATE APPOINTMENT
        // Admin Doctor
        // =====================================



        [Authorize(Roles="ADMIN")]

       [HttpPost("create")]

        public async Task<IActionResult> CreateAppointment(

            [FromBody] Appointment appointment

        )
        {


            appointment.IsAvailable = true;


            appointment.PatientId = null;

            appointment.PatientName = null;

            appointment.PhoneNumber = null;




            await _context.Appointments.AddAsync(
                appointment
            );



            await _context.SaveChangesAsync();





            return Ok(new
            {

                message =
                "Appointment created successfully",


                appointment

            });



        }









        // =====================================
        // GET ALL APPOINTMENTS
        // Admin Dashboard
        // =====================================



        [Authorize(Roles="ADMIN")]

        [HttpGet("admin")]

        public async Task<IActionResult> GetAllAppointments()
        {


            var appointments = await _context.Appointments

            .Include(x=>x.Patient)

            .Include(x=>x.MedicalService)

            .OrderBy(x=>x.Date)

            .Select(x=>new
            {

                id = x.Id,

                date = x.Date,

                time = x.Time,


                isAvailable =
                x.IsAvailable,


                patientName =
                x.PatientName,


                phoneNumber =
                x.PhoneNumber,


                reason =
                x.Reason,


                service =
                x.MedicalService != null
                ? x.MedicalService.Name
                : null


            })

            .ToListAsync();





            return Ok(appointments);



        }









        // =====================================
        // DELETE APPOINTMENT
        // Admin
        // =====================================



        [Authorize(Roles="ADMIN")]

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteAppointment(

            int id

        )
        {


            var appointment =
            await _context.Appointments.FindAsync(id);




            if(appointment == null)

                return NotFound();




            _context.Appointments.Remove(
                appointment
            );



            await _context.SaveChangesAsync();





            return Ok(new
            {

                message =
                "Appointment deleted successfully"

            });



        }









        // =====================================
        // RESET APPOINTMENT
        // Admin
        // =====================================



        [Authorize(Roles="ADMIN")]

        [HttpPut("{id}/available")]

        public async Task<IActionResult> MakeAvailable(

            int id

        )
        {


            var appointment =
            await _context.Appointments.FindAsync(id);




            if(appointment == null)

                return NotFound();





            appointment.IsAvailable = true;


            appointment.PatientId = null;


            appointment.PatientName = null;


            appointment.PhoneNumber = null;



            await _context.SaveChangesAsync();





            return Ok(new
            {

                message =
                "Appointment is available again"

            });



        }





    }

}