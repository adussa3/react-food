import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/meal-cart-context";
import CartItem from "./CartItem";

const CartModal = forwardRef(function CartModal({}, ref) {
    const dialog = useRef();

    const { cart, totalPrice } = useContext(CartContext);

    useImperativeHandle(ref, () => {
        return {
            // This is another way to define a function in an object
            // This is the same as: open: () => dialog.current.showModal()
            open() {
                dialog.current.showModal();
            },
        };
    });

    const handleCloseCartClick = () => {
        dialog.current.close();
    };

    return createPortal(
        <dialog className="modal cart" ref={dialog}>
            <h2>Your Cart</h2>
            <ul>
                {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </ul>
            <p className="cart-total">${totalPrice}</p>
            <div className="modal-actions">
                <button className="text-button" onClick={handleCloseCartClick}>
                    Close
                </button>
                <button className="button" disabled={totalPrice == 0}>
                    Go to Checkout
                </button>
            </div>
        </dialog>,
        document.getElementById("modal")
    );
});

export default CartModal;
