$(document).ready(function(){
    //adding topics array
    var topics = ["Fry", "Amy Wong", "Bender","Dr. Zoidberg"];

    //setting images container to empty when the page first loads and connecting to giphy API
    function displayImg(){
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        //setting limit to 10 per requirements
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=GJvlRRllYIARtRbiTtqbhI8Ikzk0SmIl";   
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {
            //loop to pull images until limit
            for(var j = 0; j < limit; j++) {    
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                // rating for each gif
                displayDiv.append(image);
                var rating = response.data[j].rating;
                console.log(response);

                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)
                $("#display-images").append(displayDiv);
            }
        });
    }
    //creating function to show the buttons in the empty div
    function renderButtons(){ 
        $("#display-buttons").empty();
        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topics[i]); 
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); 
        }
        
    }
    function imageChangeState() {          
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }
    //pushing new topics to the array and displaying new button
    $("#submitPress").on("click", function(){
        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);     
        renderButtons();
        return false;
    })


    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});