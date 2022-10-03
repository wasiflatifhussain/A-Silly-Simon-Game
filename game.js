var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

//detect mouse click
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // console.log(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

$(document).keydown(function(event) {
    if (!started) {
        $("#level-title").text("Level "+level); 
        nextSequence();
        started = true;
    }
});

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("all good!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // $(document).keydown(function(){
        //     startOver();
        // })
        startOver();

    }
    else {console.log("oh no");}
    
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function playSound (name) {
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function nextSequence () {
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level); 
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);

    playSound(randomChosenColour);

}



