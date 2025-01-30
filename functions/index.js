/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 * 
 * See Node.JS -> Firebase deploy instructions here:
 * https://medium.com/boca-code/the-basic-process-is-that-we-will-use-firebase-cloud-functions-to-create-a-single-function-app-13ba3b852077
 * https://sandunisuru.medium.com/how-to-deploy-nodejs-express-app-to-firebase-as-function-31515c304e70
 * https://medium.com/@marwanjaber/deploying-your-node-js-rest-api-to-firebase-functions-a-step-by-step-guide-f9a8d8c6d0a1
 */

const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const logger = require("firebase-functions/logger");
const auth = require("./auth");
const { generateImage } = require("./image");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.includes('@') || !password || password.trim().length < 7) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const token = await auth.createUser(email, password);
        res.status(201).send({ message: 'User created successfully', token });
    } catch (error) {
        logger.error(error.message);
        res.status(400).send({ error: 'Creating user failed, invalid credentials' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await auth.login(email, password);
        res.send({ message: 'Login successful', token });
    } catch (error) {
        logger.error(error.message);
        if (error.status === 400) {
            return res.status(400).send({ error: error.message });
        }
        res.status(500).send({ error: 'Login failed, please check your credentials' });
    }
});

// enforceAuth middleware is called before main method and checks if the request is authenticated
app.post('/generate-image', auth.enforceAuth, async (req, res) => {
    const { prompt, options } = req.body; //options => aspect_ratio, format, quality

    if (!prompt || prompt.trim().length === 0) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    const { image, format } = await generateImage(prompt, options);
    res.type(format);
    res.status(201).send(image);
});

app.get('/ping', (req, res) => {
    res.send('I\'m not sleeping!');
});

exports.app = onRequest(app);
