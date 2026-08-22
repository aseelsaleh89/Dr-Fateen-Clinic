using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Data;
using MyApi.DAL.Models;

namespace MyApi.BLL.Service
{
    public class AppointmentService
    {

        private readonly ApplicationDbContext _context;


        public AppointmentService(ApplicationDbContext context)
        {
            _context = context;
        }



        public async Task<List<Appointment>> GetAvailableAppointments()
        {
            return await _context.Appointments
                .Where(x => x.IsAvailable)
                .OrderBy(x => x.Date)
                .ToListAsync();
        }



        public async Task<bool> BookAppointment(int appointmentId)
        {

            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(x => x.Id == appointmentId);


            if (appointment == null)
                return false;


            if (!appointment.IsAvailable)
                return false;


            appointment.IsAvailable = false;


            await _context.SaveChangesAsync();


            return true;
        }

    }
}