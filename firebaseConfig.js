const {initializeApp,cert} = require('firebase-admin/app');

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//----------------------------- Create your Private Key
const serviceAccount = require('./spotifyooh-firebase-adminsdk-n3xwo-a95c8b92b0.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;