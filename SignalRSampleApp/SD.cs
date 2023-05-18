namespace SignalRSampleApp;

public static class SD
{
    public const string Wand = "wand";
    public const string Ston = "stone";
    public const string Cloak = "cloak";

    public static readonly Dictionary<string, int> DealthyHallowRace;

    static SD()
    {
        DealthyHallowRace = new Dictionary<string, int>();
        DealthyHallowRace.Add(Wand, 0);
        DealthyHallowRace.Add(Ston, 0);
        DealthyHallowRace.Add(Cloak, 0);
    }
}
