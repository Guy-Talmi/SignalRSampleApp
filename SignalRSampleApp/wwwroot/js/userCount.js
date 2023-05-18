// Create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

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
    connectionUserCount.send("NewWindowLoaded");
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


