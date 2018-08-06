//Initial array of shows
var showArray = ["Game of Thrones", "Parks and Recreation", "Stranger Things", "The Office", "Westworld", "Homeland", "Schitt's Creek", "Letterkenny"];

//function re-renders the HTML to display the appropriate content
function displayGIFContent() {

    var apiKey = "MGtDcc53tus9wT9Q8J7iRktiZupG0X8G";
    var show = $(this).attr("data-name");
    ratingVal = "r";
    var queryURL = 
    "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=" + apiKey + "&fmt=json&limit=20" + "&rating=" + ratingVal;

    // Creating an AJAX call for the specific show button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // console.log(response);
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            //creating a div to hold all gifs within the show
            var showDiv = $("<div class='show float-left'>");

            // Creating a div to hold the contents of each gif
            var imageDiv = $("<div class='show text-center mt-2'>");

            // Storing the gif rating data
            var rating = results[i].rating;
            console.log("Rating: " + rating);

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            imageDiv.append(pOne);

            // Storing the still image URL
            var stillImage = results[i].images.fixed_height_still.url;

            // Storing the animated image URL
            var animatedImage = results[i].images.fixed_height.url;

            // Creating an element to hold the still and animated image urls
            var pTwo = $("<img>").addClass("gif").attr("src", stillImage).attr("data-state", "still").attr("data-still", stillImage).attr("data-animated", animatedImage);

            // Displaying the still image URL
            imageDiv.append(pTwo);

            // Putting the each gif in the show div
            $(showDiv).prepend(imageDiv);

            // Putting the entire show above the previous show
            $("#gifArea").prepend(showDiv);

        }
        $(showDiv).prepend(imageDiv);
    });
}

    // Function for displaying show data
    function renderButtons() {

        // Deleting the shows prior to adding new shows to avoid repeat buttons
        $("#buttonArea").empty();

        // Looping through the array of movies
        for (var i = 0; i < showArray.length; i++) {

          // Then dynamically generating buttons for each show in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("show-btn btn btn-outline-light mr-2");
          // Adding a data-attribute
          a.attr("data-name", showArray[i]);
          // Providing the initial button text
          a.text(showArray[i]);
          // Adding the button to the buttons-view div
          $("#buttonArea").append(a);
        }
    }

        // This function handles events where a show button is clicked
        $("#searchButton").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var show = $("#searchBar").val().trim();

        // Adding movie from the textbox to our array
        showArray.push(show);

        // Calling renderButtons which handles the processing of our show array
        renderButtons();
        });

     // Adding a click event listener to all elements with a class of "movie-btn"
     $(document).on("click", ".show-btn", displayGIFContent);

     // Calling the renderButtons function to display the intial buttons
     renderButtons();

    //on click, change between still and animated images
    $(document).on("click", ".gif", function(){ 

        console.log(".gif clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log("state: " + state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animated"));
          $(this).attr("data-state", "animated");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".gif", function(){ 

        console.log(".gif clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log("state: " + state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animated"));
          $(this).attr("data-state", "animated");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".rating", function(){ 
        console.log("rating button clicked");
        ratingVal = $(this).data("rating").toLowerCase();
        console.log("rating selected: " + ratingVal);
    })