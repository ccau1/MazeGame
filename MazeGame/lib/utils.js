class Point
{
    float X = 0;
    float Y = 0;
    
    Point(float[] coordArray) {
        this.X = coordArray[0];
        this.Y = coordArray[1];
    }
    Point(float x, float y) {
        this.X = x;
        this.Y = y;
    }
}

class Style
{
    int strokeWeight;
    int[] fill;
    int stroke;
    int radius;
    int width;
    int height;
    int[] fill_hovered;
    int[] fill_clicked;

}