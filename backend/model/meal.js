// Import Mongoose NPM Package
import mongoose from "mongoose";

// Set Schema to mongoose.Schema
// This is just a shortcut. We can use Schema, instead of fully typing out mongoose.Schema
const Schema = mongoose.Schema

// Define the Meal Schema
export const mealSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "price must be 0 or greater"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: [0, "quantity cannot be below 0"],
        required: false
    }
});

// Create the Meal Model
const Meal = mongoose.model("Meal", mealSchema);

// Export the Meal Model
export default Meal