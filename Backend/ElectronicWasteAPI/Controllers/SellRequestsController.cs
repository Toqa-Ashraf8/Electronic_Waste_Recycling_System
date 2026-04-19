using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using ElectronicWasteAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellRequestsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;
        public SellRequestsController(DataContext context, IWebHostEnvironment env)
        {
            _env = env;
            _context = context;
        }
        [Route("UploadDeviceImage")]
        [HttpPost]
        public async Task<IActionResult> UploadDeviceImage([FromForm] DeviceImages image)
        {
            if (image.deviceFile == null) return BadRequest("No file uploaded");
            var postedFile = image.deviceFile;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Devices_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                await postedFile.CopyToAsync(stream);
            }
            return Ok(fileName);
        }
        [Route("GetBrandByItem")]
        [HttpPost]
        public async Task<IActionResult> GetBrandByItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return Ok(new List<object>());
            }

            return Ok(new List<object> { item });
        }
        [Route("GetQualities")]
        [HttpGet]
        public async Task<IActionResult> GetQualities()
        {
            var qualities = await _context.Items
                .Select(i => new { i.Quality })
                .ToListAsync();
            return Ok(qualities);
        }
        [Route("getItemsConditionByQuality")]
        [HttpPost]
        public async Task<IActionResult> getItemsConditionByQuality([FromBody] ItemDetails item)
        {
            var conditions = new List<Conditions>();
            try
            {
                var dbItem = await _context.Items
                 .FirstOrDefaultAsync(i => i.ItemID == item.ItemID && i.Quality == item.Quality);

                var dbQuality = await _context.Qualities
                 .FirstOrDefaultAsync(q => q.CategoryID == item.CategoryID && q.Quality == item.Quality);

                if (dbItem != null && dbQuality != null)
                {
                    conditions.Add(new Conditions
                    {
                        QualityID = dbQuality.QualityID,
                        Condition = dbItem.Condition,
                        EstimatedPrice = dbItem.EstimatedPrice ?? 0
                    });
                }
                else if (dbQuality != null)
                {
                    conditions.Add(new Conditions
                    {
                        QualityID = dbQuality.QualityID,
                        Condition = dbQuality.Condition,
                        EstimatedPrice = dbQuality.EstimatedPrice ?? 0
                    });
                }
                var data = new { conditions = conditions };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
               
        }

        [Route("SaveRequest")]
        [HttpPost]
        public async Task<IActionResult> SaveRequest([FromBody]SellRequest req)
        {
            int id = Convert.ToInt32(req.RequestID);
            bool saved = false;
            bool updated = false;
                try
                {
                    if (req.RequestID == 0)
                    {
                        _context.SellRequests.Add(req);
                        saved = true;
                    }
                    else
                    {
                        var existingReq = await _context.SellRequests.FindAsync(req.RequestID);
                        if (existingReq == null) return NotFound();

                        _context.Entry(existingReq).CurrentValues.SetValues(req);
                        updated = true;
                    }

                    await _context.SaveChangesAsync();
                    return Ok(new { id = req.RequestID, saved = saved, updated = updated });
                }
                catch (Exception ex){ return BadRequest(new { error = ex.Message });}
        }

        [Route("GetRequests")]
        [HttpPost]
        public async Task<IActionResult> GetRequests(int userId)
        {
            var requests = await _context.SellRequests
                 .Where(r => r.UserID == userId)
                 .ToListAsync();
            return Ok(requests);
        }
        [Route("DeleteRequest")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            bool deleted = false;       
            try
            {
                var req = await _context.SellRequests.FindAsync(id);
                if (req == null) return NotFound(new { deleted = false });

                _context.SellRequests.Remove(req);
                await _context.SaveChangesAsync();

                return Ok(new { deleted = true });
            }
            catch (Exception ex){ return BadRequest(new { error = ex.Message });}
     
        }

    }
}
