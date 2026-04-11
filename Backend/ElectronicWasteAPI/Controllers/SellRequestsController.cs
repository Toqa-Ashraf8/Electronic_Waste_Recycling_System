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
        [Route("UploadDeviceImage")]
        [HttpPost]
        public IActionResult UploadDeviceImage([FromForm] DeviceImages image)
        {
            if (image.deviceFile == null) return BadRequest("No file uploaded");
            var postedFile = image.deviceFile;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Devices_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                postedFile.CopyTo(stream);
            }
            return Ok(fileName);
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

        [Route("SaveRequest")]
        [HttpPost]
        public IActionResult SaveRequest([FromBody]SellRequest req)
        {
            int id = Convert.ToInt32(req.RequestID);
            bool saved = false;
            bool updated = false;
            if (id == 0)
            {
                try
                {
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    string saveR = @"insert into SellRequests (CategoryID,DeviceCategory,DeviceBrand,ItemID,DeviceItem,
                                    DeviceQuality,DeviceCondition,EstimatedPrice,DeviceImagePath,PickUpMethod,
                                    ShippingAddress,PickUpDate) values (@CategoryID,@DeviceCategory,@DeviceBrand,@ItemID,@DeviceItem,
                                    @DeviceQuality,@DeviceCondition,@EstimatedPrice,@DeviceImagePath,@PickUpMethod,
                                    @ShippingAddress,@PickUpDate)select SCOPE_IDENTITY()";
                    using(SqlCommand cmd=new SqlCommand(saveR, conn))
                    {
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@CategoryID",req.CategoryID);
                        cmd.Parameters.AddWithValue("@DeviceCategory",req.DeviceCategory);
                        cmd.Parameters.AddWithValue("@DeviceBrand",req.DeviceBrand);
                        cmd.Parameters.AddWithValue("@ItemID", req.ItemID);
                        cmd.Parameters.AddWithValue("@DeviceItem", req.DeviceItem);
                        cmd.Parameters.AddWithValue("@DeviceQuality", req.DeviceQuality);
                        cmd.Parameters.AddWithValue("@DeviceCondition", req.DeviceCondition);
                        cmd.Parameters.AddWithValue("@EstimatedPrice", req.EstimatedPrice);
                        cmd.Parameters.AddWithValue("@DeviceImagePath", req.DeviceImagePath);
                        cmd.Parameters.AddWithValue("@PickUpMethod", req.PickUpMethod);
                        cmd.Parameters.AddWithValue("@ShippingAddress", req.ShippingAddress);
                        cmd.Parameters.AddWithValue("@PickUpDate", req.PickUpDate);
                        id = Convert.ToInt32(cmd.ExecuteScalar());
                        saved = true;
                    }
                }
                catch (Exception ex){ return BadRequest(new { error = ex.Message });}
                finally {if (conn.State == ConnectionState.Open) conn.Close(); }
               
                    
               
            }
            else
            {
                try
                {
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    string updateR = @"update SellRequests set CategoryID=@CategoryID,DeviceCategory=@DeviceCategory
                                    ,DeviceBrand=@DeviceBrand,ItemID=@ItemID,DeviceItem=@DeviceItem, DeviceQuality=@DeviceQuality
                                    ,DeviceCondition=@DeviceCondition,EstimatedPrice=@EstimatedPrice,DeviceImagePath=@DeviceImagePath,
                                     PickUpMethod=@PickUpMethod,ShippingAddress=@ShippingAddress,PickUpDate=@PickUpDate
                                     where RequestID=@RequestID"; 
                    using (SqlCommand cmd = new SqlCommand(updateR, conn))
                    {
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@CategoryID", req.CategoryID);
                        cmd.Parameters.AddWithValue("@DeviceCategory", req.DeviceCategory);
                        cmd.Parameters.AddWithValue("@DeviceBrand", req.DeviceBrand);
                        cmd.Parameters.AddWithValue("@ItemID", req.ItemID);
                        cmd.Parameters.AddWithValue("@DeviceItem", req.DeviceItem);
                        cmd.Parameters.AddWithValue("@DeviceQuality", req.DeviceQuality);
                        cmd.Parameters.AddWithValue("@DeviceCondition", req.DeviceCondition);
                        cmd.Parameters.AddWithValue("@EstimatedPrice", req.EstimatedPrice);
                        cmd.Parameters.AddWithValue("@DeviceImagePath", req.DeviceImagePath);
                        cmd.Parameters.AddWithValue("@PickUpMethod", req.PickUpMethod);
                        cmd.Parameters.AddWithValue("@ShippingAddress", req.ShippingAddress);
                        cmd.Parameters.AddWithValue("@PickUpDate", req.PickUpDate);
                        cmd.Parameters.AddWithValue("@RequestID",id);
                        cmd.ExecuteNonQuery();
                        updated = true;
                    }
                }
                catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
                finally { if (conn.State == ConnectionState.Open) conn.Close(); }
            }
            var data = new { id = id, saved = saved, updated = updated };
            return Ok(data);
        }

    }
}
