using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyProfileController : ControllerBase
    {
        private readonly DataContext _context;
        public CompanyProfileController(DataContext context)
        {
            _context = context;
        }

        //Branches -- start
        [Route("UpsertBranches")]
        [HttpPost]
        public async Task<IActionResult> UpsertBranches([FromBody]Branch branch)
        {
            bool saved = false;
            bool updated = false;
            try
            {
                if (branch.BranchID == 0)
                {
                        _context.Branches.Add(branch);
                        await _context.SaveChangesAsync();
                        saved = true;
                }
                else
                {
                    _context.Branches.Update(branch);
                    await _context.SaveChangesAsync();
                    updated = true;
                }
                var data = new { id = branch.BranchID, saved = saved, updated = updated };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }
           
        }

        [Route("DeleteBranch")]
        [HttpDelete]
        public async Task<IActionResult> DeleteBranch(int branchId)
        {
            bool deleted = false;
            try
            {
                if (branchId <= 0)
                {
                    return BadRequest(new { message = "Invalid Branch ID", deleted = false });
                }
                var branch = await _context.Branches.FindAsync(branchId);
                if (branch !=null)
                {
                    _context.Branches.Remove(branch);
                    await _context.SaveChangesAsync();
                    return Ok(new { deleted = true });
                }
                else
                { 
                    return NotFound(new { message = "Branch not found", deleted = false });
                }           
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, deleted = false });           
            }
        }

        [Route("GetBranches")]
        [HttpGet]
        public async Task<IActionResult> GetBranches()
        {
            var branches = await _context.Branches.ToListAsync();
            return Ok(branches);
        }

        //Branches -- end


        //Contact -- start
        [Route("UpsertContacts")]
        [HttpPost]
        public async Task<IActionResult> UpsertContacts([FromBody] Contact contact)
        {
            bool saved = false;
            bool updated = false;
            try
            {
                if (contact.ContactID == 0)
                {
                    _context.Contacts.Add(contact);
                    await _context.SaveChangesAsync();
                    saved = true;
                }
                else
                {
                    _context.Contacts.Update(contact);
                    await _context.SaveChangesAsync();
                    updated = true;
                }
                var data = new { id = contact.ContactID, saved = saved, updated = updated };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }
        }

        [Route("DeleteContacts")]
        [HttpDelete]
        public async Task<IActionResult> DeleteContacts(int contactId)
        {
            bool deleted = false;
            try
            {
                if(contactId <= 0)
                {
                    return BadRequest(new { message = "Invalid Contact ID", deleted = false });
                }
                var contact = await _context.Contacts.FindAsync(contactId);
                if (contact != null)
                {
                    _context.Contacts.Remove(contact);
                    await _context.SaveChangesAsync();
                    return Ok(new { deleted = true });

                }
                else
                {
                    return NotFound(new { message = "Contact not found", deleted = false });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, deleted = false });
            }
        }

        [Route("GetContacts")]
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();
            return Ok(contacts);
        }

        //Contact -- end 
    }
}
