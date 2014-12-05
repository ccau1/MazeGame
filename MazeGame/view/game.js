

class Game
{
    var parent;
    String mapName = "1";
    Ball ball;
    Map map;
    int backgroundColor = 224;
    PImage bg;
    Timer timer;


    Game(parent) {
        this.parent = parent;

        //// Initialize Objs
        Style style = new Style();
        style.strokeWeight = 10;
        style.fill = [0, 121, 184];
        style.stroke = 255;
        style.radius = 30;
        style.width = 30 * 0.75;
        style.height = 30;
        ball = new Ball(style, [50, 50]);

        map = new Map(this, mapName);

        bg = loadImage('assets/images/maze.png');

        timer = new Timer(30);
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
        } else if (ball.HasCollided(map.GetEndColor())) {
            //  Check ball has reached end
            println('hit');
            map.RemovePickUp(ball);
        }
        if (map.BallEndPos().size() == 0) this.End();
        
        ball.Draw();

        if (timer.getSeconds() <= 0) this.End();
        else text(timer.getSeconds() + "s", 10, 10);
        
    }

    void MouseMoved() {
        ball.MouseMoved();

        //println(mouseX + ', ' + mouseY);
    }

    void MouseClicked() {
        ball.waitForMouse = !ball.waitForMouse;
    }

    void Start() {
        //  Initialize Game
        map.SetMap(mapName);
        ball.move(map.BallStartPos());
        timer.reset();
        timer.start();
    }

    void End() {
        //  Set result in txt

        println('here');
        //  Jump to Result page
        this.parent.setView("result");
    }
    var getParent() {
        return this.parent;
    }
}