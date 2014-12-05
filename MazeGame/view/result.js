class Result
{
    var parent;
    Result(parent) {
        this.parent = parent;
    }

    void Draw() {
        
        background(224);
    }

    void MouseMoved() {

        //println(mouseX + ', ' + mouseY);
    }

    void MouseClicked() {
        this.parent.startGame();
    }
}