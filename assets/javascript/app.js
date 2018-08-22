var categories = ["yes", "LOL", "happy", "nope", "slow clap", "shut up", "wink", "wtf", "fist bump", "embarassed", "drunk", "oh snap", "omg", "idgaf", "sorry", "shocked"];
var queryURL;
var selected;
var numGifs = 12;
var prevNum = 12;

function getGifs(x, y){
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&limit=" + y + "&api_key=dc6zaTOxFJmzC";    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);        
        var loadButton = "<button type='button' id='load-more' class='btn btn-secondary'>Load 12 more gifs</button>";
        for(j=numGifs-prevNum; j<y; j++){
            var imgURL = response.data[j].images.fixed_width.url;
            var imgNum = "#img" + j;
            var newSpan = $("<span />").append("<img src=" + imgURL + "/>");
            $("#img").append(newSpan);
        } 
        $("#img").append(loadButton);
    });
}

$(document).on("click", "#submit", function(){
    $("#categories").append("<button type='button' class='btn btn-secondary menu'>" + $("#add").val() + "</button>");
    $("#add").val('');
});

$(document).on("click", ".menu", function(){
    numgifs = 12;
    selected = $(this).text();
    $("#img").empty();
    getGifs(selected, numGifs);
});

$(document).on("click", "#load-more", function(){
    prevNum = numGifs;
    numGifs += 12;
    if(numGifs > 25){
        numGifs = 25;
    }
    getGifs(selected, numGifs);
    $("#load-more").detach();
});

for(i=0; i<categories.length; i++){
    $("#categories").append("<button type='button' class='btn btn-secondary menu'>" + categories[i] + "</button>");
}

getGifs(categories[Math.floor(Math.random() * categories.length)], numGifs);