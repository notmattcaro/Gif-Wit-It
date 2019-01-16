//create an array of gifs
var gif = ["cats"];

//create an ajax call to retrieve information 
function gifDump() {
    //create variable that holds the attribute gif-name *this will be used later when new attribute is created*
    var thisGif = $(this).attr("data-gifName");
    //create general apiurl that holds a limit of 20
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisGif + "&api_key=dc6zaTOxFJmzC&limit=20";

    $("#gif-dump").empty();
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(queryURL);
        //This is so we can see what response it's recieving
        console.log(response);

        var gifData = response.data;

        for (var i = 0; i < gifData.length; i++) {
            
            var gifSpan = $("<span>");
            var gifImage = $("<img>");
            gifImage.attr("src", gifData[i].images.fixed_height_still.url);
            gifImage.addClass("gifState");
            gifImage.attr("data-state", "still");
            gifImage.attr("data-animate", gifData[i].images.fixed_height.url);
            gifImage.attr("data-still", gifData[i].images.fixed_height_still.url);
            gifSpan.append(gifImage);
            $("#gif-dump").prepend(gifSpan);
        }

    });
}

$(document).on("click", ".gifState", function() {
    var gifState = $(this).attr("data-state");
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");

    if (gifState === "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
});

//create a button dump function 
function buttonDump () {
    
    var newGif = $("#gif-input").val().trim();
    newGif = "";

    //This will make sure that the for loop emptys and then replaces
    $("#buttons-dump").empty();

    for (var i = 0; i < gif.length; i++) {


        var newButton = $("<span>");

        //add stuff to new span
        newButton.addClass("gifList");
        newButton.attr("data-gifName", gif[i]);
        newButton.text(gif[i]);

        //after adding all these new things to our span we finally append the button
        $("#buttons-dump").append(newButton);

    }

}

var itsPlaying = false;

$("#add-gif").on("click", function(event) {
    event.preventDefault();


    var newGif = $("#gif-input").val().trim();
    if (newGif == "") {
        return;
    } else if (itsPlaying == false) {

        gif.push(newGif);
        console.log(gif);

        //make a global variable and a flag
        var itTakes2 = new Audio("music/itTakes2.mp3");
        itTakes2.currentTime = 13;
        itTakes2.play();
        itsPlaying = true;

        buttonDump();
    } else {
        gif.push(newGif);
        console.log(gif);
        buttonDump();
    }

});


$(document).on("click", ".gifList", gifDump);

buttonDump();