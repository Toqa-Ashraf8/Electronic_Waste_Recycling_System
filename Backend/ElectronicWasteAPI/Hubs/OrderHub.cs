using Microsoft.AspNetCore.SignalR;

public class OrderHub : Hub
{
    public async Task NotifyOrderUpdate()
    {
        await Clients.All.SendAsync("UpdateOrders");
    }
}