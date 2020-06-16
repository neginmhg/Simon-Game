var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//choosing the sequence function
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  //a random numbr between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  //choose the random element of the array
  var randomChosenColour = buttonColours[randomNumber];
  //push the random element to the pattern of game
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  //Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//playing a sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  var delayInMilliseconds = 100; //1 second

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, delayInMilliseconds);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
