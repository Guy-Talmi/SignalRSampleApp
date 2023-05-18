using Microsoft.AspNetCore.SignalR;

namespace SignalRSampleApp.Hubs;

public class DeathlyHallowsHub : Hub
{
    public Dictionary<string, int> GetRaceStatus()
    {
        return SD.DealthyHallowRace;
    }
}
