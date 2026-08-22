using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Data;
using MyApi.DAL.Models;

namespace MyApi.PLL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public PaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }



        // إنشاء عملية دفع
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePayment(
            [FromBody] Payment payment
        )
        {

            var appointmentExists = await _context.Appointments
                .AnyAsync(a => a.Id == payment.AppointmentId);


            if (!appointmentExists)
                return NotFound("Appointment not found");



            payment.PaymentStatus = "Pending";


            await _context.Payments.AddAsync(payment);

            await _context.SaveChangesAsync();



            return Ok(new
            {
                message = "Payment created successfully",
                paymentId = payment.Id
            });

        }





        // تأكيد الدفع
        [Authorize]
        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmPayment(int id)
        {

            var payment = await _context.Payments
                .FirstOrDefaultAsync(p => p.Id == id);



            if(payment == null)
                return NotFound("Payment not found");



            payment.PaymentStatus = "Completed";


            await _context.SaveChangesAsync();



            return Ok(new
            {
                message = "Payment confirmed successfully"
            });

        }





        // عرض كل المدفوعات
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {

            var payments = await _context.Payments
                .Include(p => p.Appointment)
                .ToListAsync();


            return Ok(payments);

        }

    }
}