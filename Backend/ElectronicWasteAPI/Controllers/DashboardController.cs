using ElectronicWasteAPI.EF;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DataContext _context;
        public DashboardController(DataContext dataContext)
        {
            _context = dataContext;
        }

        [Route("GetRequestStats")]
        [HttpGet]
        public async Task<IActionResult> GetRequestStats()
        {

            var currentYear = DateTime.Now.Year;

            var stats = await _context.vw_SellRequests
                .Where(r => r.SubmissionDate.HasValue && r.SubmissionDate.Value.Year == currentYear)
                .GroupBy(r => r.SubmissionDate.Value.Month)
                .Select(g => new
                {
                    MonthNumber = g.Key,
                    RequestsCount = g.Count()
                })
                .ToListAsync();
            var finalResult = Enumerable.Range(1, 12).Select(i => {
                var monthData = stats.FirstOrDefault(s => s.MonthNumber == i);
                return new
                {
                    MonthName = CultureInfo.GetCultureInfo("en-US").DateTimeFormat.GetMonthName(i),
                    RequestsCount = monthData?.RequestsCount ?? 0,
                    MonthNumber = i
                };
            }).ToList();

            return Ok(finalResult);
        }


        [Route("GetUsersCount")]
        [HttpGet]
        public async Task<IActionResult> GetUsersCount()
        {
            var count = await _context.Users.CountAsync();
            return Ok(count);

        }

        [Route("PendingOrdersCount")]
        [HttpGet]
        public async Task<IActionResult> PendingOrdersCount()
        {
            var count = await _context.SellRequests
                .CountAsync(r => r.RequestStatus == 0);
            return Ok(count);
        } 

        [Route("GetTotalPoints")]
        [HttpGet]
        public async Task<IActionResult> GetTotalPoints()
        {
            var totalPoints = await _context.Users.SumAsync(u => u.Points ?? 0);
            return Ok(totalPoints);
        }

        [Route("AllOrdersCount")]
        [HttpGet]
        public async Task<IActionResult> AllOrdersCount()
        {
            var count = await _context.Orders.CountAsync();
            return Ok(count);
        }

        [Route("GetCategoryStats")]
        [HttpGet]
        public async Task<IActionResult> GetCategoryStats()
        {
            var stats = await _context.vw_cartproducts
                 .GroupBy(p => p.CategoryName)
                 .Select(g => new
                 {
                     Name = g.Key,
                     Count = g.Count()
                 })
                 .ToListAsync();

            return Ok(stats);
        }
       
    }
}
