console.log("Storgae Helper Added");

/* add an item to the local storage */
var setLocalStorage = function (key, value) {
    localStorage.setItem(key, value);
};

/* retreives an item from the local storage based on the key */
var getLocalStorage = function (key) {
    return localStorage.getItem(key);
}

/* removes an item from the local storage based on the key */
var deleteLocalStorage = function (key) {
    console.log(key);
    localStorage.removeItem(key);
}

module.exports = {
    deleteLocalStorage:deleteLocalStorage,
    getLocalStorage:getLocalStorage,
    setLocalStorage:setLocalStorage
}
