import { createContext, useReducer } from "react";
import { fetchMeals } from "../http";
import { useFetch } from "../hooks/useFetch";

export const CartContext = createContext({
    meals: [],
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
    clearCart: () => {},
    getMealQuantity: () => {},
    incrementMealQuantity: () => {},
    decrementMealQuantity: () => {},
    isFetching: false,
    error: {},
});

const cartMealItemsReducer = (state, action) => {
    const { type, payload } = action;

    const handleUpdateMealQuantity = (id, addToQuantity) => {
        const foundItem = state.find((item) => item.id === id);

        if (foundItem) {
            const newQuantity = foundItem.quantity + addToQuantity;

            // meal item is in the cart and the new quantity is 0
            if (newQuantity === 0) {
                return state.filter((item) => item.id !== id);
            }

            // meal item is in the cart and the new quantity is NOT 0
            else {
                return state.map((item) => {
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
            const meal = payload.meals.find((meal) => meal.id === id);
            meal.quantity = 1;
            return [...state, meal];
        }

        return state;
    };

    if (type === "INCREMENT_MEAL_QUANTITY") {
        return handleUpdateMealQuantity(payload.id, 1);
    }

    if (type === "DECREMENT_MEAL_QUANTITY") {
        return handleUpdateMealQuantity(payload.id, -1);
    }

    if (type === "CLEAR_CART") {
        return [];
    }
};

export default function CartContextProvider({ children }) {
    const { fetchedData: meals, isFetching, error } = useFetch([], fetchMeals);

    const [cartMealItemsState, cartMealItemsDispatch] = useReducer(cartMealItemsReducer, []);

    const totalMealQuantity = cartMealItemsState.reduce((currentQuantity, item) => {
        return currentQuantity + item.quantity;
    }, 0);

    const totalMealPrice = cartMealItemsState.reduce((currentPrice, item) => {
        // NOTE: +currentPrice casts the variable to a Number
        //       it's the same as Number(currentPrice)
        let newPrice = +currentPrice + item.quantity * item.price;

        // NOTE: toFixed() returns a String!
        return newPrice.toFixed(2);
    }, "0.00");

    const handleClearCart = () => {
        cartMealItemsDispatch({
            type: "CLEAR_CART",
        });
    };

    const handleGetMealQuantity = (id) => {
        const item = cartMealItemsState.find((item) => item.id === id);
        return item ? item.quantity : 0;
    };

    const handleIncrementMealQuantity = (id) => {
        cartMealItemsDispatch({
            type: "INCREMENT_MEAL_QUANTITY",
            payload: {
                id,
                meals,
            },
        });
    };

    const handleDecrementMealQuantity = (id) => {
        cartMealItemsDispatch({
            type: "DECREMENT_MEAL_QUANTITY",
            payload: {
                id,
                meals,
            },
        });
    };

    const contextValue = {
        meals,
        cart: cartMealItemsState,
        totalQuantity: totalMealQuantity,
        totalPrice: totalMealPrice,
        clearCart: handleClearCart,
        getMealQuantity: handleGetMealQuantity,
        incrementMealQuantity: handleIncrementMealQuantity,
        decrementMealQuantity: handleDecrementMealQuantity,
        isFetching,
        error,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
