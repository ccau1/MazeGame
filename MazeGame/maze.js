//import "view/lobby.js.*"
//import "view/game.js.*"
//import "view/result.js.*"
//import "model/utils.js.*"

int SCREEN_WIDTH = 800;
int SCREEN_HEIGHT = 800;

// Global variables
String view;
//      Views
Game game;
Lobby lobby;
Result result;

// Setup the Processing Canvas
void setup() {
    //  Variable instantiation
    view = new String();

    //  Instantiate views
    lobby = new Lobby(this);
    game = new Game(this);
    result = new Result(this);
    //view = "lobby";
    //  Also initializes game
    resetApp();
    println(view);

    //  Window Settings
    size( SCREEN_WIDTH, SCREEN_HEIGHT );
    frameRate( 15 );
}

// Main draw loop
void draw(){
    //  Check db if view has changed
    //println('curView: ' + view);
    //  Delegate draw to current view
    switch (view) {
        case 'lobby':
            lobby.Draw();
            break;
        case 'game':
            game.Draw();
            break;
        case 'result':
            result.Draw();
            break;
    }
}

void mouseMoved() {
    switch (view) {
        case 'lobby':
            lobby.MouseMoved();
            break;
        case 'game':
            game.MouseMoved();
            break;
        case 'result':
            result.MouseMoved();
            break;
    }
    //nX = mouseX;
    //nY = mouseY;  
}

void mouseClicked() {
    switch (view) {
        case 'lobby':
            lobby.MouseClicked();
            break;
        case 'game':
            game.MouseClicked();
            break;
        case 'result':
            result.MouseClicked();
            break;
    }
}


int getScreenSize() {
    return new Point([SCREEN_WIDTH, SCREEN_HEIGHT]);
}
void setView(String v) {
    view = v;
}

void startGame() {
    setView('game');
    game.Start();
}

void resetApp() {
    setView('lobby');
}