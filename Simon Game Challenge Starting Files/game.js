
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

let clickedReview = 0;

$(document).keypress(() => {
    if(!started) {
        $('#level-title').text(`Level ${level}`)
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    if (userChosenColour !== 'purple') {
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }

    playSound(userChosenColour);
    animatePressed(userChosenColour);   

})

$('#purple').click(function() {
    showPattern();
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                level++;
                $('#level-title').text(`Level ${level}`)
                nextSequence();
            }, 1000);
        }
    } else {
        console.log('wrong');
        playSound('wrong');
        let body = $('body').addClass('game-over');
        setTimeout(function() {
            body.removeClass('game-over');
        }, 200);
        $('#level-title').text("Game Over, Press Any Key to Restart");
        if (clickedReview !== 0) {
            $('#level-title').append(`<br><br>(You Relied on Help ${clickedReview} Times)`);
        }
        startOver();
    }
}

function playSound(name) {
    let audio = new Audio(`Sounds/${name}.mp3`);
    audio.volume = 0.09;
    //console.log(`/Sounds/${randomChosenColour}.mp3`);
    audio.play();
}

function animatePressed(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    //console.log('Random number', randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    //console.log('Random chosen colour ', randomChosenColour);
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePressed(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    clickedReview = 0;
}

//make show pattern button
function showPattern() {
    clickedReview++;
    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            animatePressed(color);
        }, i * 300);
    });
}