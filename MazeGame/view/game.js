

class Game
{
    var parent;
    String mapName = "1";
    Ball ball;
    Map map;
    int backgroundColor = 224;
    PImage bg;
    Timer timer;
    String state;
    int deaths;
    int lifes;

    Game(parent) {
        this.parent = parent;

        //// Initialize Objs
        Style style = new Style();
        style.strokeWeight = 10;
        style.fill = [0, 121, 184];
        style.stroke = 255;
        style.radius = 30;
        style.width = 25;
        style.height = 25;
        ball = new Ball(style, [50, 50]);

        map = new Map(this, mapName);

        bg = loadImage('assets/images/maze.png');

        timer = new Timer(60);

        state = 'waiting';
        lifes = 10;
    }

    void Draw() {
        //  Clear it
        background(backgroundColor);
        //image(bg, 0, 0, parent.getScreenSize().X, parent.getScreenSize().Y);
        //  Check if result is set, change view to result if it has
        map.Draw();

        if (ball.HasCollided(map.GetWallColor())) {
            //  Check ball collision
            ball.move(map.BallStartPos());
            ball.waitForMouse = true;
            deaths++;
            if (deaths >= lifes) {
                setState("diedTooMuch");
                this.End();
            }
        } else if (ball.HasCollided(map.GetEndColor())) {
            //  Check ball has reached end
            println('hit');
            int ballsRemoved = map.RemovePickUp(ball);
            println(ballsRemoved);
            if (map.BallEndPos().size() == 0) {
                setState("winner");
                showAddDialog(getTimeLeft());
                this.End();
            }
        }
        
        
        ball.Draw();

        if (timer.getSeconds() <= 0) {
            setState("timesup");
            this.End();
        }
        else text(timer.getSeconds() + "s", 10, 10);
        
    }

    void MouseMoved() {
        ball.MouseMoved();

        println(mouseX + ', ' + mouseY);
    }

    void MouseClicked() {
        ball.waitForMouse = !ball.waitForMouse;
    }

    void Start() {
        //  Initialize Game
        map.SetMap(mapName);
        ball.move(map.BallStartPos());
        ball.waitForMouse = true;
        deaths = 0;
        timer.reset();
        timer.start();
        setState("playing");
    }
    void setState(String s) {
        state = s;
    }
    void getState() {
        return state;
    }
    void End() {
        //  Set result in txt
        timer.getSeconds();
        timer.stop();
        println('here');
        //  Jump to Result page
        this.parent.setView("result");
    }
    var getParent() {
        return this.parent;
    }
    int getAvailableLifes() {
        return lifes;
    }
    int getDeaths() {
        return deaths;
    }
    int getTimeLeft() {
        return timer.getSeconds();
    }
    int getEndPointLeft() {
        return map.endPointLeft();
    }
}