using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
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
            string sqlg = "select * from vw_SellRequests where RequestStatus=0";
            SqlDataAdapter da = new SqlDataAdapter(sqlg, conn);
            da.Fill(dt);
            return Ok(dt);
        }

        [Route("SaveOrders")]
        [HttpPost]
        public IActionResult SaveOrders([FromBody] Orders ord)
        {
            bool saved = false;
            if (conn.State == ConnectionState.Closed) conn.Open();
            using (SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {

                    string insertorder = @"insert into Orders 
                                 (RequestID,UserID,CategoryID,ItemID,QualityID,Points,OrderStatus,CheckDate,Notes)
                                  values(@RequestID,@UserID,@CategoryID,@ItemID,@QualityID,@Points,@OrderStatus,@CheckDate,@Notes)
                                   select SCOPE_IDENTITY()";  
                        using (SqlCommand cmd = new SqlCommand(insertorder, conn, transaction))
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@RequestID", ord.RequestID);
                            cmd.Parameters.AddWithValue("@UserID", ord.UserID);
                            cmd.Parameters.AddWithValue("@CategoryID", ord.CategoryID);
                            cmd.Parameters.AddWithValue("@ItemID", ord.ItemID);
                            cmd.Parameters.AddWithValue("@QualityID", ord.QualityID);
                            cmd.Parameters.AddWithValue("@Points", ord.Points);
                            cmd.Parameters.AddWithValue("@OrderStatus", ord.OrderStatus);
                            cmd.Parameters.AddWithValue("@CheckDate", ord.CheckDate);
                            cmd.Parameters.AddWithValue("@Notes", ord.Notes);
                            cmd.ExecuteScalar();
                        }
                        if (ord.OrderStatus == 1)
                        {
                            string updateRequests = @"update SellRequests set RequestStatus=1 
                                                     where RequestID=@RequestID";
                            using (SqlCommand cmd = new SqlCommand(updateRequests, conn, transaction))
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@RequestID", ord.RequestID);
                                cmd.ExecuteNonQuery();
                            }
                        }
                        else if (ord.OrderStatus == 2)
                        {
                            string updateR = @"update SellRequests set RequestStatus=2 where RequestID=@RequestID";
                            using (SqlCommand cmd = new SqlCommand(updateR, conn, transaction))
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@RequestID", ord.RequestID);
                                cmd.ExecuteNonQuery();
                            }
                        }
                        saved = true;
                    
                    transaction.Commit();
                    var data = new { saved = saved };
                    return Ok(data);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(new { error = ex.Message });

                }
                finally
                {
                    if (conn.State == ConnectionState.Open) conn.Close();
                }
            }
        }

        [Route("GetOrders")]
        [HttpGet]
        public IActionResult GetOrders()
        {
            DataTable dt = new DataTable();
            string sqlg = "select * from vw_Orders";
            SqlDataAdapter da = new SqlDataAdapter(sqlg, conn);
            da.Fill(dt);
            return Ok(dt);
        }
        [Route("GetRejectedOrders")]
        [HttpGet]
        public IActionResult GetRejectedOrders()
        {
            DataTable dt = new DataTable();
            string sqlg = "select * from vw_Orders where OrderStatus=2";
            SqlDataAdapter da = new SqlDataAdapter(sqlg, conn);
            da.Fill(dt);
            return Ok(dt);
        }

    }
}
