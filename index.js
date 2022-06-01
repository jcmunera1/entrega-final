
const express = require('express');
const cors = require('cors');
const db = require('./firebaseConfig');
const { Server } = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');
const app = express();
const httpServer = app.listen(5050);
const ioServer = new Server(httpServer);
let characterMessage;

const staticController = express.static('public-controller');
const staticDisplay = express.static('public-display');



app.use('/controller', staticController);
app.use('/display', staticDisplay);
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.post('/participant', (request, response) => {
    console.log(request.body)
    addParticipant(request.body);
    response.end();
    //console.log(players);
});

app.get('/test', (req, res) => {
    console.log(req.body);
    res.send({
        m: 'Okay'
    });
});

ioServer.on('connection', (socket) => {
    socket.broadcast.emit('positions', characterMessage);
    
    socket.on('finished', (action) => {
        socket.broadcast.emit('timing', action);
    });

    socket.on('participant', (participant) => { 
        console.log(participant);
        addParticipant(participant);
    })
});

//------------------------------------------------this opens a port

const protocolConfiguration = {
    path: 'COM8',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

parser.on('data', (data) => {  

    
    ioServer.emit('positions', data);

});

const addParticipant = async function (participant) {
    const res = await db.collection('participants').add(participant);
    console.log('Added document with ID: ', res.id);
}



//=============================================
//============================================= Week 9 demo:
//=============================================

/*
// Import de SerialPort package
const {
    SerialPort,
    ReadlineParser
} = require('serialport');

// Set the rules for the serial communication
const protocolConfiguration = {
    path: '/dev/cu.usbmodem142101',
    baudRate: 9600
}

// Opens a port
const port = new SerialPort({
    path: '/dev/cu.usbmodem142101',
    baudRate: 9600
});

/*
//--------------------------------------- 1- Read without parsing

// Read data from Serial Buffer

/*
port.on('data', (data) => {
    console.log(data);
})
*/

//--------------------------------------- 2- 4- Reading after parsing
/*
const parser = port.pipe(new ReadlineParser);

parser.on('data', (data) => {
    console.log(data);
})
*/

//--------------------------------------- 3- From String to Integer
/*
const parser = port.pipe(new ReadlineParser);

parser.on('data', (data) => {

    let integerData = parseInt(data);
    console.log(integerData);
});
*/

//--------------------------------------- 5- Creating an Array
/*
const parser = port.pipe(new ReadlineParser);

parser.on('data', (data) => {

    // Divide the String "A B C" by " " to create an Array
    let dataArray = data.split(' ');

    // Remove the last item: \r
    dataArray.splice(-1);
    console.log(dataArray);

    // Parse all the Springs in Integers
    let dataArrayInt = dataArray.map(i =>
        parseInt(i)
    );
    console.log(dataArrayInt);

});
*/
