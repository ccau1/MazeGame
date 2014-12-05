class Lobby
{
    var parent;
    RectButton btnReady;

    Lobby(parent) {
        this.parent = parent;
        //Style style = 
        btnReady = new RectButton("Ready", [10, 10, 300, 100, 5]);
    }

    void Draw() {
        rect(10, 10, 300, 100, 5);
    }
    
    void MouseMoved() {
        //nX = mouseX;
        //nY = mouseY;  
    }

    void MouseClicked() {
        this.parent.startGame();
    }
}


class RectButton
{
    String txt;
    Style style;

    RectButton(String txt, Style style) {
        this.txt = txt;
        this.style = style;
    }
    
    void checkMouseMove(Point coords) {
        if (true) {
            
        }
    }
    void checkMouseClicked(Point coords) {
        
    }
}