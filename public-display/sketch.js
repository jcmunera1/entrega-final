let socket = io();

let points = 0;

//States
firstRequest = false;
secondRequest = false;
thirdRequest = false;


//Images
let firstScreen;
let secondScreen;
let thirdScreen;
let fourthScreen;
let gameScreen;
let finalScreen;

let screens = 0;
let holder = 0 ;
let myHolder;
let timer = 0;

function preload() { 
  firstScreen = loadImage('assets/one.png');
  secondScreen = loadImage('assets/two.png');
  thirdScreen = loadImage('assets/three.png');
  forthScreen = loadImage('assets/forth.png');
    gameScreen = loadImage('assets/screenGame.png');
    finalScreen = loadImage('assets/finalScreen.png');
}
function setup() {

    montserrateFont = loadFont('assets/Montserrat-Bold.otf');


    let cnv = createCanvas(1280, 720);
    //cnv.style('posssition', 'fixed');
    //cnv.style('left', '0');
    //cnv.style('top', '0');
    //cnv.style('z-index', '-99 ');
    
    

    vid = createVideo(
    ['assets/lyrics.mp4'],
    vidLoad);
    
    vid.size(1280, 720)
}

//Socket receiving positions
socket.on('positions', (positions) => {
    holder = parseInt(positions);

});

let firstButton = new Button("Lambor G", 490, 100);
let secondButton = new Button("Detras", 170, 320);
let thirdButton = new Button("Perro", 820, 320);

function draw() {
    background(26, 105, 51);

    fill(211, 106, 42);
    textFont(montserrateFont);
    textSize(80);
    text(points, 1170, 85);
    noFill();


    console.log(holder);

    switch (screens) { 
        case 0:
            image(firstScreen, 0, 0);
            break;
        case 1:
            image(secondScreen, 0, 0);
            break;
        case 2:
            image(thirdScreen, 0, 0);
            break;
        case 3:
            image(forthScreen, 0, 0);
            //firstButton.draw();
            break;
        case 4:
            image(gameScreen, 0, 0);
            
            counter();

             if (timer > 14 && timer < 18) { 
                 firstButton.draw();
            }

            if (timer > 19 && timer < 22) { 
                    secondButton.draw();
            }

            if (timer > 23 && timer < 27) { 
                    thirdButton.draw();
            }

            if (timer > 30) {
                vid.pause();
                image(finalScreen, 0, 0);
            } else { 
                vid.play();
            }
            break;
        
        
    }

    //Screen 0 advance
    if (screens === 0 && holder === 3) { 
        screens = 1;
        holder = 0;
    }



    //Screen 1 advance
    if (screens === 1 && holder === 3) { 
        screens = 2;
        holder = 0;
    }

    //Screen 1 back
    if (screens === 1 && holder === 4) { 
        screens = 0;
    }

    //Screen 2 advance
    if (screens === 2 && holder === 3) { 
        screens = 3;
        holder = 0;
    }

    //Screen 2 back
    if (screens === 2 && holder === 4) { 
        screens = 1;
        holder = 0;
    }

    //Screen 3 back
    if (screens === 3 && holder === 4) { 
        screens = 2;
        holder = 0;
    }
    
    if (holder === 1 && timer > 14 && timer < 18 ) { 
        firstButton.setSelected();
        firstRequest = true;
    }

    if (holder === 4 && timer > 19 && timer < 22 && screens === 4) { 
        secondButton.setSelected();
        secondRequest = true;
    }

    if (holder === 3 && timer > 23 && timer < 27 && screens === 4) { 
        thirdButton.setSelected();
        thirdRequest = true;
    }
    //console.log(screens)

    if (firstRequest === true && secondRequest === false && thirdRequest === false) { 
        points = 10;
    }  
    
    if (firstRequest === false && secondRequest === true && thirdRequest === false) { 
        points = 10;
    }

     if (firstRequest === false && secondRequest === false && thirdRequest === true) { 
        points = 10;
    }

    if (firstRequest === true && secondRequest === true && thirdRequest === false) { 
        points = 20;
    }   

    if (firstRequest === true && secondRequest === false && thirdRequest === true) { 
        points = 20;
    }   

    if (firstRequest === false && secondRequest === true && thirdRequest === true) { 
        points = 20;
    }   

    if (firstRequest === true && secondRequest === true && thirdRequest === true) { 
        points = 30;
    } 
}

function mousePressed() {
    if (screens === 3) 
screens++; 
}



function vidLoad() {
  vid.volume(1); 
}
  
function counter() { 

    if (frameCount % 60 === 0) { 
      timer++;
      //console.log(timer)
    }
  
  }