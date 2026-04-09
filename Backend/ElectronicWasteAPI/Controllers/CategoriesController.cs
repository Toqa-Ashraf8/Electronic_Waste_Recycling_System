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
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public CategoriesController(DataContext context)
        {
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("UpsertCategory")]
        [HttpPost]
        public IActionResult UpsertCategory([FromBody] Category cat)
        {
            int id = Convert.ToInt32(cat.CategoryID);
            bool saved = false;
            bool updated = false;
            if (id == 0)
            {
                try
                {
                    string insert = @"insert into Categories (CategoryName) values(@CategoryName)
                                      Select SCOPE_IDENTITY()";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(insert, conn))
                    {
                        cmd.Parameters.AddWithValue("@CategoryName", cat.CategoryName);
                        id = Convert.ToInt32(cmd.ExecuteScalar());
                        saved = true;
                    }
                    if (conn.State == ConnectionState.Open) conn.Close();
                }
                catch {return BadRequest(new { saved = false });}
               
            }
            else
            {
                try
                {
                    string update = @"update Categories set CategoryName=@CategoryName
                                      where CategoryID=@CategoryID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(update, conn))
                    {
                        cmd.Parameters.AddWithValue("@CategoryName", cat.CategoryName);
                        cmd.Parameters.AddWithValue("@CategoryID", id);
                        cmd.ExecuteNonQuery();       
                        updated = true;
                    }
                    if (conn.State == ConnectionState.Open) conn.Close();
                }
                catch { return BadRequest(new { updated = false }); }

            }
            if (cat.items.Count > 0)
            {
                try
                {
                    string del = @"delete Items where CategoryID=@CategoryID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(del, conn))
                    {
                        cmd.Parameters.AddWithValue("@CategoryID", id);
                        cmd.ExecuteNonQuery();
                    }
                    string sqli = @"insert into Items 
                              (serial,ItemName,BrandName,Quality,Condition,EstimatedPrice,CategoryID)
                              values(@serial,@ItemName,@BrandName,@Quality,@Condition,@EstimatedPrice,@CategoryID)";
                    using (SqlCommand cmd = new SqlCommand(sqli, conn))
                    {
                        foreach (var item in cat.items)
                        {
                            cmd.Parameters.AddWithValue("@serial", item.serial);
                            cmd.Parameters.AddWithValue("@ItemName", item.ItemName);
                            cmd.Parameters.AddWithValue("@BrandName", item.BrandName);
                            cmd.Parameters.AddWithValue("@Quality", item.Quality);
                            cmd.Parameters.AddWithValue("@Condition", item.Condition);
                            cmd.Parameters.AddWithValue("@EstimatedPrice", item.EstimatedPrice);
                            cmd.Parameters.AddWithValue("@CategoryID", id);
                        }
                        cmd.ExecuteScalar();
                        saved = true;
                    }
                   
                }
                catch { return BadRequest(new { saved = false }); }
                finally{ if (conn.State == ConnectionState.Open) conn.Close();}
            }
            var data = new
            {
                saved = saved,
                updated = updated,
                id = id
            };
            return Ok(data);
        }
    }
}
