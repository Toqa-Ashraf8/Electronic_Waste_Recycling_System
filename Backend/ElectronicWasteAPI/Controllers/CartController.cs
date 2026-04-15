using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using ElectronicWasteAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;
        SqlConnection conn;
        public CartController(DataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("UploadProductImage")]
        [HttpPost]
        public IActionResult UploadProductImage([FromForm] ProductImage image)
        {
            if (image.pFile == null) return BadRequest("No file uploaded");
            var postedFile = image.pFile;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Products_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                postedFile.CopyTo(stream);
            }
            return Ok(fileName);
        }

        //[Route("UpsertProducts")]
        //[HttpPost]
        //public IActionResult UpsertProducts([FromBody]CartCategory cat)
        //{
















        //}

    }
}
