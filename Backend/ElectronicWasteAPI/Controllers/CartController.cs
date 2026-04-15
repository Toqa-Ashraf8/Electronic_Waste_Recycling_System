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

        [Route("UpsertProducts")]
        [HttpPost]
        public IActionResult UpsertProducts([FromBody] CartCategory cat)
        {
            bool saved = false;
            bool updated = false;
            int id = Convert.ToInt32(cat.CategoryID);
            if (conn.State == ConnectionState.Closed) conn.Open();
            using(SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    if (id == 0)
                    {
                        string sqli = @"insert into CartCategories (CategoryName) 
                                        values(@CategoryName)select SCOPE_IDENTITY()";

                        using(SqlCommand cmd=new SqlCommand(sqli, conn, transaction))
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@CategoryName", cat.CategoryName);
                            id = Convert.ToInt32(cmd.ExecuteScalar());
                            saved = true;
                        }

                    }
                    else
                    {
                        string sqlu = @"Update CartCategories set CategoryName=@CategoryName
                                        where CategoryID=@CategoryID"; 


                        using (SqlCommand cmd = new SqlCommand(sqlu, conn, transaction))
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@CategoryName", cat.CategoryName);
                            cmd.Parameters.AddWithValue("@CategoryID", id);
                            cmd.ExecuteNonQuery();
                            updated = true;
                        }

                    }
                    if(cat.products.Count>0 || cat.products != null)
                    {
                        string deleteP = @"delete Products where CategoryID=@CategoryID";
                        using (SqlCommand cmd = new SqlCommand(deleteP, conn, transaction))
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@CategoryID", id);
                            cmd.ExecuteNonQuery(); 
                        }
                        string insertP = @"insert into Products 
                                        (serial,ProductName,ProductPrice,Stock,Points,ProductImagePath,Description,CategoryID)
                                        values(@serial,@ProductName,@ProductPrice,@Stock,@Points,
                                        @ProductImagePath,@Description,@CategoryID)select SCOPE_IDENTITY()";
                        foreach (var product in cat.products)
                        {
                            using (SqlCommand cmd = new SqlCommand(insertP, conn, transaction))
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@serial", product.serial);
                                cmd.Parameters.AddWithValue("@ProductName", product.ProductName);
                                cmd.Parameters.AddWithValue("@ProductPrice", product.ProductPrice);
                                cmd.Parameters.AddWithValue("@Stock", product.Stock);
                                cmd.Parameters.AddWithValue("@Points", product.Points);
                                cmd.Parameters.AddWithValue("@ProductImagePath", product.ProductImagePath);
                                cmd.Parameters.AddWithValue("@Description", product.Description);
                                cmd.Parameters.AddWithValue("@CategoryID",id);
                                cmd.ExecuteScalar();     
                            }

                        }

                    }
                    transaction.Commit();
                    return Ok(new { saved = saved, id = id ,updated=updated});
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
        [Route("GetProductsByCat")]
        [HttpPost]
        public IActionResult GetProductsByCat(int catId)
        {

            DataTable dt = new DataTable();
            string sqlg = "select * from Products where CategoryID=@CategoryID";
            using(SqlCommand cmd=new SqlCommand(sqlg, conn))
            {
                cmd.Parameters.AddWithValue("@CategoryID", catId);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
          
            return Ok(dt);

        }
        [Route("DeleteCatWithProducts")]
        [HttpDelete]
        public IActionResult DeleteCatWithProducts(int catId)
        {
            bool deleted = false;
            if (conn.State == ConnectionState.Closed) conn.Open();
            using(SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    if (catId > 0 || catId!=0)
                    {
                        string deleteP = "delete Products where CategoryID=@CategoryID";
                        using (SqlCommand cmd = new SqlCommand(deleteP, conn,transaction))
                        {
                            cmd.Parameters.AddWithValue("@CategoryID", catId);
                            cmd.ExecuteNonQuery();
                        }
                        string deleteC = "delete CartCategories where CategoryID=@CategoryID";
                        using (SqlCommand cmd = new SqlCommand(deleteC, conn,transaction))
                        {
                            cmd.Parameters.AddWithValue("@CategoryID", catId);
                            cmd.ExecuteNonQuery();
                            deleted = true;
                        }
                    }
                    transaction.Commit();
                    return Ok(new { deleted = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(new {error=ex.Message,deleted=false});
                }
                finally
                {
                    if (conn.State == ConnectionState.Open) conn.Close();
                }
            }
           

        }
    }
}
