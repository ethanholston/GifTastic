var categories = ["yes", "LOL", "happy", "nope", "slow clap", "shut up", "wink", "wtf", "fist bump", "embarassed", "drunk", "oh snap", "omg", "idgaf", "sorry", "shocked"];
var queryURL;
var currentPage;
var offset = 0;
var imgNum = 0;
var startPage;

function getGifs(x, y){
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&offset=" + y + "&api_key=dc6zaTOxFJmzC";    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);        
        var loadButton = $("<button>").attr("type", "button").attr("id", "load-more")
        .addClass("btn btn-secondary").text("Load 12 more gifs"); 
        for(j=0; j<12; j++){
            var gifURL = response.data[j].images.fixed_width.url;
            var imgStill = response.data[j].images.fixed_width_still.url;
            var newSpan = $("<span>");
            var imgTag = $("<img>").attr("data-img", gifURL).attr("data-still", imgStill).attr("data-state", "still");
            imgTag.attr("src", $(imgTag).attr("data-still"));
            newSpan.append(imgTag);
            $("#img").append(imgTag);
        } 
        $("#img").append(loadButton);
    });
}

$(document).on("click", "#submit", function(){
    event.preventDefault();
    if($("#add").val() != "" && categories.indexOf($("#add").val().trim()) == -1){
        categories.push($("#add").val().trim());
        $("#" + currentPage).addClass("btn-secondary");
        currentPage = $("#add").val().trim().split(" ").join("");
        $("#categories").append($("<button>")
            .attr("type", "button")
            .attr("id", currentPage)
            .addClass("btn btn-secondary menu")
            .html($("#add").val()));
        $("#" + currentPage).removeClass("btn-secondary");
        $("#add").val('');
        $("#img").empty();
        getGifs(currentPage, 12);
    }
    if(categories.indexOf($("#add").val().trim()) != -1){
        alert("That was already added");
        $("#add").val("");
    }
    
});
$(document).on("click", ".menu", function(){
    offset = 0;
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
    getGifs(currentPage, offset);
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

function setButtons(){
    for(i=0; i<categories.length; i++){
        $("#categories").prepend(
            $("<button>").attr("type", "button")
            .addClass("btn btn-secondary menu")
            .text(categories[i])
            .attr("id", categories[i].split(" ").join(""))
        );
    }
    $("#categories").prepend(
        $("<button>").attr("type", "button")
            .addClass("btn btn-secondary    ")
            .text("Favorites")
            .attr("id", "favorites")
    );
}

function loadPage(){
    var startPage = categories[Math.floor(Math.random() * categories.length)];
    currentPage = startPage.split(" ").join("");
    $("#" + currentPage).removeClass("btn-secondary");
    getGifs(currentPage, offset);
}

setButtons();
loadPage();