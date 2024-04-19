import { useContext } from "react";
import MealItem from "./MealItem";
import { CartContext } from "../store/meal-cart-context";

export default function Meals() {
    const { meals, isFetching, error } = useContext(CartContext);

    if (error) {
        return (
            <div id="error">
                <h2>Error</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <>
            {isFetching && <h1>Fetching meals...</h1>}
            {!isFetching && (
                <ul id="meals">
                    {meals.map((meal) => {
                        return <MealItem key={meal.id} meal={meal} />;
                    })}
                </ul>
            )}
        </>
    );
}
