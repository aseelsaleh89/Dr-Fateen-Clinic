using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Data;
using MyApi.DAL.Models;


namespace MyApi.Controllers
{

[ApiController]
[Route("api/admin/appointments")]
[Authorize(Roles="ADMIN")]
public class AdminAppointmentsController : ControllerBase
{


private readonly ApplicationDbContext _context;



public AdminAppointmentsController(
ApplicationDbContext context
)
{
    _context = context;
}





// GET ALL APPOINTMENTS

[HttpGet]

public async Task<IActionResult> GetAll()
{


var appointments =
await _context.Appointments

.Include(a=>a.Patient)

.Include(a=>a.MedicalService)

.OrderBy(a=>a.Date)

.ToListAsync();



return Ok(appointments);


}








// CREATE AVAILABLE APPOINTMENT

[HttpPost]

public async Task<IActionResult> Create(
Appointment appointment
)
{


appointment.IsAvailable = true;


_context.Appointments.Add(appointment);


await _context.SaveChangesAsync();



return Ok(new
{
message="تم إضافة الموعد بنجاح"
});


}









// DELETE APPOINTMENT

[HttpDelete("{id}")]

public async Task<IActionResult> Delete(
int id
)
{


var appointment =
await _context.Appointments
.FindAsync(id);



if(appointment == null)
return NotFound();



_context.Appointments.Remove(appointment);



await _context.SaveChangesAsync();



return Ok(new
{
message="تم حذف الموعد"
});


}









// CHANGE AVAILABILITY

[HttpPut("{id}")]

public async Task<IActionResult> UpdateStatus(
int id,
bool available
)
{


var appointment =
await _context.Appointments
.FindAsync(id);



if(appointment == null)
return NotFound();



appointment.IsAvailable = available;



await _context.SaveChangesAsync();



return Ok();

}



}


}