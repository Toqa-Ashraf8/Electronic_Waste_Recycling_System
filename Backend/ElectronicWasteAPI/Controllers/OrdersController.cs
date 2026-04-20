using ElectronicWasteAPI.EF;
using ElectronicWasteAPI.Models;
using ElectronicWasteAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;


namespace ElectronicWasteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IHubContext<OrderHub> _hubContext;
        public OrdersController(DataContext context, IWebHostEnvironment env, IHubContext<OrderHub> hubContext)
        {
            _context = context;
            _env = env;
            _hubContext = hubContext;
        }
        [Route("GetOrderRequests")]
        [HttpGet]
        public async Task<IActionResult> GetOrderRequests()
        {
            var requests = await _context.vw_SellRequests
                .Where(r => r.RequestStatus == 0)
                .ToListAsync();
            await _hubContext.Clients.All.SendAsync("UpdateOrders");
            return Ok(requests);
        }

        [Route("SaveOrders")]
        [HttpPost]
        public async Task<IActionResult> SaveOrders([FromBody] Orders ord)
        {
                bool saved = false; 
                try
                {
                     _context.Orders.Add(ord);
                     var sellRequest = await _context.SellRequests.FindAsync(ord.RequestID);
                     if (sellRequest != null)
                     {
                    
                        if (ord.OrderStatus == 1)
                        {
                            sellRequest.RequestStatus = 1; 
                        }
                        else if (ord.OrderStatus == 2)
                        {
                            sellRequest.RequestStatus = 2;
                        }
                         saved = true;
                     }
                 await _context.SaveChangesAsync();
                 await _hubContext.Clients.All.SendAsync("UpdateOrders");
                var data = new { saved = saved };
                     return Ok(data);
                }
                catch (Exception ex)
                {
                   return BadRequest(new { error = ex.Message });
                }
        }

        [Route("GetOrders")]
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.vw_Orders
                 .Where(o => o.OrderStatus != 2)
                 .ToListAsync();
            return Ok(orders);
        }
        [Route("GetRejectedOrders")]
        [HttpGet]
        public async Task<IActionResult> GetRejectedOrders()
        {
            var rejected = await _context.vw_Orders
                 .Where(o => o.OrderStatus == 2)
                 .ToListAsync();
            return Ok(rejected);
        }

        [Route("SaveDispatchInformation")]
        [HttpPost]
        public async Task<IActionResult> SaveDispatchInformation([FromBody] OrderDispatches dis)
        {
                bool saved = false;          
                try
                {
                    _context.OrderDispatches.Add(dis);
                    var order = await _context.Orders.FindAsync(dis.OrderID);
                    if (order != null)
                    {
                      order.OrderStatus = 3;
                      
                    }
                    await _context.SaveChangesAsync();
                    await _hubContext.Clients.All.SendAsync("UpdateOrders");
                return Ok(new { saved = true });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message ,saved=false });
                }
        }

        [Route("GetDispatchInformation")]
        [HttpPost]
        public async Task<IActionResult> GetDispatchInformation(int reqId)
        {
            var details = await _context.vw_RequestsDetails
                  .Where(r => r.RequestID == reqId)
                  .ToListAsync();
            return Ok(details);

        }
        [Route("RecieveOrder")]
        [HttpPost]
        public async Task<IActionResult> RecieveOrder([FromBody] orderDetail ord)
        {
            bool done = false;
            try
            {
                if (ord.OrderID == 0)
                {
                    return BadRequest(new { done = false, error = "Invalid Order ID" });
                }

                var dbOrder = await _context.Orders.FindAsync(ord.OrderID);
                var dbRequest = await _context.SellRequests.FindAsync(ord.RequestID);

                if (dbOrder == null || dbRequest == null)
                {
                    return NotFound(new { done = false, error = "Order or Request not found" });
                }

                dbOrder.OrderStatus = 4;
                dbRequest.RequestStatus = 3;

                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("UpdateOrders");
                return Ok(new { done = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { done = false, error = ex.Message });
            }
        }

        [Route("SendPoints")]
        [HttpPost]
        public async Task<IActionResult> SendPoints([FromBody] orderDetail ord)
        {
            bool done = false;
                try
                {
                    if (ord.OrderID == 0)
                    {
                        return BadRequest(new { done = false, error = "Invalid Order ID" });
                    }
                    var dbOrder = await _context.Orders.FindAsync(ord.OrderID);
                    if (dbOrder != null) dbOrder.OrderStatus = 5;


                    var dbRequest = await _context.SellRequests.FindAsync(ord.RequestID);
                    if (dbRequest != null) dbRequest.RequestStatus = 4;

                    var dbUser = await _context.Users.FindAsync(ord.UserID);
                    if (dbUser != null)
                    {
                        dbUser.Points += ord.Points ?? 0;
                    }
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("UpdateOrders");
                return Ok(new { done = true });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message ,done=false });
                }
              
        }


        [Route("SearchOrders")]
        [HttpPost]
        public async Task<IActionResult> SearchOrders([FromBody] Search term)
        {
            var query = _context.vw_Orders.AsQueryable();

            if (!string.IsNullOrEmpty(term.Term))
            {
                query = query.Where(o =>
                    o.UserName.Contains(term.Term) ||
                    o.Notes.Contains(term.Term) ||
                    o.DeviceItem.Contains(term.Term));
            }

            var result = await query.ToListAsync();
            return Ok(result);
        }

       

    }
}
