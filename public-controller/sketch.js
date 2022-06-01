
//Create the socket

let participantEndpoint = 'http://localHost:5050/participant';

let socket = io();

let timer = 1;

let start = false;

let qrReader;

let joiningImg;

let myWords = ["", "", ""]

let montserrateFont;

let templateImg;

let emailInput;

let myEmail = "";

let screens = 0;

let finalImg;

let onScreen = false;

let endingImg;

function preload() { 
    templateImg = loadImage('assets/spotifyTemplate.png');
    qrReader = loadImage('assets/qrreader.png');
    joiningImg = loadImage('assets/joining.png');
    finalImg = loadImage('assets/finalImg.png');
    endingImg = loadImage('assets/ending.png')
}

function setup() {

    frameRate(16);
    createCanvas(1125, 2436);

    montserrateFont = loadFont('assets/Montserrat-Bold.otf');

  emailInput = createInput('');
  emailInput.position(170, 1400);
  emailInput.size(800, 90);
  emailInput.input(myInputEmail);
   

}



function draw() {

    background(0);

    if (timer > 26) { 
        screens = 3;
    }

    switch (screens) { 
        case 0:
            image(qrReader, 0, 0);
            emailInput.style('display', 'none');
            break;
        
        case 1:
            image(joiningImg, 0, 0); 
            emailInput.style('display', 'none');
            break;
        
        case 2:
            image(finalImg, 0, 0); 
            emailInput.style('display', 'block');
            break;
        case 3:
            image(endingImg, 0, 0); 
            emailInput.style('display', 'none');

            fill(255);
            textFont(montserrateFont);
            textSize(40);
            text(myEmail, 125, 670);
            break;
    }

    

   
}



function mouseClicked() { 

    //Checks if button was pressed, if so, send the string inside of it to the array of words selected.

    switch (screens) { 
        case 0:
            if (dist(mouseX, mouseY, 700, 1300)<600) { 
                screens = 1;
            }
            break;
        
         case 1:
            if (dist(mouseX, mouseY, 570, 1800)<600) { 
                screens = 2;
            }
            break;
        case 2:
             if (dist(mouseX, mouseY, 570, 2000)<300) { 
                 screens = 3;
                 let myEmailJSON = {
                     mail: myEmail,
                     date: Date.now()
                 }
                 socket.emit('participant', myEmailJSON);
                 //sendParticipant(myEmail);
                 console.log("undiu")
            }
            break;
        
    }
}

function myInputEmail(){
    myEmail = this.value();
}

function sendToArray(object, min, max, pos) { 
    for (let i = 0; i < object.length; i++) { 
        if (timer > min && timer < max) {
            compareDistance(object[i], pos);
         }    
     }
}

function showIntent(object, min, max) { 

    for (let i = 0; i < object.length; i++) { 

        if (timer > min && timer < max) {
            object[i].show(montserrateFont);
        }

    }
}

function compareDistance(object, pos) { 
    if (mouseX > object.getX() && mouseX < (object.getX() + 600) && mouseY > object.getY() && mouseY < (object.getY() + 200)) { 
        object.setPressed(true);

        myWords[pos] = object.getText();
        console.log(myWords);

    }
}

function counter() { 

    if (frameCount % 15 === 0 ) { 
      timer++;
      console.log(timer)
    }
}
  
async function sendParticipant(participant) {
    let bodyJSON = JSON.stringify(participant);
    const postRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: bodyJSON
    }
    const request = await fetch(participantEndpoint, postRequest);
}
  