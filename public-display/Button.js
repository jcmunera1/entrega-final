class Button { 
    constructor(text, x, y) { 
        this.x = x;
        this.y = y
        this.text = text;
        this.selected = false;
    }

    draw() { 
        fill(211, 111, 21);
        noStroke();
        rect(this.x, this.y, 300, 100, 40);
        textSize(35);
        fill(255);
        text(this.text, this.x + 70, this.y + 60);
        if (this.selected === true) { 
            fill(211, 111, 21, 40);
            rect(this.x-50, this.y-50, 400, 200, 40);  
        }
        
    }

    setSelected() { 
        this.selected = true;
    }
}