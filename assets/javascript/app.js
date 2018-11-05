$(document).ready(function () {
  /**
   * 
   * GLOBALS
   */

  //  Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZ9w3hQPnIWxgY-KKl3awkJirnN5mvG3w",
    authDomain: "proj-1-8fff4.firebaseapp.com",
    databaseURL: "https://proj-1-8fff4.firebaseio.com",
    projectId: "proj-1-8fff4",
    storageBucket: "proj-1-8fff4.appspot.com",
    messagingSenderId: "833251081928"
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
      $.getJSON({
        url: 'http://ipinfo.io',
        method: "GET"
      }).
        then(function (res) {
          var ip = res.ip;
          console.log(ip);
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
            populateList(seatgeek);
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

    //console.log(seatgeek.events);
    //populateList(seatgeek);
  });


  /*************************************************** */
  //List Populators and event click functions
  /*************************************************** */

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
    var myEvents = [];
    for (var i = 0; i < response.events.length; i++) {

      var eventButton = $("<div>");
      var eventContainer = $("<div>");
      var title = $("<div>");
      var time = $("<div>");

      time.text(seatgeek.events[i].datetime_local);
      eventContainer.addClass("eventContainer")
      title.addClass("title")
      eventButton.addClass("eventButton");

      
      var event = response.events[i];
      var id = event.id;
      eventContainer.attr("id", id);
      console.log(event);
      myEvents.push(event);

      title.text(event.title);
      eventContainer.append(title);
      eventButton.append(eventContainer);
      eventContainer.append(time);
      $(".events").append(eventButton);
    }
    var key = database.ref("unselectedEvents").push({
      "myEvents": myEvents
    });

    $(".eventContainer").on("click", function (e) {
      var self = $(this);
      var name = self.find(".title");
      /* var ref = database.ref(name.attr("key"));
       ref.once("value")
         .then(function (snapshot) {
           var key = snapshot.child("event");
           var value = key.val();
           var key2 = database.ref("selectedEvents").push({
             "event": value
           });
 
         });
 */

    });

  }

  /*************************************************** */
  //End List Populators and event click functions
  /*************************************************** */

  /********** SignUp Helper's ************/

  /* returns a GUID which will be used as UserID */
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  /********** Storage Helper's ************/

  /* Creates a User in User DB*/
  var createUser = function (obj) {
    console.log(obj);
    userDatabase.ref().push({
      userID: obj.userID,
      userName: obj.userName,
      password: obj.password
    });
  }

  /* retreives a the ID from userDB using name */

  var getUserID = function (name) {

    var data = userDatabase.ref().orderByChild('userName').equalTo(name).on("value", function (snapshot) {
      console.log(snapshot.val().userID);

      snapshot.forEach(function (data) {
        console.log(data.val().userID);
        console.log(data.val().userName);
        console.log(data.val().password);
      });
    });
  }

  /* Get's all values from Fire Base */
  var getAllEvent = function () {

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

}

);

