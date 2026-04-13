using ElectronicWasteAPI.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;
        SqlConnection conn;
        public OrdersController(DataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("GetOrderRequests")]
        [HttpGet]
        public IActionResult GetOrderRequests()
        {
            DataTable dt = new DataTable();
            string sqlg = "select * from vw_SellRequests";
            SqlDataAdapter da = new SqlDataAdapter(sqlg, conn);
            da.Fill(dt);
            return Ok(dt);
        }
    }
}
