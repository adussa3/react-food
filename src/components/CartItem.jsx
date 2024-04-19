import { useContext } from "react";
import { CartContext } from "../store/meal-cart-context";

export default function CartItem({ item }) {
    const { incrementMealQuantity, decrementMealQuantity } = useContext(CartContext);

    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} x ${item.price}
            </p>
            <div className="cart-item-actions">
                <button onClick={() => decrementMealQuantity(item.id)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => incrementMealQuantity(item.id)}>+</button>
            </div>
        </li>
    );
}
