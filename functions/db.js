const admin = require('firebase-admin');
const serviceAccount = require("./env/service-account-reactimagegen.json");
const { logger } = require('firebase-functions');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reactimagegen-6edef-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();
const dbRef = db.ref('users');

module.exports.findUser = async (email) => {
    let snapshot = await dbRef.orderByChild('email').equalTo(email).once('value');

    if (snapshot.exists()) {
        // If user exists, return the data
        let userRecord = snapshot.val();
        let userId = Object.keys(userRecord)[0]; // Get the first user's key (UID)
        let user = userRecord[userId];
        logger.info('User data:', user);
        return user;
    } else {
        logger.info('User not found');
        return null;
    }
};

module.exports.createUser = async (email, password) => {
    let uid = crypto.randomUUID();
    await dbRef.child(uid).set({
        id: uid,
        email: email,
        password: password
    });
    logger.info('User created');
};