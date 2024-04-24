import { useContext } from "react";
import { CartContext } from "../store/meal-cart-context";
import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
    const { incrementMealQuantity, decrementMealQuantity, getMealQuantity } = useContext(CartContext);

    const quantity = getMealQuantity(meal._id);

    return (
        <li className="meal-item">
            <img src={`/${meal.image}`} alt="" />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
            <p className="meal-item-description">{meal.description}</p>

            <div
                style={{
                    justifyContent: quantity === 0 ? "center" : "space-between",
                }}
                className="meal-item-actions"
            >
                {quantity === 0 && (
                    <button className="button" onClick={() => incrementMealQuantity(meal._id)}>
                        Add to Cart
                    </button>
                )}

                {quantity > 0 && (
                    <>
                        <button className="button" onClick={() => decrementMealQuantity(meal._id)}>
                            -
                        </button>
                        <span className="meal-item-quantity">{getMealQuantity(meal._id)}</span>
                        <button className="button" onClick={() => incrementMealQuantity(meal._id)}>
                            +
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}
