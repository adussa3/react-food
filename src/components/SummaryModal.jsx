import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/meal-cart-context";
import { updateOrders } from "../http";
import { currencyFormatter } from "../util/formatting";

const SummaryModal = forwardRef(function SummaryModal({}, ref) {
    const { cart, totalPrice, clearCart } = useContext(CartContext);

    const dialog = useRef();

    const [submittedOrder, setSubmittedOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

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
        setSubmittedOrder(false);
        setErrorMessage(false);
        dialog.current.close();
    };

    const handleSubmit = (event) => {
        // preventDefault prevents the browser from refreshing when you submit the form
        event.preventDefault();

        async function handleSubmit() {
            setSubmittedOrder(false);

            /*
                There is a native built-in feature for getting hold of the input values in a form
                the browser actually helps you with handling that form submission and getting hold
                of all the entered values
                
                The browser allows you to create a special kind of object based on a special kind
                of constructor function that's built into the browser: FormData()
                
                FormData is an object that makes it easy to get hold of different values entered into a form
                you need to pass the form as an input into FormData: FormData(event.target)
                
                As a result, you get a FormData object that will give you access to the data that was added to
                all the inputs in that form
                
                We create an instance of FormData, and can call formData.get() on the instance to extract/access
                the value for a specific name
                
                NOTE: the FormData() constructor function is built into the browser, it's NOT provided by React
                NOTE: all the inputs, that you want to get the value of, MUST have a "name" prop!
            */
            const formData = new FormData(event.target);

            /*
                A common pattern or trick to quickly get hold of all the entered input values and group
                them together in an object is to use the built-in Object class (which is also provided by the browser)
                and call the fromEntries static method on the class and pass the formData entried into it!
                
                formData.entries() gives an arry of all the input fields and their values, and Object.fromEntries(formData.entries())
                returns an object with key-value pairs for all the input fields
            */
            const customer = Object.fromEntries(formData.entries());

            // Create orderData object for the updateOrder() HTTP request
            const orderData = { order: { customer, items: cart, total: totalPrice } };

            try {
                // Update the order data on the backend
                const response = await updateOrders(orderData);

                /*
                    you can programmatically reset the form
                    event.target is the underlying form element which has a reset() method that clears the inputs in the form
                    NOTE: this is also some imperative coding, but it's less code to write than manually resetting all the useRef values
                */
                event.target.reset();

                // Clear all the items from the cart
                clearCart();

                setSubmittedOrder(true);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        // Execute handleSubmit
        handleSubmit();
    };

    if (submittedOrder || errorMessage) {
        return createPortal(
            <dialog className="modal" ref={dialog} onClose={handleClose}>
                <h2>{submittedOrder ? "Success" : "Error"}</h2>
                <p style={{ whiteSpace: "pre-wrap" }}>
                    {submittedOrder
                        ? "Your order was submitted successfully. \n\n We will get back to you with more details via email within the next few minutes."
                        : errorMessage}
                </p>
                <div className="modal-actions">
                    <button type="submit" className="button" onClick={handleClose}>
                        Okay
                    </button>
                </div>
            </dialog>,
            document.getElementById("modal")
        );
    }

    return createPortal(
        <dialog className="modal" ref={dialog} onClose={handleClose}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

            <form onSubmit={handleSubmit}>
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" name="first-name" id="first-name" required />
                    </div>

                    <div className="control">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" name="last-name" id="last-name" required />
                    </div>
                </div>

                <div className="control">
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" name="email" id="email" required />
                </div>

                <div className="control">
                    <label htmlFor="phone">Phone Number (optional)</label>
                    <input type="tel" name="phone" id="phone" />
                </div>

                <div className="control">
                    <label htmlFor="street">Street</label>
                    <input type="text" name="street" id="street" required />
                </div>

                <div className="control-row">
                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" required />
                    </div>

                    <div className="control">
                        <label htmlFor="state">State</label>
                        <select name="state" id="state" defaultValue="" required>
                            <option value="" disabled>
                                Select a State
                            </option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>

                    <div className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" pattern="[0-9]{5}" name="postal-code" id="postal-code" required />
                    </div>
                </div>
                <div className="modal-actions">
                    <button type="button" className="text-button" onClick={handleClose}>
                        Close
                    </button>
                    <button type="submit" className="button">
                        Submit Order
                    </button>
                </div>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default SummaryModal;
