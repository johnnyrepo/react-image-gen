const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { logger } = require('firebase-functions');

const secretKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : 'supersecret-local';

module.exports.createUser = async (email, password) => {
    logger.info('Creating a user with email:', email, 'and password:', password);
    const user = await db.findUser(email);
    
    if (user) {
        throw new Error('User creation failed, user already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const result = db.createUser(email, hashedPassword);
    const token = jwt.sign({ id: result.lastInsertRowid }, secretKey, {
        expiresIn: '1h'
    });

    return token;
}

module.exports.login = async (email, password) => {
    logger.info('Logging in with email:', email, 'and password:', password);
    const user = await db.findUser(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        const error = new Error('Login failed, invalid credentials');
        error.status = 400;
        throw error;
    }
    const token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: '1h'
    });

    return token;
}

module.exports.enforceAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer XYZ
    try {
        jwt.verify(token, secretKey);
        next();
    } catch (error) {
        return res.status(403).send({ error: 'Invalid token' });
    }
}
