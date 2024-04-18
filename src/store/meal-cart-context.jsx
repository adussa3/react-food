import { createContext, useState } from "react";
import { fetchMeals } from "../http";
import { useFetch } from "../hooks/useFetch";
import MealItem from "../components/MealItem";

export const CartContext = createContext({
    meals: [],
    cart: [],
    getMealQuantity: 0,
    incrementMealQuantity: () => {},
    decrementMealQuantity: () => {},
    isFetching: false,
    error: {},
});

export default function CartContextProvider({ children }) {
    const [cartMealItems, setCartMealItems] = useState([]);
    const { fetchedData: meals, isFetching, error } = useFetch([], fetchMeals);

    const totalMealQuantity = cartMealItems.reduce((currentQuantity, item) => {
        return currentQuantity + item.quantity;
    }, 0);

    const handleGetMealQuantity = (id) => {
        const item = cartMealItems.find((item) => item.id === id);
        return item ? item.quantity : 0;
    };

    const handleUpdateMealQuantity = (id, addToQuantity) => {
        setCartMealItems((prevItems) => {
            const foundItem = prevItems.find((item) => item.id === id);

            if (foundItem) {
                const newQuantity = foundItem.quantity + addToQuantity;

                // meal item is in the cart and the new quantity is 0
                if (newQuantity === 0) {
                    return prevItems.filter((item) => item.id !== id);
                }

                // meal item is in the cart and the new quantity is NOT 0
                else {
                    return prevItems.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity: newQuantity };
                        } else {
                            return item;
                        }
                    });
                }
            }

            // meal item is NOT in the cart and addToQuantity is 1
            else if (addToQuantity === 1) {
                const meal = meals.find((meal) => meal.id === id);
                meal.quantity = 1;
                return [...prevItems, meal];
            }
        });
    };

    const handleIncrementMealQuantity = (id) => {
        handleUpdateMealQuantity(id, 1);
    };

    const handleDecrementMealQuantity = (id) => {
        handleUpdateMealQuantity(id, -1);
    };

    const contextValue = {
        meals,
        cart: cartMealItems,
        quantity: totalMealQuantity,
        getMealQuantity: handleGetMealQuantity,
        incrementMealQuantity: handleIncrementMealQuantity,
        decrementMealQuantity: handleDecrementMealQuantity,
        isFetching,
        error,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
