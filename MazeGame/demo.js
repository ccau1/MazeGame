// Global variables
float radius = 50.0;
int X, Y;
int nX, nY;
int delay = 8;

// Setup the Processing Canvas
void setup(){
    size( 1000, 1000 );
    strokeWeight( 10 );
    frameRate( 15 );
    X = width / 2;
    Y = width / 2;
    nX = X;
    nY = Y;  
}

// Main draw loop
void draw(){
  
    radius = radius + sin( frameCount / 4 );
  
    // Track circle to new destination
    X+=(nX-X)/delay;
    Y+=(nY-Y)/delay;
  
    // Fill canvas grey
    background( 100 );
  
    // Set fill-color to blue
    fill( 0, 121, 184 );
  
    // Set stroke-color white
    stroke(255); 
  
    // Draw circle
    ellipse( X, Y, radius, radius );    
    
    drawMaze("1");
}


// Set circle's next destination
void mouseMoved(){
    nX = mouseX;
    nY = mouseY;  
}

void drawMaze(map, collisionDetection){
    String lines[] = loadStrings('map/' + map + '.txt');
    for (int i = 0; i < lines.length; i++) {
        var parts = lines[i].replace(' ', '').split(':');
        var type = parts[0];
        var coords = parts[1].split(',');
        line(coords[0], coords[1], coords[2], coords[3]);
        collisionDetection(type, coords);
    }
}

void collisionDetection(type, coords) {

}

class Map
{
    String mapLines[];

    Map(map) {
        setMap(map);
    }
    void setMap(map) {
        mapLines = loadStrings('map/' + map + '.txt');
    }
    void Draw() {
        for (int i = 0; i < lines.length; i++) {
            var parts = lines[i].replace(' ', '').split(':');
            var type = parts[0];
            var coords = parts[1].split(',');
            line(coords[0], coords[1], coords[2], coords[3]);
            collisionDetection(type, coords);
        }
    }
    bool collisionCheck(Ball ball) {
        
    }
    bool isCompleted(Ball ball) {

    }
}

class Ball
{
    float coords[];

    Ball(size) {

    }

    void Draw() {

    }
    void move(x, y) {

    }
}