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
    public class CompanyProfileController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public CompanyProfileController(DataContext context)
        {
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }

        //Branches -- start
        [Route("UpsertBranches")]
        [HttpPost]
        public IActionResult UpsertBranches([FromBody]Branch branch)
        {
            bool saved = false;
            bool updated = false;
            int id = Convert.ToInt32(branch.BranchID);
            try
            {
                if (id == 0)
                {
                    string sqli = @"insert into Branches (BranchName,Location,BranchPhone,WorkingHours,MapLink)
                               values (@BranchName,@Location,@BranchPhone,@WorkingHours,@MapLink)select SCOPE_IDENTITY()";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqli, conn))
                    {
                        cmd.Parameters.AddWithValue("@BranchName", branch.BranchName);
                        cmd.Parameters.AddWithValue("@Location", branch.Location);
                        cmd.Parameters.AddWithValue("@BranchPhone", branch.BranchPhone);
                        cmd.Parameters.AddWithValue("@WorkingHours", branch.WorkingHours);
                        cmd.Parameters.AddWithValue("@MapLink", branch.MapLink);
                        id = Convert.ToInt32(cmd.ExecuteScalar());
                        saved = true;
                    }

                    if (conn.State == ConnectionState.Open) conn.Close();
                }
                else
                {
                    string sqlu = @"update Branches set BranchName=@BranchName,Location=@Location,
                                    BranchPhone=@BranchPhone,WorkingHours=@WorkingHours,MapLink=@MapLink
                                    where BranchID=@BranchID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqlu, conn))
                    {
                        cmd.Parameters.AddWithValue("@BranchName", branch.BranchName);
                        cmd.Parameters.AddWithValue("@Location", branch.Location);
                        cmd.Parameters.AddWithValue("@BranchPhone", branch.BranchPhone);
                        cmd.Parameters.AddWithValue("@WorkingHours", branch.WorkingHours);
                        cmd.Parameters.AddWithValue("@MapLink", branch.MapLink);
                        cmd.Parameters.AddWithValue("@BranchID", id);
                        cmd.ExecuteNonQuery();
                        updated = true;
                    }

                    if (conn.State == ConnectionState.Open) conn.Close();

                }
                var data = new { id = id, saved = saved, updated = updated };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }
           
        }

        [Route("DeleteBranch")]
        [HttpDelete]
        public IActionResult DeleteBranch(int branchId)
        {
            bool deleted = false;
            try
            {
                if (branchId > 0)
                {
                    string sqld = @"Delete Branches where BranchID=@BranchID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using(SqlCommand cmd=new SqlCommand(sqld, conn))
                    {
                        cmd.Parameters.AddWithValue("@BranchID", branchId);
                        cmd.ExecuteNonQuery();
                        deleted = true;
                    }
                   
                }
                if (conn.State == ConnectionState.Open) conn.Close();
                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, deleted = false });
                
            }
            
        }

        [Route("GetBranches")]
        [HttpGet]
        public IActionResult GetBranches()
        {
            DataTable dt = new DataTable();
            string sql = "select * from Branches";
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(dt);
            return Ok(dt);
        }

        //Branches -- end


        //Contact -- start
        [Route("UpsertContacts")]
        [HttpPost]
        public IActionResult UpsertContacts([FromBody] Contact contact)
        {
            bool saved = false;
            bool updated = false;
            int id = Convert.ToInt32(contact.ContactID);
            try
            {
                if (id == 0)
                {
                    string sqli = @"insert into Contacts (PhoneSupport,StartHour,EndHour,Email,WhatsAppNumber)
                               values (@PhoneSupport,@StartHour,@EndHour,@Email,@WhatsAppNumber)select SCOPE_IDENTITY()";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqli, conn))
                    {
                        cmd.Parameters.AddWithValue("@PhoneSupport", contact.PhoneSupport);
                        cmd.Parameters.AddWithValue("@StartHour", contact.StartHour);
                        cmd.Parameters.AddWithValue("@EndHour", contact.EndHour);
                        cmd.Parameters.AddWithValue("@Email", contact.Email);
                        cmd.Parameters.AddWithValue("@WhatsAppNumber", contact.WhatsAppNumber);
                        id = Convert.ToInt32(cmd.ExecuteScalar());
                        saved = true;
                    }

                    if (conn.State == ConnectionState.Open) conn.Close();
                }
                else
                {
                    string sqlu = @"update Contacts set PhoneSupport=@PhoneSupport,StartHour=@StartHour,
                                    EndHour=@EndHour,Email=@Email,WhatsAppNumber=@WhatsAppNumber
                                    where ContactID=@ContactID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqlu, conn))
                    {
                        cmd.Parameters.AddWithValue("@PhoneSupport", contact.PhoneSupport);
                        cmd.Parameters.AddWithValue("@StartHour", contact.StartHour);
                        cmd.Parameters.AddWithValue("@EndHour", contact.EndHour);
                        cmd.Parameters.AddWithValue("@Email", contact.Email);
                        cmd.Parameters.AddWithValue("@WhatsAppNumber", contact.WhatsAppNumber);
                        cmd.Parameters.AddWithValue("@ContactID", id);
                        cmd.ExecuteNonQuery();
                        updated = true;
                    }

                    if (conn.State == ConnectionState.Open) conn.Close();

                }
                var data = new { id = id, saved = saved, updated = updated };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }

        }

        [Route("DeleteContacts")]
        [HttpDelete]
        public IActionResult DeleteContacts(int contactId)
        {
            bool deleted = false;
            try
            {
                if (contactId > 0)
                {
                    string sqld = @"Delete Contacts where ContactID=@ContactID";
                    if (conn.State == ConnectionState.Closed) conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqld, conn))
                    {
                        cmd.Parameters.AddWithValue("@ContactID", contactId);
                        cmd.ExecuteNonQuery();
                        deleted = true;
                    }

                }
                if (conn.State == ConnectionState.Open) conn.Close();
                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, deleted = false });

            }

        }

        [Route("GetContacts")]
        [HttpGet]
        public IActionResult GetContacts()
        {
            DataTable dt = new DataTable();
            string sql = "select * from Contacts";
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(dt);
            return Ok(dt);
        }

        //Contact -- end 
    }
}
