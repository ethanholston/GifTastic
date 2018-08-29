var categories = ["yes", "LOL", "happy", "nope", "slow clap", "shut up", "wink", "wtf", "fist bump", "embarassed", "drunk", "oh snap", "omg", "idgaf", "sorry", "shocked"];
var queryURL;
var selected;
var currentPage;
var offset = 0;
var imgNum = 0;

function getGifs(x, y){
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&offset=" + y + "&api_key=dc6zaTOxFJmzC";    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);        
        var loadButton = "<button type='button' id='load-more' class='btn btn-secondary'>Load 12 more gifs</button>";
        for(j=0; j<12; j++){
            var imgURL = response.data[j].images.fixed_width.url;
            var imgStill = response.data[j].images.fixed_width_still.url;
            imgNum = "img" + j;
            var newSpan = $("<span>");
            var imgTag = $("<img>").attr("data-img", imgURL).attr("data-still", imgStill).attr("data-state", "still");
            imgTag.attr("src", $(imgTag).attr("data-still"));
            newSpan.append(imgTag);
            $("#img").append(newSpan).attr("data-name", imgNum);
        } 
        $("#img").append(loadButton);
    });
}

function select(){
    for(i=0; i<categories.length; i++);
        if(selected == categories[i]);
        $()
}

$(document).on("click", "#submit", function(){
    event.preventDefault();
    if($("#add").val() != ""){
        $("#categories").append($("<button>")
            .attr("type", "button")
            .addClass("btn btn-secondary menu")
            .html("#add").val());
        selected = $("#add").val();
        $("#add").val('');
        numGifs = 12;
        $("#img").empty();
        getGifs(selected, numGifs);
    }
    
});

$(document).on("click", ".menu", function(){
    offset = 12;
    selected = $(this).text();
    $(this).removeClass("btn-secondary");
    $("#" + currentPage).addClass("btn-secondary");
    currentPage = $(this).attr("id");
    $("#img").empty();
    getGifs(selected, offset);
    
});

$(document).on("click", "#load-more", function(){
    offset += 12;
    imgNum = offset;
    // numGifs += 12;
    getGifs(selected, offset);
    $("#load-more").detach();
});

$(document).on("click", "img", function(){
    state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-img"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

for(i=0; i<categories.length; i++){
    $("#categories").prepend(
        $("<button>").attr("type", "button")
        .addClass("btn btn-secondary menu")
        .text(categories[i])
        .attr("id", categories[i]));
}

getGifs(categories[Math.floor(Math.random() * categories.length)], 12);