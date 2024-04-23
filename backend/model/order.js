// Import Mongoose NPM Package
import mongoose from "mongoose";
import { mealSchema } from "./meal.js";

// Set Schema to mongoose.Schema
// This is just a shortcut. We can use Schema, instead of fully typing out mongoose.Schema
const Schema = mongoose.Schema

// Define the Order Schema
// Question: How to define Objects in a Mongoose Schema?
// Link: https://stackoverflow.com/questions/42019679/object-type-in-mongoose
const orderSchema = new Schema({
    customer: {
        "first-name": {
            type: String,
            required: [true, "First name is required"]
        },
        "last-name": {
            type: String,
            required: [true, "Last name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        phone: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: [true, "Street is required"]
        },
        city: {
            type: String,
            required: [true, "City is required"]
        },
        state: {
            type: String,
            required: [true, "State is required"]
        },
        "postal-code": {
            type: String,
            required: [true, "Postal code is required"]
        }
    },
    items: {
        type: [mealSchema]
    },
    total: {
        type: Number,
        required: [true, "Total cost of the order is required"],
        min: [0, "Total cost of the order must be 0 or greater"]
    }
});

// Create the Order Model
const Order = mongoose.model("Order", orderSchema);

// Export the Meal Model
export default Order