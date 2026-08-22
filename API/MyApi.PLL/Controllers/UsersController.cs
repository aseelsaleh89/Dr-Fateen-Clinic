using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DAL.Models;

namespace MyApi.PLL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users
                .Select(u => new
                {
                    id = u.Id,
                    fullName = u.FullName,
                    email = u.Email
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound("User not found");

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User deleted successfully");
        }

        [HttpPost("{id}/make-admin")]
        public async Task<IActionResult> MakeAdmin(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound("User not found");

            await _userManager.AddToRoleAsync(user, "Admin");

            return Ok("User is now Admin");
        }
    }
}