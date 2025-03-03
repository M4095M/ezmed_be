const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./firebase_config.json');

const bucket= firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = bucket;