

class Ball
{
    Point pos;
    Point mousePos;
    float radius;
    Style style;
    int delay = 8;
    PImage ballImg;
    bool waitForMouse;

    Ball(style, Point pos) {
        mousePos = new Point();
        pos = new Point();

        if (pos) 
            this.pos = pos;
        else 
            this.pos = new Point();
        if (style) 
            this.style = style;
        else
            this.style = new Style();

        ballImg = loadImage('assets/images/mouse2.png');

        waitForMouse = true;
    }

    void Draw() {
        // Set Style
        strokeWeight( style.strokeWeight );
        fill( style.fill[0], style.fill[1], style.fill[2] );
        stroke(style.stroke); 

        if (!waitForMouse) {
            //int[] collidedSides = GetCollisionSides();
            //if (pos.Y < mousePos.Y  && collidedSides[0] == 0) 
                pos.Y+=(mousePos.Y - pos.Y)/delay;
            //else if (pos.Y > mousePos.Y && collidedSides[2] == 0)
            //    pos.Y+=(mousePos.Y - pos.Y)/delay;

            //if (pos.X < mousePos.X && collidedSides[1] == 0)
            //    pos.X+=(mousePos.X - pos.X)/delay;
            //else if (pos.X > mouse.X && collidedSides[3] == 0)
                pos.X+=(mousePos.X - pos.X)/delay;
        }

        translate(pos.X, pos.Y);
        float angle = atan((mousePos.Y - pos.Y)/(mousePos.X - pos.X));
        if ( angle < 0 ) angle = PI + angle + 90;

        //println(angle);
        rotate(angle - 90);
        //  Draw img
        image(ballImg, -1 * style.width / 2, -1 * style.height / 2, style.width, style.height);
        //ellipse( pos.X, pos.Y, style.radius, style.radius );
        rotate(0);
        translate(0, 0);
    }

    void MouseMoved() {
        mousePos.X = mouseX;
        mousePos.Y = mouseY;

        // check if mouse over ball
        if (mouseX > (pos.X - style.width / 2)-style.width && mouseX < (pos.X - style.width / 2)+style.width && mouseY > (pos.Y - style.height / 2)-style.height && mouseY < (pos.Y - style.height / 2)+style.height) {
            waitForMouse = false;
        }
    }

    void move(Point p) {
        pos.X = p.X;
        pos.Y = p.Y;
        mouseX = p.X;
        mouseY = p.Y;
    }
    void move(float x, float y) {
        pos.X = x;
        pos.Y = y;
    }
    void setStyle(Style style) {
        this.style = style;
    }
    void getStyle() {
        return this.style;
    }
    Point GetPoint() {
        return pos;
    }
    bool HasCollided(String wallColor) {
        PImage c = get(pos.X - style.width / 2, pos.Y - style.height / 2, style.width, style.height);
        int[] pix = c.pixels;
    
    
        for (var i = 0; i < pix.length; i++) {
            if (hex(pix[i], 6) == wallColor){
                return true;
            }
        }
        return false;
    }

    int[] GetCollisionSides(String wallColor) {
        PImage c = get(pos.X - style.width / 2, pos.Y - style.height / 2, style.width, style.height);
        int[] pix = c.pixels;
    
        int[] collidedSides = {0, 0, 0, 0};

        for (var i = 0; i < pix.length; i++) {
            if (i < style.width) {                              // top
                if (hex(pix[i], 6) == wallColor) {
                    collidedSides[0];
                }
            } else if (i % style.width == 0) {                  // left
                if (hex(pix[i], 6) == wallColor) {
                    collidedSides[3];
                }
            } else if (i % style.width == style.width - 1) {    // right
                if (hex(pix[i], 6) == wallColor) {
                    collidedSides[1];
                }
            } else if (i >= pix.length - style.width) {         // bottom
                if (hex(pix[i], 6) == wallColor) {
                    collidedSides[2];
                }
            }
        }
        return collidedSides;
    }
}