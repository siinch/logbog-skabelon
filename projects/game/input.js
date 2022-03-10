document.addEventListener("keydown", function(event) {
    
    // start the game if the startkey is pressed
    if(gameState == "menu" && event.key == startKey) {
        if (music.paused) music.play();
        gameState = "action";
        birdCanFlap = true;
        return; 
    }

    // flap the wings of the bird if the flapkey is pressed
    if (gameState == "action" && event.key == birdFlapKey && birdCanFlap == true) {
        if(birdYAccelleration == 0) birdYAccelleration = birdBeginningYAccelleration;
        birdYSpeed = birdFlapForce;
        birdCanFlap = false;
        birdFlapSound.currentTime = 0.1;
        birdFlapSound.play();
        return;
    }

    // reset the game if the restart key is pressed
    if(gameState == "gameover" && event.key == restartKey) {
        gameState = "menu";
        birdYPosition = birdStartYPosition;
        birdYSpeed = birdStartYSpeed;
        birdYAccelleration = birdStartYAccelleration;
        birdCanFlap = false;
        fireballs = [];
        fireballTimeSinceLastSpawn = fireballSpawnInterval;
        scoreValue = 0;
        coins = [];
        return; 
    }

});

document.addEventListener("keyup", function(event) {

    // make the bird able to flap again if the flapkey is released
    if (gameState == "action" && event.key == birdFlapKey) {
        birdCanFlap = true;
        return;
    }

});

// add click support
if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
    document.addEventListener("touchstart", handleClick);
else
    document.addEventListener("mousedown", handleClick);

function handleClick() {
    
    // if the menu is clicked, start the game
    if(gameState == "menu") {
        if (music.paused) music.play();
        gameState = "action";
        birdCanFlap = true;
        return; 
    }

    // flap the wings if the action scene is clicked
    if (gameState == "action") {
        if(birdYAccelleration == 0) birdYAccelleration = birdBeginningYAccelleration;
        birdYSpeed = birdFlapForce;
        birdFlapSound.currentTime = 0.1;
        birdFlapSound.play();
        return;
    }

    // reset the game if the gameover screen is clicked
    if(gameState == "gameover") {
        gameState = "menu";
        birdYPosition = birdStartYPosition;
        birdYSpeed = birdStartYSpeed;
        birdYAccelleration = birdStartYAccelleration;
        birdCanFlap = false;
        fireballs = [];
        fireballTimeSinceLastSpawn = fireballSpawnInterval;
        scoreValue = 0;
        coins = [];
        return; 
    }

}