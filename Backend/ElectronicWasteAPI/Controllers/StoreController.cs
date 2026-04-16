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
    public class StoreController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public StoreController (DataContext context)
        {
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("GetProducts")]
        [HttpGet]
        public IActionResult GetProducts()
        {
            DataTable dt = new DataTable();
            string sqlg = "select * from Products";
            SqlDataAdapter da=new SqlDataAdapter(sqlg, conn);
            da.Fill(dt);
            return Ok(dt);

        }
        [Route("GetCategories")]
        [HttpGet]
        public IActionResult GetCategories()
        {
            DataTable dt = new DataTable();
            string sqlg = "select * from CartCategories";
            SqlDataAdapter da = new SqlDataAdapter(sqlg, conn);
            da.Fill(dt);
            return Ok(dt);
        }
        [Route("FilterProductsByCat")]
        [HttpPost]
        public IActionResult FilterProductsByCat(int catId)
        {
             
            DataTable dt = new DataTable();
            if (catId == 0)
            {
                string getAll = @"select * from Products";
                SqlDataAdapter da = new SqlDataAdapter(getAll, conn);
                da.Fill(dt);

            }
            else
            {
                string getP = @"select * from Products CategoryID=@CategoryID";
                using (SqlCommand cmd = new SqlCommand(getP, conn))
                {
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@CategoryID", catId);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);

                }
            }
           
            return Ok(dt);

        }
    }
}
