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
            if (conn.State == ConnectionState.Closed) conn.Open();
            using (SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    if (id == 0)
                    {
                        string insert = @"insert into Categories (CategoryName) values(@CategoryName);
                              Select SCOPE_IDENTITY();";
                        using (SqlCommand cmd = new SqlCommand(insert, conn, transaction))
                        {
                            cmd.Parameters.AddWithValue("@CategoryName", cat.CategoryName);
                            id = Convert.ToInt32(cmd.ExecuteScalar());
                            saved = true;
                        }
                    }
                    else
                    {
                        string update = @"update Categories set CategoryName=@CategoryName
                              where CategoryID=@CategoryID";
                        using (SqlCommand cmd = new SqlCommand(update, conn, transaction))
                        {
                            cmd.Parameters.AddWithValue("@CategoryName", cat.CategoryName);
                            cmd.Parameters.AddWithValue("@CategoryID", id);
                            cmd.ExecuteNonQuery();
                            updated = true;
                        }
                    }

                   
                    if (cat.items != null && cat.items.Count > 0)
                    {
                        
                        string del = @"delete from Items where CategoryID=@CategoryID";
                        using (SqlCommand cmd = new SqlCommand(del, conn, transaction))
                        {
                            cmd.Parameters.AddWithValue("@CategoryID", id);
                            cmd.ExecuteNonQuery();
                        }

                        
                        string sqli = @"insert into Items (serial,ItemName,BrandName,Quality,Condition,EstimatedPrice,CategoryID)
                            values(@serial,@ItemName,@BrandName,@Quality,@Condition,@EstimatedPrice,@CategoryID)";

                        using (SqlCommand cmd = new SqlCommand(sqli, conn, transaction))
                        {
                            foreach (var item in cat.items)
                            {
                                cmd.Parameters.Clear(); 
                                cmd.Parameters.AddWithValue("@serial", item.serial);
                                cmd.Parameters.AddWithValue("@ItemName", item.ItemName);
                                cmd.Parameters.AddWithValue("@BrandName", item.BrandName);
                                cmd.Parameters.AddWithValue("@Quality", item.Quality);
                                cmd.Parameters.AddWithValue("@Condition", item.Condition);
                                cmd.Parameters.AddWithValue("@EstimatedPrice", item.EstimatedPrice);
                                cmd.Parameters.AddWithValue("@CategoryID", id);
                                cmd.ExecuteNonQuery();
                            }
                        }
                    }

                    transaction.Commit();
                    var data = new { saved = saved, updated = updated, id = id };
                    return Ok(data);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(new { error = ex.Message, saved = false });
                }
                finally
                {
                    if (conn.State == ConnectionState.Open) conn.Close();
                }
            }
        }

        [Route("GetAllCategories")]
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            DataTable dt = new DataTable();
            string get = "select * from Categories";
            SqlDataAdapter da = new SqlDataAdapter(get, conn);
            da.Fill(dt);
            return Ok(dt);
        }

        [Route("GetItemsByCategory")]
        [HttpPost]
        public IActionResult GetItemsByCategory(int id)
        {
            DataTable dt = new DataTable();
            string sqlg = @"select * from Items where CategoryID=@CategoryID";
            if (conn.State == ConnectionState.Closed) conn.Open();
            using (SqlCommand cmd = new SqlCommand(sqlg, conn))
            {
                cmd.Parameters.AddWithValue("@CategoryID", id);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return Ok(dt);
        }


        [Route("DeleteCategory")]
        [HttpDelete]
        public IActionResult DeleteCategory(int id) 
        {
            bool deleted = false;
            if (id == 0) return BadRequest("id not found");
            if (id > 0)
            {
                try
                {
                    string deleteItem = @"delete Items where CategoryID=@CategoryID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using(SqlCommand cmd=new SqlCommand(deleteItem, conn))
                    {
                        cmd.Parameters.AddWithValue("@CategoryID", id);
                        cmd.ExecuteNonQuery();
                        deleted = true;
                    }
                    if (deleted == true)
                    {
                        string deleteCat = @"delete Categories where CategoryID=@CategoryID";
                        if (conn.State == ConnectionState.Closed) conn.Open();
                        using (SqlCommand cmd = new SqlCommand(deleteCat, conn))
                        {
                            cmd.Parameters.AddWithValue("@CategoryID", id);
                            cmd.ExecuteNonQuery();
                            deleted = true;
                        }
                    }

                }
                catch { return BadRequest(new { deleted = false }); }
                finally
                {
                    if (conn.State == ConnectionState.Open) conn.Close();
                }
               
            }
            var data = new { deleted = deleted };
            return Ok(data);
        }

    }
}
