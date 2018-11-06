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

  var userDataConfig = {
    apiKey: "AIzaSyBLZjIB6nUrsTKU2lHJuRLoPgNosQfAquE",
    authDomain: "ucb-project-search-event.firebaseapp.com",
    databaseURL: "https://ucb-project-search-event.firebaseio.com",
    projectId: "ucb-project-search-event",
    storageBucket: "ucb-project-search-event.appspot.com",
    messagingSenderId: "830770899521"
  };

  const userdata = firebase.initializeApp(userDataConfig,'userdata');
  var userDatabase = firebase.database(userdata);

  var loggedInUserID = undefined;
  var loggedInUserName = undefined;

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

  //click sign-in

  $('#sign-in').on("click", function (event){
    event.preventDefault();
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    var isUser = checkExistingUser(username,password);
    console.log(isUser);
    if(loggedInUserName === undefined){
      console.log("Enter a valid Username and Password");
    }
  });

  $('#sigup-submit').on("click", function (event){
    event.preventDefault();
    var userID = guidGenerator();
    var userName = $("#signup-username").val();
    var password = $("#signup-password").val();
    var data = {
      userID:userID,
      userName:userName,
      password:password
    }
    createUser(data);
  });

  // click function rendering search input. 
  $("#search").on("click", function (event) {
    $(".events").empty();
    event.preventDefault();
   
    var taxonomies = [];
    $.each($("input:checked"), function () {
      var search = $(this).val();
      taxonomies.push(search);
      $(".events").empty();
    });

    seatgeek.getEvents(11, false, taxonomies);

    //console.log(seatgeek.events);
    //populateList(seatgeek);
    console.log(seatgeek);
  });


  /*************************************************** */
  //List Populators and event click functions
  /*************************************************** */

  database.ref().on("value", function (snapshot) {
    var myEvents = snapshot.child("selectedEvents").val();
    createEventButtons(myEvents,$(".myEvents"));
  });



  function createEventButtons(myEvents, eventDiv) {
    if (myEvents === null) return;
    for (var i = 0; i < myEvents.length; i++) {

      var eventButton = $("<div>");
      var eventContainer = $("<div>");
      var eventVenue =  $("<div>");
      var title = $("<div>");
      var time = $("<div>");
      var event = myEvents[i];
      var id = event.id;

      time.text(event.datetime_local);
      eventContainer.addClass("eventContainer")
      title.addClass("title")
      eventVenue.addClass("eventVenue");
      eventButton.addClass("eventButton");
      eventContainer.attr("id", id);

      eventVenue.text(myEvents[i].venue.name);
      title.text(event.title);
      eventContainer.append(title);
      eventContainer.append(eventVenue);
      eventButton.append(eventContainer);
      eventContainer.append(time);
      eventDiv.append(eventButton);
    }
  }

  function populateList(response) {
    var myEvents = response.events;
    console.log(response);
    createEventButtons(myEvents,$(".events"));

    $(".eventContainer").on("click", function (e) {

      var self = $(this);
      var ref = database.ref();
      var id = parseInt(self.attr("id"));
      console.log("f: " + id);
      ref.once("value").then(function (snapshot) {
        var selectedEvents = snapshot.child("selectedEvents").val();
        if (selectedEvents === null) {
          selectedEvents = [];
        };

        $.ajax({
          url: "https://api.seatgeek.com/2/events?client_id=MTM3NTY1NjV8MTU0MTAzNjQ2MC42NA&id=" + id,
          method: "GET"
        }).then(function (res) {
          var event = res.events[0];
          if (!selectedEvents.includes(event)) {
            selectedEvents.push(event);
          }
          database.ref().set({
            "selectedEvents": selectedEvents
          });
          self.remove();
        });


      });

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
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
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

  /* retreives a the ID from userDB using name and check if the password is correct */ 

  var checkExistingUser = function (username,password){
    var isUser = false;
    var data = userDatabase.ref().orderByChild('userName').equalTo(username).on("value", function(snapshot) {
      
      snapshot.forEach(function(data) {
        if(password === data.val().password ){
          console.log("User and Password Match");
          loggedInUserID = data.val().userID;
          loggedInUserName = data.val().userName;
          isUser = true;
        }
      });
    });
    return isUser;
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

