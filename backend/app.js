/****** Load Environment Variables *****/

/*
    process.env.NODE_ENV is an environment variable that is usually just "development" or "production"

    NOTE:
    Prior to this, we've been running in development this whole time, but when we deploy this code, it will be in production

    If we're running in development mode, then we're requiring the dotenv NPM Package which takes the variables
    defined in .env and add them into process.env in the node app

    NOTE:
    We don't do this in production! There's another way we store environment variables where we don't store them in a file.
    Instead, we would add them into the environment
*/
import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import Meal from './model/meal.js';
import Order from './model/order.js';

/***** Set up *****/

// Create Express application
const app = express();

// Connect to a Mongo Database with Mongoose

// Mongo Database Link
/*
    If you get an error trying to connect to the Mongo Database locally, you probably need to whitelist your current IP address:
    (1) Log into https://account.mongodb.com/account/login
    (2) Scroll down to "Network Access" on the left sidebar
    (3) Add your current IP Address
*/
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));

// Tells the system that you want json to be used
app.use(bodyParser.json());

// Serving Static Files - set absolute path to the public directory
app.use(express.static("public"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/***** Routing *****/

app.get('/meals', async (req, res) => {
    const meals = await Meal.find({});
    res.json(meals);
});

app.post('/orders', async (req, res) => {
    const orderData = req.body.order;

    if (orderData === null || orderData.items === null || orderData.items == []) {
        return res
            .status(400)
            .json({ message: "Your cart is empty!" });
    }

    if (orderData.customer.email === null || !orderData.customer.email.includes('@')) {
        return res.status(400).json({
            message: "Missing the required email data"
        });
    }

    if (orderData.customer["first-name"] === null || orderData.customer["first-name"].trim() === '') {
        return res.status(400).json({
            message: "Missing the required first name data"
        });
    }

    if (orderData.customer["last-name"] === null || orderData.customer["last-name"].trim() === '') {
        return res.status(400).json({
            message: "Missing the required last name data"
        });
    }

    if (orderData.customer.street === null || orderData.customer.street.trim() === '') {
        return res.status(400).json({
            message: "Missing the required street data"
        });
    }

    if (orderData.customer.city === null || orderData.customer.city.trim() === '') {
        return res.status(400).json({
            message: "Missing the required city data"
        });
    }

    if (orderData.customer.state === null || orderData.customer.state.trim() === '') {
        return res.status(400).json({
            message: "Missing the required state data"
        });
    }

    if (orderData.customer['postal-code'] === null || orderData.customer['postal-code'].trim() === '') {
        return res.status(400).json({
            message: "Missing the required postal code data"
        });
    }

    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    res.status(404).json({ message: 'Not found' });
});

/***** Express Connection *****/

// Bind and listen to the connections on the specified host and port
const port = 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
