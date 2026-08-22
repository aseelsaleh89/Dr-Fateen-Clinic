using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Data;
using MyApi.DAL.Models;

namespace MyApi.BLL.Service
{
    public class MedicalServiceManager
    {
        private readonly ApplicationDbContext _context;


        public MedicalServiceManager(ApplicationDbContext context)
        {
            _context = context;
        }



        public async Task<List<MedicalService>> GetAllServices()
        {
            return await _context.MedicalServices
                .ToListAsync();
        }



        public async Task<MedicalService?> GetById(int id)
        {
            return await _context.MedicalServices
                .FirstOrDefaultAsync(x => x.Id == id);
        }



        public async Task<MedicalService> Create(MedicalService service)
        {
            await _context.MedicalServices.AddAsync(service);

            await _context.SaveChangesAsync();

            return service;
        }



        public async Task<bool> Delete(int id)
        {
            var service = await _context.MedicalServices
                .FirstOrDefaultAsync(x => x.Id == id);


            if(service == null)
                return false;


            _context.MedicalServices.Remove(service);

            await _context.SaveChangesAsync();


            return true;
        }

    }
}