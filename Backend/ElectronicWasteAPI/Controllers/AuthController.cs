using BCrypt.Net;
using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using ElectronicWasteAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
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
      
        public AuthController(IOptions<JwtSettings> jwt ,DataContext dataContext , IWebHostEnvironment env)
        {
            _jwt = jwt.Value;
            _env = env; 
            _context= dataContext;
        }
        [Route("UploadUserImage")]
        [HttpPost]
        public async Task<IActionResult> UploadUserImage([FromForm] UserImages image)
        {
            if (image.file == null) return BadRequest("No file uploaded");
            var postedFile = image.file;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/user_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
               await postedFile.CopyToAsync(stream);
            }
            return Ok (fileName);
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            bool userExisted = false;
            string hashedPassword;
            var searchUser = await _context.Users.AnyAsync(u => u.Email == user.Email);
            if (searchUser)
            {
                return BadRequest(new { userExisted = true });
            }

            hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
            user.Password = hashedPassword;
            _context.Users.Add(user);
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
            {   token = new JwtSecurityTokenHandler().WriteToken(token),
                userData=user
            };
            return Ok(data);    
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] userData userDto)
        {
            if (userDto == null) return BadRequest(new { isNull = true });
            var user = await _context.Users
                              .FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (user == null)
            {
                return BadRequest("User not found or invalid email");
            }
            bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(userDto.Password, user.Password);
            if (!isPasswordValid)
            {
                return BadRequest("Invalid password");
            }
            var claims = new[]
            {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString())
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
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                userData = user, 
            };
            return Ok(data);

        }

        [Route("GetOrdersCount")]
        [HttpPost]
        public async Task<IActionResult> GetOrdersCount(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            int allOrders = await _context.SellRequests
                .CountAsync(r => r.UserID == userId);

            int waitingOrders = await _context.SellRequests
                .CountAsync(r => r.UserID == userId && r.RequestStatus == 0);
            var data = new
            {
                orders = allOrders,
                pending = waitingOrders,
                points = user?.Points ?? 0
            };

            return Ok(data);
        }

    }
   
   
}
