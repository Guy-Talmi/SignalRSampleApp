
// Create connection
var connectionDeathlyHallows =
    new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl("/hubs/deathlyHallows", signalR.HttpTransportType.WebSockets)
        .build();

//.withUrl("/hubs/userCount", signalR.HttpTransportType.ServerSentEvents)

var cloakCounterSpan = document.getElementById("cloakCounter");
var stoneCounterSpan = document.getElementById("stoneCounter");
var wandCounterSpan = document.getElementById("wandCounter");

connectionDeathlyHallows.on("updateDeathlyHallows", (cloak, stone, wand) => {
    cloakCounterSpan.innerHTML = cloak.toString();
    stoneCounterSpan.innerHTML = stone.toString();
    wandCounterSpan.innerHTML = wand.toString();
});


// connect to methode that hub invokes aka recive notification from hub
//connectionDeathlyHallows.on("updateTotalViews", function (value) {
//    var totalViewsCounterSpan = document.getElementById("totalViewsCounter");
//    totalViewsCounterSpan.innerHTML = value.toString();
//});

//connectionDeathlyHallows.on("updateTotalUsers", function (value) {
//    var totalUsersCounterSpan = document.getElementById("totalUsersCounter");
//    totalUsersCounterSpan.innerHTML = value.toString();
//});

// invoke hub methods aka send notification to hub
//function newWindowLoadedOnClient() {
//    //connectionUserCount.send("NewWindowLoaded");
//    //connectionUserCount.send("NewWindowLoaded", "Guy Talmi");

////    connectionUserCount.invoke("NewWindowLoaded", "Guy Talmi")
////        .then(value => console.log(value));
//}

// start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
    //newWindowLoadedOnClient();

    connectionDeathlyHallows.invoke("GetRaceStatus")
        .then(raceCounter => {
            cloakCounterSpan.innerHTML = raceCounter.cloak.toString();
            stoneCounterSpan.innerHTML = raceCounter.stone.toString();
            wandCounterSpan.innerHTML = raceCounter.wand.toString();
        });
}

function rejected() {
    console.log("Connection to User Hub Failed");
}

connectionDeathlyHallows.start().then(fulfilled, rejected);


