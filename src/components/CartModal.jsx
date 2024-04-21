import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/meal-cart-context";
import CartItem from "./CartItem";
import SummaryModal from "./SummaryModal";

const CartModal = forwardRef(function CartModal({}, ref) {
    const { cart, totalPrice } = useContext(CartContext);

    const dialog = useRef();
    const modal = useRef();

    useImperativeHandle(ref, () => {
        return {
            // This is another way to define a function in an object
            // This is the same as: open: () => dialog.current.showModal()
            open() {
                dialog.current.showModal();
            },
        };
    });

    const handleClose = () => {
        dialog.current.close();
    };

    const handleCheckout = () => {
        dialog.current.close();
        modal.current.open();
    };

    return createPortal(
        <>
            <SummaryModal ref={modal} />
            <dialog className="modal cart" ref={dialog}>
                <h2>Your Cart</h2>
                <ul>
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </ul>
                <p className="cart-total">${totalPrice}</p>
                <div className="modal-actions">
                    <button className="text-button" onClick={handleClose}>
                        Close
                    </button>
                    <button className="button" onClick={handleCheckout} disabled={totalPrice == 0}>
                        Go to Checkout
                    </button>
                </div>
            </dialog>
        </>,
        document.getElementById("modal")
    );
});

export default CartModal;
