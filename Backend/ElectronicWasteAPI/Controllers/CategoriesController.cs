using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
            var existingCat = await _context.Categories
                .Include(c => c.items)
                .FirstOrDefaultAsync(c => c.CategoryID==cat.CategoryID);
                try
                {
                    if (cat.CategoryID == 0 || existingCat==null)
                    {
                            _context.Categories.Add(cat);
                            await _context.SaveChangesAsync();
                        if(cat.items!=null && cat.items.Any())
                        {
                            foreach (var item in cat.items)
                            {
                                item.CategoryID = cat.CategoryID;
                              
                            }
                           await _context.SaveChangesAsync();
                    }
                        saved = true;
                    }
                    else
                    {
                        
                        if (existingCat.items != null)
                        {
                            _context.Items.RemoveRange(existingCat.items);
                        }

                        existingCat.CategoryName = cat.CategoryName;

                        if (cat.items != null)
                        {
                            foreach (var item in cat.items)
                            {
                                item.CategoryID = existingCat.CategoryID;
                           
                            } 
                            existingCat.items = cat.items;
                        }
                         updated = true;    
                         await _context.SaveChangesAsync();
                    }
                    return Ok(new { saved = saved, id = cat.CategoryID ,updated=updated });
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
            if (id <= 0)
            {
                return BadRequest(new { message = "Invalid ID" });
            }

            var category = await _context.Categories
                .Include(c => c.items)
                .FirstOrDefaultAsync(c => c.CategoryID == id);

            if (category == null)
            {
                return NotFound(new { message = "Category not found" });
            }

            if (category.items != null && category.items.Any())
            {
                _context.Items.RemoveRange(category.items);
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { deleted = true });
        }

    }
}
