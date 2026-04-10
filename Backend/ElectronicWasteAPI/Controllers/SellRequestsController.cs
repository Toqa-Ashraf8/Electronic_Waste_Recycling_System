using ElectronicWasteAPI.EF;
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
    public class SellRequestsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;
        SqlConnection conn;
        public SellRequestsController(DataContext context, IWebHostEnvironment env)
        {
            _env = env;
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("GetBrandByItem")]
        [HttpPost]
        public IActionResult GetBrandByItem(int id)
        {
            DataTable dt = new DataTable();
            string sqlg = @"select * from Items where ItemID=@ItemID";
            if (conn.State == ConnectionState.Closed) conn.Open();
            using (SqlCommand cmd = new SqlCommand(sqlg, conn))
            {
                cmd.Parameters.AddWithValue("@ItemID", id);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return Ok(dt);
        }
        [Route("GetQualities")]
        [HttpGet]
        public IActionResult GetQualities()
        {
            DataTable dt = new DataTable();
            string sqlg = @"select Quality from Items";
            SqlDataAdapter da = new SqlDataAdapter(sqlg,conn);
            da.Fill(dt);
            return Ok(dt);
        }
        [Route("getItemsConditionByQuality")]
        [HttpPost]
        public IActionResult getItemsConditionByQuality([FromBody] ItemDetails item)
        {
            var conditions = new List<Conditions>();
            if (conn.State == ConnectionState.Closed) conn.Open();
            using (SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    
                    DataTable dt = new DataTable();
                    string searchquality = @"select * from Items where ItemID=@ItemID and Quality=@Quality";
                    using (SqlCommand cmd = new SqlCommand(searchquality, conn, transaction))
                    {
                        cmd.Parameters.AddWithValue("@ItemID", item.ItemID);
                        cmd.Parameters.AddWithValue("@Quality", item.Quality);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                    } 
                    if (dt.Rows.Count > 0)
                    {
                          conditions.Add(new Conditions
                          {
                             Condition = dt.Rows[0]["Condition"].ToString(),
                             EstimatedPrice = Convert.ToInt32(dt.Rows[0]["EstimatedPrice"])
                          });

                    }
                    else
                    {
                      DataTable dataTable = new DataTable();
                      string getCond = @"select Condition,EstimatedPrice from Qualities 
                                         where CategoryID=@CategoryID and Quality=@Quality";

                      using (SqlCommand cmd = new SqlCommand(getCond, conn, transaction))
                      {
                         cmd.Parameters.AddWithValue("@CategoryID", item.CategoryID);
                         cmd.Parameters.AddWithValue("@Quality", item.Quality);
                         SqlDataAdapter adp = new SqlDataAdapter(cmd);
                         adp.Fill(dataTable);
                      }
                        if (dataTable.Rows.Count > 0)
                        {
                            conditions.Add(new Conditions
                            {
                                Condition = dataTable.Rows[0]["Condition"].ToString(),
                                EstimatedPrice = Convert.ToInt32(dataTable.Rows[0]["EstimatedPrice"])
                            });

                        }
                    }  
                    transaction.Commit();
                    var data = new { conditions = conditions };
                    return Ok(data);
                }
               
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(new { error = ex.Message});
                }
                finally
                {
                    if (conn.State == ConnectionState.Open) conn.Close();
                }

            }
           
        }



    }
}
