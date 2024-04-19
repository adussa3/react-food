import { useContext } from "react";
import Logo from "../assets/logo.jpg";
import { CartContext } from "../store/meal-cart-context";

export default function Header() {
    const { quantity } = useContext(CartContext);

    return (
        <header id="main-header">
            <div id="title">
                <img src={Logo} alt="" />
                <h1>ReactFood</h1>
            </div>
            <button className="text-button">Cart ({quantity})</button>
        </header>
    );
}
