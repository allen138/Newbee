
function getLocation() {
    if (navigator.geolocation) {
        (navigator.geolocation.getCurrentPosition(showPosition));
    }
}

function showPosition(position) {
    console.log(position.coords.latitude + " " + position.coords.longitude)
    var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };

}

var apiKey = "api_key=dc6zaTOxFJmzC";
var queryURL = "https://api.giphy.com/v1/gifs/random?" + apiKey;


function ajax() {
    var url = queryURL + "&tag=" + $(this).text();
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var imageUrl = response.data.images.original_still.url;
        var image = $("<img>");

        image.attr("src", imageUrl);
        image.attr("alt", "image");
        image.attr("static", imageUrl);
        image.attr("paused", true);
        image.attr("animated", response.data.images.original.url);
        image.addClass("gif");
        image.click(onGifClick);
        var rating = $("<div>");
        rating.text(response.data.rating);
        image.append(rating);
        $("#images").append(image);
    });
}
getLocation();