import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    // Handle real-time validation errors from the CardElement.
    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    };

    // Handle form submission.
    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
        // Add your payment processing logic here.

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });

        console.log("This is the payment method: ", paymentMethod)
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-md relative top-32 mx-auto p-4 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-600">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="jenny.rosen@example.com"
                            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-400"
                            required
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="card-element" className="text-gray-600">
                            Credit or debit card
                        </label>
                        <CardElement
                            id="card-element"
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
                        />
                        {error && (
                            <p className="text-red-500 mt-2 text-sm">{error}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
