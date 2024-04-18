import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../http";
import MealItem from "./MealItem";

export default function Meals() {
    const { fetchedData: meals, isFetching, error } = useFetch([], fetchMeals);
    console.log(meals);
    return (
        <>
            {isFetching && <p>Fetching meals...</p>}
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
