class Button {

    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.pressed = false;
        this.opacity = 100;
    }

    show(font) {

   

        fill(30, 215, 96);
        noStroke();
        rect(this.x, this.y, 600, 200, 50);
    
        fill(255);
        textFont(font);
        textSize(85);
        text(this.text, this.x + 90, this.y + 140);

        

        if(this.pressed === true) { 
            this.x += 40;
        }
    }

    getText() { 
        return this.text;
    }

    getX() { return this.x; }

    setX(x) { this.x = x; }

    getY() { return this.y; }

    getPressed() { return this.pressed; }

    setPressed(pressed) { 
        this.pressed = pressed;
    }

    setFading(fading) { 
        this.fading = fading
    }

    
}