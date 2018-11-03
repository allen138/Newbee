$(document).ready(function() {
/**
 * 
 * GLOBALS
 */

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

/**
 *  geoIP defaults to empty string
 *  rangeInMile defaults to 10
 *  sortField defaults to datetime_local
 *  sortOrder defaults to desc the other option is asc
 */
var seatgeek = {
  url : "https://api.seatgeek.com/2/events?client_id=MTM3NTY1NjV8MTU0MTAzNjQ2MC42NA",
  geoIP : "",
  rangeInMiles : 10,
  sortField : "datetime_local",
  sortOrder : "desc"
};

/**
 * 
 * END OF GLOBALS
 */

/**
 * sample api : https://api.seatgeek.com/2/events?client_id=MTM3NTY1NjV8MTU0MTAzNjQ2MC42NA&geoip=73.241.184.216&range=12mi&sort=datetime_local.desc
 */

 /**
  * @param pass the seakgeek obj fully populated
  * @param geoIP this is the ip from the browser
  * @param radiusInMiles  this is the radius from the geoip address point.
  * 
  * Use the url to search for events that are now and in the future
  */
 function getData() {

  $.ajax({
    url : seatgeek.url + "&geoip=" + seatgeek.geoIP + "&range=" + seatgeek.rangeInMiles + "mi" +
    "&sort=" + seatgeek.sortField + "." + seatgeek.sortOrder,
    method : "GET"
  }).then(function(res){

    return res;

  });

};

/**
* testing
*/
// seatgeek.geoIP = "73.241.184.21";


// click function rendering search input. 
$("#search").on("click", function (event) {
  event.preventDefault();
  console.log("clicked");
  var search = $("input:checked").val();
  console.log(search);
  // var queryURL = "https://api.seatgeek.com/2/events?client_id=MTM3MzYxMTF8MTU0MDg2OTY4OS40NQ";

  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  // }).then(function (response) {
  //   console.log(response);
    
  // });
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

});