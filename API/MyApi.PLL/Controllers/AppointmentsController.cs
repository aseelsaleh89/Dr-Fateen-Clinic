using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Data;
using System.Security.Claims;
using MyApi.DAL.Models;

using MyApi.DAL.DTO.Requests;

namespace MyApi.PLL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }





        // GET api/appointments/available
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
        .FirstOrDefaultAsync(x => x.Id == request.AppointmentId);


    if (appointment == null)
        return NotFound("Appointment not found");


    if (!appointment.IsAvailable)
        return BadRequest("Appointment already booked");


    appointment.IsAvailable = false;
    appointment.PatientId = userId;


    await _context.SaveChangesAsync();


    return Ok(new
    {
        message="Appointment booked successfully",
        appointmentId=appointment.Id
    });
}

        // GET api/appointments/my
        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyAppointments()
        {

            var userId = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );


            var appointments = await _context.Appointments
                .Where(x => x.PatientId == userId)
                .OrderBy(x => x.Date)
                .ToListAsync();


            return Ok(appointments);

        }
                // POST api/appointments
        [HttpPost]
      
        public async Task<IActionResult> CreateAppointment(
            [FromBody] Appointment appointment)
        {
            appointment.IsAvailable = true;

            await _context.Appointments.AddAsync(appointment);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Appointment created successfully",
                appointment
            });
        }


    }
}

 