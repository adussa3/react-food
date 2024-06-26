import axios from "axios";

export async function fetchMeals() {
    try {
        const response = await axios.get("/meals");
        return response.data;
    } catch (error) {
        const message = `Failed to fetch meals data! \n\n ${error.message}`;
        throw new Error(message);
    }
}

export async function updateOrders(orderData) {
    try {
        const response = await axios.post("/orders", orderData);
        return response;
    } catch (error) {
        const message = `Failed to update order data \n\n ${error.response.data.message} \n\n ${error.message}`;
        throw new Error(message);
    }
}