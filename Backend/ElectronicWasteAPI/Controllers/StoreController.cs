using ElectronicWasteAPI.EF;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly DataContext _context;
        public StoreController (DataContext context)
        {
            _context = context;
        }
        [Route("GetProducts")]
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products); 

        }
        [Route("GetCategories")]
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.CartCategories.ToListAsync();
            return Ok(categories);
        }
        [Route("FilterProductsByCat")]
        [HttpPost]
        public async Task<IActionResult> FilterProductsByCat(int catId)
        {

            var products = await _context.Products
                 .Where(p => catId == 0 || p.CategoryID == catId)
                 .ToListAsync();

            return Ok(products);

        }
    }
}
