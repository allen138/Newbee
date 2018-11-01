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
$(".btn").on("click", function (event) {
  event.preventDefault();
  console.log("clicked");
  var search = $("#search").val().trim();
  console.log(search);
  var queryURL = "https://api.seatgeek.com/2/events?client_id=MTM3MzYxMTF8MTU0MDg2OTY4OS40NQ";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});