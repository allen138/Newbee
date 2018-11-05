/* Initialize Firebase*/

    var config = {
        apiKey: "AIzaSyAaBxgXJBVE_9C8qzRu_ebV1sscAVqiers",
        authDomain: "group-project-4da86.firebaseapp.com",
        databaseURL: "https://group-project-4da86.firebaseio.com",
        projectId: "group-project-4da86",
        storageBucket: "group-project-4da86.appspot.com",
        messagingSenderId: "847074672907"
      };
    firebase.initializeApp(config);

var getAllItemsFB = function(){
    console.log("FB");
    var database = firebase.database(config);
}

/* add an item to the local storage */
var setLocalStorage = function (key,val){
   localStorage.setItem(key,value);
};

/* retreives an item from the local storage based on the key */
var getLocalStorage = function(key){
    localStorage.getItem(key);
}

/* removes an item from the local storage based on the key */
var deleteLocalStorage = function(key){
    localStorage.removeItem(key);
}

module.exports = {
    setLocalStorage:setLocalStorage,
    getLocalStorage:getLocalStorage,
    deleteLocalStorage:deleteLocalStorage,
    getAllItemsFB:getAllItemsFB
}
