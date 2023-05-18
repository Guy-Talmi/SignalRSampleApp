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

    public override /*async*/ Task OnDisconnectedAsync(Exception? exception)
    {
        TotalUsers--;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();

        // await Clients.Caller.SendAsync("updateTotalViews", user, message);
        // await Clients.Others.SendAsync("updateTotalViews", user, message);

        //await Clients.Client(Context.ConnectionId).SendAsync("updateTotalViews", TotalViews);
        //await Clients.Client("Connection Id").SendAsync("updateTotalViews", user, message);
        // await Clients.Clients("Connection Id 1", "Connection Id 2").SendAsync("updateTotalViews", TotalViews);

        // await Clients.AllExcept("Connection Id 1", "Connection Id 2").SendAsync("updateTotalViews", TotalViews);

        //await Clients.User("User Id").SendAsync("updateTotalViews", TotalViews);

        Clients.Users("User Id 1", "User Id 2").SendAsync("updateTotalViews", TotalViews);

        return base.OnDisconnectedAsync(exception);
    }

    public async Task<string> NewWindowLoaded(string name)
    {
        TotalViews++;

        // Send the new total to all clients
        await Clients.All.SendAsync("updateTotalViews", TotalViews);

        return $"Total views from {name}: {TotalViews}";
    }
}
