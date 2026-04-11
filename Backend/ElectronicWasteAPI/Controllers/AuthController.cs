using BCrypt.Net;
using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using ElectronicWasteAPI.ViewModels;
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
        [Route("UploadUserImage")]
        [HttpPost]
        public IActionResult UploadUserImage([FromForm] UserImages image)
        {
            if (image.file == null) return BadRequest("No file uploaded");
            var postedFile = image.file;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/user_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
               postedFile.CopyTo(stream);
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
                role = user.Role,
                address=user.Address,
                userId=user.UserID
            };
            return Ok(data);    
            
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] userData user)
        {
            bool isNull = false;
            string savedPassword="";
            string address = "";
            int userId=0;
            if (user == null) return BadRequest(new { isNull = true });
            string sqls = @"select * from Users where Email=@Email";
            SqlCommand cmd = new SqlCommand(sqls, conn);
            if (conn.State == ConnectionState.Closed) conn.Open();
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Email", user.Email);
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                savedPassword = dt.Rows[0]["Password"].ToString();
                address = dt.Rows[0]["Address"].ToString();
                userId = Convert.ToInt32(dt.Rows[0]["UserID"]);
            }
            bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(user.Password, savedPassword);
            if (!isPasswordValid)
            {
                return BadRequest("user not valid");
            }
            var claims = new[]
            {
                    new Claim(ClaimTypes.Name, dt.Rows[0]["UserName"].ToString()),
                    new Claim(ClaimTypes.Role, dt.Rows[0]["Role"].ToString()),
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
            var data = new{ 
                token = new JwtSecurityTokenHandler().WriteToken(token),
                usertbl= dt,
                address=address,
                userId=userId,
            };
            return Ok(data);
               
        }
    }
}
