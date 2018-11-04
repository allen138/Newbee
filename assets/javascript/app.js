
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
  var seatgeek = {
    url: "https://api.seatgeek.com/2/events?client_id=MTM3NTY1NjV8MTU0MTAzNjQ2MC42NA",
    rangeInMiles: 0,
    sortField: "datetime_local",
    sortOrder: "desc",
    events: [],
    urlStr: "",
    getEvents: function (rangeInMile, isAsc, taxonomies) {
      // validation
      this.rangeInMiles = rangeInMile;
      // sort order 
      if (isAsc) {
        this.sortOrder = "asc";
      } else {
        this.sortOrder = "desc";
      }

      // api
      $.ajax({
        url: "https://api.ipify.org/?format=json",
        method: "GET"
      }).then(function (res) {
        var ip = res.ip;
        var taxonomiesStr = '';
        for (var i = 0; i < taxonomies.length; i++) {
          taxonomiesStr = taxonomiesStr + "&taxonomies.name=" + taxonomies[i];
        }
        seatgeek.urlStr = seatgeek.url + "&geoip=" + ip + "&range=" + seatgeek.rangeInMiles + "mi" +
          "&sort=" + seatgeek.sortField + "." + seatgeek.sortOrder + taxonomiesStr;
        $.ajax({
          url: seatgeek.url + "&geoip=" + ip + "&range=" + seatgeek.rangeInMiles + "mi" +
            "&sort=" + seatgeek.sortField + "." + seatgeek.sortOrder + taxonomiesStr,
          method: "GET"
        }).then(function (res) {
          seatgeek.setEvents(res.events);
        });

      });
    },
    setEvents: function (events) {

      this.events = events;
    }
  };

  // click function rendering search input. 
  $("#search").on("click", function (event) {
    event.preventDefault();
    var taxonomies = [];
    $.each($("input:checked"), function () {
      var search = $(this).val();
      taxonomies.push(search);
      console.log(search);
    });

    seatgeek.getEvents(11, false, taxonomies);
    console.log(seatgeek);
    renderResults(seatgeek);
  });
  // function to render api results to ui
  function renderResults(seatgeek) {
    for (var i = 0; i < seatgeek.events.length; i++) {
      console.log(seatgeek.events[i]);
      var mainEvents = $("<ul>");
      mainEvents.addClass("list-group");
      $(".events").append(mainEvents);

      var title = seatgeek.events[i].title;
      var eventsList = $("<li class='event-list-title'></li>");
      eventsList.append("<span class='label label-primary'>" + title + "</span>");

      var eventDate = seatgeek.events[i].datetime_local;
      eventsList.append("<h5>" + eventDate + "</h5>");

      mainEvents.append(eventsList);
      $(".events").html(mainEvents);
    };

  };

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

  /********** Storage Helper's ************/

  /* Get's all values from Fire Base */
  var getAllValuesFB = function () {

    database.ref().on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
      }, function (errorObject) {
        console.log("Error " + errorObject.code)
      });
    });
  };

  /* Get's child from Fire Base */
  var checkChildAdded = function () {

    database.ref().on("child_added", function (snapshot) {
      var val = snapshot.val();
      console.log(val);

    }, function (errorObject) {
      console.log("Error " + errorObject.code);
    });

  }


  /* add an item to the local storage */
  var setLocalStorage = function (key, val) {
    localStorage.setItem(key, value);
  };

  /* retreives an item from the local storage based on the key */
  var getLocalStorage = function (key) {
    localStorage.getItem(key);
  }

  /* removes an item from the local storage based on the key */
  var deleteLocalStorage = function (key) {
    localStorage.removeItem(key);
  }

});


