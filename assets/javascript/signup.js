$(document).ready(function() {

  // Initialize Firebase
  var configUserData = {
    apiKey: "AIzaSyBLZjIB6nUrsTKU2lHJuRLoPgNosQfAquE",
    authDomain: "ucb-project-search-event.firebaseapp.com",
    databaseURL: "https://ucb-project-search-event.firebaseio.com",
    projectId: "ucb-project-search-event",
    storageBucket: "ucb-project-search-event.appspot.com",
    messagingSenderId: "830770899521"
  };
  
  var userdata = firebase.initializeApp(configUserData);
  var userDatabase = firebase.database(userdata);

  console.log(guidGenerator());

  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

$("#sigup-submit").on("click", function (event) {
  console.log("HEllo");
    event.preventDefault();
    var userID = guidGenerator();
    var userName = $("#username").val();
    var password = $("#password").val();
    var data = {
      userID:userID,
      userName:userName,
      password:password
    }
    createUserFB(data);
  });

  var createUserFB = function(obj){
    console.log(obj);

    userDatabase.ref().push({
      userID: obj.userID,
      userName:obj.userName,
      password:obj.password
    });
  }

});