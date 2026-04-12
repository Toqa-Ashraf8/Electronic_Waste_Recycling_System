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
        public CategoriesController(DataContext context)
        {
            _context = context;
        }
        [Route("UpsertCategory")]
        [HttpPost]
        public async Task<IActionResult> UpsertCategory([FromBody] Category cat)
        {
            bool saved = false;
            bool updated = false;    
                try
                {
                    if (cat.CategoryID == 0)
                    {
                            _context.Categories.Add(cat);
                            saved = true;
                    }
                    else
                    { 
                          var existingItems = _context.Items.Where(i => i.CategoryID == cat.CategoryID);
                            _context.Items.RemoveRange(existingItems);
                            _context.Categories.Update(cat);
                            updated = true; 
                    }
                   
                    await _context.SaveChangesAsync();
                    return Ok(new { saved = cat.CategoryID != 0, id = cat.CategoryID ,updated=updated });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message, saved = false });
                }
        }

        [Route("GetAllCategories")]
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        [Route("GetItemsByCategory")]
        [HttpPost]
        public async Task<IActionResult> GetItemsByCategory(int id)
        {
            var items = await _context.Items.Where(i => i.CategoryID == id).ToListAsync();                                                 
            return Ok(items);
        }


        [Route("DeleteCategory")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(int id) 
        {
            bool deleted = false;
            if (id == 0) return BadRequest("id not found");

   
            var itemsToDelete = _context.Items.Where(i => i.CategoryID == id);
            _context.Items.RemoveRange(itemsToDelete);

            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
            }
            await _context.SaveChangesAsync();

            return Ok(new { deleted = true });
        }

    }
}
