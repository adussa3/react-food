import axios from "axios";

export async function fetchMeals() {
    try {
        const response = await axios.get("http://localhost:3000/meals");
        return response.data;
    } catch (error) {
        error.message = error.message ?? "Failed to fetch meals data";
        throw new Error(error);
    }
}