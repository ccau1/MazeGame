

class Timer{
    boolean increment, inProgress;
    int spawn, end;
    int seconds, tm_limit;

    Timer(int tm_limit){
        this.tm_limit = tm_limit;
        seconds = tm_limit;
        increment = false;
        inProgress = false;
    }

    Timer(){
        seconds = 0;
        increment = true;
        inProgress = false;
    }

    void start(){
        inProgress = true;
        spawn = millis();
    }

    void stop(){
        inProgress = false;
        end = millis();
    }

    int getSeconds() {
        if(inProgress) {
            if(increment) {
                seconds = int((millis() - spawn) / 1000);
            }
            else{
                if(seconds - int((millis() - spawn) / 1000) != seconds){
                    seconds = seconds - int((millis() - spawn) / 1000);
                    if(seconds <= 0) { stop(); }
                    else spawn = millis();
                }
            }
        }
        return seconds;
    }

    void reset(){
        if(!increment)
            seconds = tm_limit;
        else
            seconds = 0;

        inProgress = false;
    }
}