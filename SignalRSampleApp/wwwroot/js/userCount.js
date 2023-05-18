
// Create connection
var connectionUserCount =
    new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
        .build();

//.withUrl("/hubs/userCount", signalR.HttpTransportType.ServerSentEvents)

// connect to methode that hub invokes aka recive notification from hub
connectionUserCount.on("updateTotalViews", function (value) {
    var totalViewsCounterSpan = document.getElementById("totalViewsCounter");
    totalViewsCounterSpan.innerHTML = value.toString();
});

connectionUserCount.on("updateTotalUsers", function (value) {
    var totalUsersCounterSpan = document.getElementById("totalUsersCounter");
    totalUsersCounterSpan.innerHTML = value.toString();
});


// invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    //connectionUserCount.send("NewWindowLoaded");
    //connectionUserCount.send("NewWindowLoaded", "Guy Talmi");

    connectionUserCount.invoke("NewWindowLoaded", "Guy Talmi")
        .then(value => console.log(value));
}

// start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("Connection to User Hub Failed");
}

connectionUserCount.start().then(fulfilled, rejected);


