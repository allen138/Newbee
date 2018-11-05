// $(document).ready(function() {

//   // Initialize Firebase
//   var configUserData = {
//     apiKey: "AIzaSyBLZjIB6nUrsTKU2lHJuRLoPgNosQfAquE",
//     authDomain: "ucb-project-search-event.firebaseapp.com",
//     databaseURL: "https://ucb-project-search-event.firebaseio.com",
//     projectId: "ucb-project-search-event",
//     storageBucket: "ucb-project-search-event.appspot.com",
//     messagingSenderId: "830770899521"
//   };

//   var userdata = firebase.initializeApp(configUserData);
//   var userDatabase = firebase.database(userdata);

//   console.log(guidGenerator());

//   function guidGenerator() {
//     var S4 = function() {
//        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//     };
//     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// }

// var createUserFB = function(obj){
//   console.log(obj);

//   userDatabase.ref().push({
//     userID: obj.userID,
//     userName:obj.userName,
//     password:obj.password
//   });
// }

// var getUserID = function(){

//   var data = userDatabase.ref().orderByChild('userName').equalTo('sop').on("value", function(snapshot) {
//     console.log(snapshot.val().userID);

//     snapshot.forEach(function(data) {
//         console.log(data.val().userID);
//         console.log(data.val().userName);
//         console.log(data.val().password);
//     });
//   });

//   // console.log(data);

//   // userDatabase.ref().on("value", function(snapshot) {
//   //   orderByChild('starCount')
//   //   console.log(snapshot);
//   // });
//   //var ref = userDatabase.ref(configUserData.projectId);
  
//   // ref.child('ucb-project-search-event').orderByChild('userName').equalTo('sop').on("value", function(snapshot) {
//   //     console.log("inside");
//   //     console.log(snapshot.val());

//   //     snapshot.forEach(function(data) {
//   //         console.log(data.key);
//   //     });

//   // });
// }

// getUserID();

// $("#sigup-submit").on("click", function (event) {
//   console.log("Hello");
//     event.preventDefault();
//     var userID = guidGenerator();
//     var userName = $("#username").val();
//     var password = $("#password").val();
//     var data = {
//       userID:userID,
//       userName:userName,
//       password:password
//     }
//     createUserFB(data);
//   });



// });