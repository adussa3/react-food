import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CartModal = forwardRef(function CartModal({}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            //open: () => dialog.current.showModal(),
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
                <li className="cart-item">
                    <p>1</p>
                    <div className="cart-item-actions">
                        <button>-</button>
                        <p>#</p>
                        <button>+</button>
                    </div>
                </li>
            </ul>
            <p className="cart-total"></p>
            <div className="modal-actions">
                <button className="text-button" onClick={handleCloseCartClick}>
                    Close
                </button>
                <button className="button">Go to Checkout</button>
            </div>
        </dialog>,
        document.getElementById("modal")
    );
});

export default CartModal;
