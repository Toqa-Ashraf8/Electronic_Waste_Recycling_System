using BCrypt.Net;
using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly DataContext _context;
        private readonly JwtSettings _jwt;
        SqlConnection conn;
        public AuthController(IOptions<JwtSettings> jwt ,DataContext dataContext , IWebHostEnvironment env)
        {
            _jwt = jwt.Value;
            _env = env; 
            _context= dataContext;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Register user)
        {
            bool userExisted = false;
            string hashedPassword;
            var searchUser = await _context.Register.AnyAsync(u => u.Email == user.Email);
            if (searchUser)
            {
                return BadRequest(new { userExisted = true });
            }

            hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
            _context.Register.Add(user);
            await _context.SaveChangesAsync();


            var claims = new[]
           {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "MyEWasteApi",
                audience: "MyReactApp",
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );
            var data = new
            { token = new JwtSecurityTokenHandler().WriteToken(token),role = user.Role};
            return Ok(data);    
            
        }
       

    }
}
