//  Initialize Firebase
var config = {
  apiKey: "AIzaSyAaBxgXJBVE_9C8qzRu_ebV1sscAVqiers",
  authDomain: "group-project-4da86.firebaseapp.com",
  databaseURL: "https://group-project-4da86.firebaseio.com",
  projectId: "group-project-4da86",
  storageBucket: "group-project-4da86.appspot.com",
  messagingSenderId: "847074672907"
};
firebase.initializeApp(config);

var database = firebase.database();
var ip = "";
getIP();
function getIP() {
    $.getJSON('http://ipinfo.io', function (data) {
        ip = data.ip;
        getEvents();
        return ip;
    });
}
function getEvents() {
    var client_id = "MTM3Njk0OTN8MTU0MTEyNjYzMS42OQ";
    var geoAPI = "geoip=" + ip;
    var range = "range=15mi";
    var url = "https://api.seatgeek.com/2/events?client_id=" + client_id + "&" + geoAPI+"&"+range;
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

// click function rendering search input. 
$("#search").on("click", function (event) {
  event.preventDefault();
  $.each($("input:checked"), function() {
    var search = $(this).val();  
    console.log(search);
  });
});
// function to render api results to ui
function renderResults(results) {

  var events = $("<ul>");
  events.addClass("list-group");
  $(".events").append(events);

  var title = results.events.title;
  var eventsList = $("<li class='event-list-title'");
  eventsList.append("<span class='label label-primary'>" + title + "</span>");

  var eventDate = results.events.datetime_local;
  eventsList.append("<h5>" + eventDate + "</h5>");

  events.append(eventsList);
}

