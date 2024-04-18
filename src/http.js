import axios from "axios";

export async function fetchMeals() {
    try {
        const response = await axios.get("http://localhost:3000/meals");
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw new Error("Failed to fetch meals data");
    }
}