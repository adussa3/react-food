import { useContext, useRef } from "react";
import Logo from "../assets/logo.jpg";
import { CartContext } from "../store/meal-cart-context";
import CartModal from "./CartModal";

export default function Header() {
    const { totalQuantity } = useContext(CartContext);

    const modal = useRef();

    const handleOpenCartClick = () => {
        modal.current.open();
    };

    return (
        <>
            <CartModal ref={modal} />
            <header id="main-header">
                <div id="title">
                    <img src={Logo} alt="" />
                    <h1>ReactFood</h1>
                </div>
                <button className="text-button" onClick={handleOpenCartClick}>
                    Cart ({totalQuantity})
                </button>
            </header>
        </>
    );
}
