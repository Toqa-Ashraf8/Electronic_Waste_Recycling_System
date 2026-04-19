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
        public CartController(DataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
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
        public async Task<IActionResult> UpsertProducts([FromBody] CartCategory cat)
        {
            bool saved = false;
            bool updated = false;

            try
            {
                var existingCat = await _context.CartCategories
                                                .Include(c => c.products)
                                                .FirstOrDefaultAsync(c => c.CategoryID == cat.CategoryID);

                if (cat.CategoryID == 0 || existingCat == null)
                {
                     _context.CartCategories.Add(cat);
                    await _context.SaveChangesAsync();

                    if (cat.products != null && cat.products.Any())
                    {
                        foreach (var product in cat.products)
                        {
                            product.CategoryID = cat.CategoryID; 
                        }
                        await _context.SaveChangesAsync();
                    }
                    saved = true;
                }
                else
                {
                    existingCat.CategoryName = cat.CategoryName;

                    if (existingCat.products != null)
                    {
                        _context.Products.RemoveRange(existingCat.products);
                    }
                    if (cat.products != null)
                    {
                        foreach (var product in cat.products)
                        {
                            product.CategoryID = existingCat.CategoryID;
                        }
                        existingCat.products = cat.products;
                    }

                    updated = true;
                    await _context.SaveChangesAsync();
                }

                return Ok(new { saved = saved, id = cat.CategoryID, updated = updated });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }

        }

        [Route("GetCategories")]
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.CartCategories.ToListAsync();
            return Ok(categories);
        }
        [Route("GetProductsByCat")]
        [HttpPost]
        public async Task<IActionResult> GetProductsByCat(int catId)
        {

            var products = await _context.Products
                           .Where(p => p.CategoryID == catId)
                           .ToListAsync();
            return Ok(products);

        }
        [Route("DeleteCatWithProducts")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCatWithProducts(int catId)
        {
            bool deleted = false;
              try
              {
                    if (catId > 0 || catId != 0)
                    {
                        var category = await _context.CartCategories
                                   .Include(c => c.products)
                                   .FirstOrDefaultAsync(c => c.CategoryID == catId);

                        _context.Products.RemoveRange(category.products);
                        _context.CartCategories.Remove(category);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(new { deleted = true });
              }
              catch (Exception ex)
              {
                  return BadRequest(new {error=ex.Message,deleted=false});
              }
                
           
        }
    }
}
