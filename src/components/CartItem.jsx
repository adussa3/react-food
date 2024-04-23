import { useContext } from "react";
import { CartContext } from "../store/meal-cart-context";
import { currencyFormatter } from "../util/formatting";

export default function CartItem({ item }) {
    const { incrementMealQuantity, decrementMealQuantity } = useContext(CartContext);

    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
            </p>
            <div className="cart-item-actions">
                <button onClick={() => decrementMealQuantity(item._id)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => incrementMealQuantity(item._id)}>+</button>
            </div>
        </li>
    );
}
