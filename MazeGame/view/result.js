class Result
{
    var parent;
    PImage gameover;
    PImage outOfLives;
    PImage winner;
    PImage timesUp;

    Result(parent) {
        this.parent = parent;
        gameover = loadImage('assets/images/gameOverScreen.png');
        winner = loadImage('assets/images/winnerScreen.png');
        outOfLives = loadImage('assets/images/ranOutOfLivesScreen.png');
        timesUp = loadImage('assets/images/timesUpScreen.png');
    }

    void Draw() {
        background(224);
        switch (parent.getGame().getState()) {
            case 'diedTooMuch':
                image(outOfLives, 0, 0, parent.getScreenSize().X, parent.getScreenSize().Y);
                break;
            case 'winner':
                image(winner, 0, 0, parent.getScreenSize().X, parent.getScreenSize().Y);
                break;
            case 'timesup':
                image(timesUp, 0, 0, parent.getScreenSize().X, parent.getScreenSize().Y);
                break;
        }
        fill(73, 48, 28);
        textFont(createFont("Arial",19));
        textAlign(RIGHT);
        text("Live Left", 400, 310);
        text("Time Left", 400, 370);
        text("Cheese Left", 400, 430);
        
        fill(255, 255, 255);
        textAlign(LEFT);
        textFont(createFont("Arial",22));
        text((parent.getGame().getAvailableLifes() - parent.getGame().getDeaths()) + " lives", 450, 310);
        text(parent.getGame().getTimeLeft() + "s", 450, 370);
        text(parent.getGame().getEndPointLeft(), 450, 430);
    }

    void MouseMoved() {

        //println(mouseX + ', ' + mouseY);
    }

    void MouseClicked() {
        this.parent.startGame();
    }

    void setState(String s) {
        state = s;
    }
}