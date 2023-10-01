import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function CheckoutForm() {

    const location = useLocation()

    useEffect(() => {


        // const query = new URLSearchParams(window.location.search);
        const values = location.search
        console.log(values)
        

        // if (query.get("success")) {
        //     console.log("Order placed! You will receive an email confirmation.");
        // }

        // if (query.get("canceled")) {
        //     console.log("Order canceled -- continue to shop around and checkout when you're ready.");
        // }
    }, []);

    return (
        <div>
            <section>
                <div className="product">
                    <img
                        src="https://i.imgur.com/EHyR2nP.png"
                        alt="The cover of Stubborn Attachments"
                    />
                    <div className="description">
                        <h3>Stubborn Attachments</h3>
                        <h5>$20.00</h5>
                    </div>
                </div>
                <form action={`${api}/payments/test-payment/`} method="POST">
                    <button className='btn btn-outline btn-sm' type="submit">
                        Checkout
                    </button>
                </form>
            </section>
        </div>
    )
}

export default CheckoutForm
