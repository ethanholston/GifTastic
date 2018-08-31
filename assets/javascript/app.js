var categories = ["yes", "LOL", "happy", "nope", "slow clap", "shut up", "wink", "wtf", "fist bump", "embarassed", "drunk", "oh snap", "omg", "idgaf", "sorry", "shocked"];
var favorites = [];
var queryURL;
var currentPage;
var offset = 0;
var imgNum = 0;
var startPage;
var prevPage;

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

function setButtons(){
    if(localStorage.getItem("categories") == null){
        localStorage.setItem("categories", JSON.stringify(categories));
    } else {categories = JSON.parse(localStorage.getItem("categories"))}
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
            .text("FAVORITES")
            .attr("id", "favorites")
    );
}

function loadPage(){
    console.log(localStorage.getItem("categories"));
    categories = JSON.parse(localStorage.getItem("categories"));
    var startPage = categories[Math.floor(Math.random() * categories.length)];
    currentPage = startPage.split(" ").join("");
    $("#" + currentPage).removeClass("btn-secondary");
    getGifs(currentPage, offset);
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
    prevPage = currentPage;
    offset = 0;
    selected = $(this).text();
    $(this).removeClass("btn-secondary");
    $("#" + currentPage).addClass("btn-secondary");
    currentPage = $(this).attr("id");
    $("#img").empty();  
    getGifs(selected, offset);
});

$(document).on("dblclick", "img", function(){
    var newfav = "<img data-img='" + $(this).attr('data-img') + "' src='" + $(this).attr("data-still") + "' data-still='" + $(this).attr('data-still') +"' data-state='still'/>";
    if(favorites.indexOf(newfav) == -1){
        favorites.push(newfav);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
});

$(document).on("dblclick", ".menu", function(){
    $(this).remove();
    categories.splice(categories.indexOf($(this).text()), 1);
    $("#img").empty();
    localStorage.setItem("categories", JSON.stringify(categories));
})

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

$(document).on("click", "#favorites", function(){
    $("#" + currentPage).addClass("btn-secondary");
    currentPage = "favorites";
    $("#favorites").removeClass("btn-secondary");
    favorites = JSON.parse(localStorage.getItem("favorites"));
    $("#img").empty();
    for(j=0; j<favorites.length; j++){
        $("#img").append(favorites[j]);
    }
});

setButtons();
loadPage();