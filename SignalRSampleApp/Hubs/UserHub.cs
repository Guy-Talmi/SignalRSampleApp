using Microsoft.AspNetCore.SignalR;

namespace SignalRSampleApp.Hubs;

public class UserHub : Hub
{
	public static int TotalViews { get; set; }
	public static int TotalUsers { get; set; }

    public override Task OnConnectedAsync()
    {
		TotalUsers++;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        TotalUsers--;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnDisconnectedAsync(exception);
    }

    public async Task NewWindowLoaded()
	{
		TotalViews++;

		// Send the new total to all clients
		await Clients.All.SendAsync("updateTotalViews", TotalViews);
	}
}
