
$(document).ready(function () {
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

  var output = "";
  var seatgeek = {
    url: "https://api.seatgeek.com/2/events?client_id=MTM3NTY1NjV8MTU0MTAzNjQ2MC42NA",
    geoIP: "",
    rangeInMiles: 10,
    sortField: "datetime_local",
    sortOrder: "desc",
  };
  

  async function setGeoIP() {
    $.getJSON('http://ipinfo.io', function (data) {
      return data.ip,seatgeek;
    });
  }

  async function getEvents (geoIP, seatgeek) {
    seatgeek.geoIP = geoIP;
 
    console.log(seatgeek.url);
    $.ajax({
      url: seatgeek.url + "&geoip=" + seatgeek.geoIP + "&range=" + seatgeek.rangeInMiles + "mi" +
        "&sort=" + seatgeek.sortField + "." + seatgeek.sortOrder,
      method: "GET"
    }).then(function (res) {
      output = res;
      console.log(output);
      return res;
    });
  }

  // click function rendering search input. 
  $("#search").on("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    var search = $("input:checked").val();

    getEvents(setGeoIP(),seatgeek);

    console.log(output);
    var data = {
      event: search
    }

    //pushChildFB(data);

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

  function populateList(response) {
    for (var i = 0; i < response.events.length; i++) {
      var div = $("<div>");
      var row = $("<div>");
      var title = $("<div>");

      row.addClass("eventContainer")
      title.addClass("title")
      div.addClass("eventButton");


      var event = response.events[i];

      title.text(event.title);
      row.append(title);
      div.append(row);
      $(".events").append(div);
    }

  }
});
