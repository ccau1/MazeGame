

class Map
{
    var parent;
    ArrayList mapShapes;
    Point ballStartPos;
    ArrayList ballEndPos;
    PImage bg, endImg;
    Style endStyle;

    Map(parent, map) {
        this.parent = parent;
        SetMap(map);
    }
    void SetMap(map) {
        //  Fetch structure
        String[] tmpShapes = loadStrings('map/' + map + '.txt');
        mapShapes = new ArrayList();
        ballEndPos = new ArrayList();

        for (int i = 0; i < tmpShapes.length; i++) {
            if (match(tmpShapes[i], "^//.*$") == null) {
                var row = tmpShapes[i].replace(' ', '');
                var parts = row.split(':');
                if (parts.length > 1) {
                    switch (parts[0]) {
                        case 'start':
                            ballStartPos = new Point(parseFloat(parts[1].split(',')[0]), parseFloat(parts[1].split(',')[1]));
                        break;
                        case 'end':
                            ballEndPos.add(new Point(parseFloat(parts[1].split(',')[0]), parseFloat(parts[1].split(',')[1])));
                        break;
                        case 'endImg':
                            String[] sections = (new String(parts[1])).split('|');
                            endStyle = new Style();
                            endStyle.width = parseInt(sections[1].split(',')[0]);
                            endStyle.height = parseInt(sections[1].split(',')[1]);
                            endImg = loadImage(sections[0]);
                        break;
                        case 'background-url':
                            bg = loadImage(parts[1]);

                        break;
                        default:
                            mapShapes.add(row);
                        break;
                    }
                }
            }
        }
    }

    void Draw() {
        //  Draw bg
        image(bg, 0, 0, parent.getParent().getScreenSize().X, parent.getParent().getScreenSize().Y);

        //  Draw Walls
        for (int i = 0; i < mapShapes.length; i++) {
            var parts = mapShapes[i].replace(' ', '').split(':');
            if (parts.length > 1) {
                var type = parts[0];
                var coords = parts[1].split(',');
                this.DrawShape(type, coords);
            }
        }
        //  Draw starting point
        ellipse( ballStartPos.X, ballStartPos.Y, 30, 30 );

        //  Draw ending point
        for (int i = 0; i < ballEndPos.size(); i++) {
            Point ballEndPoint = (Point) ballEndPos.get(i);
            //  Assuming theres img
            image(endImg, ballEndPoint.X, ballEndPoint.Y, endStyle.width, endStyle.height);
            //rect(ballEndPoint.X, ballEndPoint.Y, 30, 30);
        }
        }
    void DrawShape(type, coords) {
        switch (type) {
            case 'line':
                line(coords[0], coords[1], coords[2], coords[3]);
                break;
        }
        }

    Point BallStartPos() {
        return ballStartPos;
        }
    ArrayList BallEndPos() {
        return ballEndPos;
        }
    bool CollisionCheck(Ball ball) {
        return false;
        }
    bool IsCompleted(Ball ball) {

        }

    void RemovePickUp(Ball ball) {
        Point ballPoint = ball.GetPoint();
        int ballWidth = ball.getStyle().width;
        int ballHeight = ball.getStyle().height;
        Point ballMidPoint = new Point(ballPoint.X + ballWidth / 2, ballPoint.Y + ballHeight / 2);

        for (int i = 0; i < ballEndPos.size(); i++) {
            Point ballEndPoint = (Point) ballEndPos.get(i);
            println('checking...');
            println('X:: ' + ballMidPoint.X + '-->' + ballEndPoint.X + ', ' + ballMidPoint.X + '<--' + (ballEndPoint.X + endStyle.width));
            println('Y:: ' + ballMidPoint.Y + '-->' + ballEndPoint.Y + ', ' + ballMidPoint.Y + '<--' + (ballEndPoint.Y + endStyle.height));
            if (((ballPoint.Y  > ballEndPoint.Y && ballPoint.Y < ballEndPoint.Y + endStyle.height) || (ballPoint.Y + ballHeight > ballEndPoint.Y && ballPoint.Y + ballHeight < ballEndPoint.Y + endStyle.height)) && ballMidPoint.X > ballEndPoint.X && ballMidPoint.X < ballEndPoint.X + endStyle.width) { // top/bottom boundary
                ballEndPos.remove(i);
            }
            if (((ballPoint.X  > ballEndPoint.X && ballPoint.X < ballEndPoint.X + endStyle.width) || (ballPoint.X + ballWidth > ballEndPoint.X && ballPoint.X + ballWidth < ballEndPoint.X + endStyle.width)) && ballMidPoint.Y > ballEndPoint.Y && ballMidPoint.Y < ballEndPoint.Y + endStyle.height) { // left/right boundary
                ballEndPos.remove(i);
            }

            println((ballMidPoint.X > ballEndPoint.X) + ', ' + (ballMidPoint.X < (ballEndPoint.X + endStyle.width)) + ', ' + (ballMidPoint.Y > ballEndPoint.Y) + ', ' + (ballMidPoint.Y < ballEndPoint.Y + endStyle.height));

            // trial #2 (only ball mid point)

            //if (ballMidPoint.X >= ballEndPoint.X && ballMidPoint.X <= ballEndPoint.X + endStyle.width && ballMidPoint.Y >= ballEndPoint.Y && ballMidPoint.Y <= ballEndPoint.Y + endStyle.height) {
            //    println('removing: ' + i);
            //    ballEndPos.remove(i);
            //}

            // trial #1 (check all boundaries)

            //if (((ballEndPoint.X < ballPoint.X + ballWidth && ballEndPoint.X > ballPoint.X) || 
            //     (ballEndPoint.X + endStyle.width > ballPoint.X && ballEndPoint.X + endStyle.width < ballPoint.X)) && 
            //    ((ballEndPoint.Y > ballPoint.Y && ballendPoint.Y < ballPoint.Y + ballHeight) || 
            //     (ballEndPoint.Y + endStyle.height > ballPoint.Y && ballEndPoint.Y + endStyle.height < ballPoint.Y + ballHeight))) {
                
            //    ballEndPos.remove(i);
            //}
        }
    }
    String GetWallColor() {
        return '7F4945';
        }

    String GetEndColor() {
        return 'FEFE33';
    }
}