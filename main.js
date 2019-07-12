// create an array holding the athlet names
var athletesArray = ["Ronaldinho", "Samuel Eto", "Sergio Ramos", "Lionel Messi", "Neymar Jr"];

$(document).ready(function() {
    // loop through the array
    for (var i = 0; i < athletesArray.length; i++) {
        $("#athlete-buttons").append("<button type='button' onclick='searchGif(\"" + athletesArray[i] + "\")' class='btn btn-primary' value=' " + athletesArray[i] + "'> " + athletesArray[i] + " </button>");
    }
});
// create a function holding the user input
function athleteButtonClicked() {
    var userInput = $('#athlete-input').val();
    searchGif(userInput);
}
// Function that holds the input value
function submitButtonClicked() {
    var userInput = $('#athlete-input').val();
//
    if (userInput) {
        $('#athlete-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}
// Function holding the athletes GIFs 
function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=z9Wr0rgS12HYxUjiczgrT5AVd227yRza',
            type: 'GET',
        })
        //After retrieving the GIFs by using GIPHY API, display the response
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#athletes').empty();
    for (var i = 0; i < response.data.length; i++) {
        // get the rating
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        // get the image of the GIF
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#athletes').append(image);
    }
// create a click event
    $('.movImage').on('click', function() {
        //If the clicked Gif image is still, click on it to animate
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            // if the gif image is animating, click on it to stop 
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}