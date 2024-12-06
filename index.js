var gamePattern = [];

var buttonColours = ["green", "red", "yellow", "blue"];

var userClickedPattern = [];

var started = false;

var level = 0;

hideEverything();

$(".start").click(function() {
    if(!started){
        $("#header").text("Level " + level);
        setTimeout(function(){
            nextSequence();
        }, 400);
        started = true;
        hideStart();
        showEverything();
    }
});



$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#header").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#header").text("Game Over!");
        startOver();
        showStart();
        $(".start-text").css("font-size", "2.5rem").text("Restart!");

    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    hideEverything();
}

function hideStart(){
    $(".start").hide();
}

function showStart(){
    $(".start").show();
}

function hideEverything(){
    $(".container").hide();
}

function showEverything(){
    $(".container").show();
}