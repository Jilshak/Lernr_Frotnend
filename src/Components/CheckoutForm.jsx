import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse, individualCourse } from "../features/CourseSlice";
import jwtDecode from "jwt-decode";

const CheckoutForm = () => {
  const { pi, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const sessionId = String(pi);

  // Add state variables to manage loading and payment status
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    dispatch(individualCourse(id));
  }, []);

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    if (!stripe || !card) {
      console.log(
        "Stripe or card is not available at the moment. Please try again later."
      );
      return;
    }

    setIsLoading(true)
    setPaymentStatus(null)

    try {
      const result = await stripe.confirmCardPayment(sessionId, {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
          },
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error);
        setPaymentStatus("error")
      } else if (result.paymentIntent.status === "succeeded") {
        await setPaymentStatus("success")

        let user =  await jwtDecode(localStorage.getItem('authToken'))
        const credentials = {
            user: user.user_id,
            course_id: id
        }
        await dispatch(buyCourse(credentials))
        await navigate("/enrolled");
      }
    } catch (error) {
      console.error("Error:", error);
      setPaymentStatus("error")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {course.mycourses.length >= 1 && !course.isLoading ? (
        <div className="min-h-screen">
          <div className=" justify-center items-center mx-auto relative top-10 max-w-[500px]">
            <div className="relative mx-auto p-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center flex-col justify-center">
                <img
                  className="h-[250px] rounded-md"
                  src={course.mycourses[0].thumbnail}
                  alt=""
                />
                <p className="font-semibold">{course.mycourses[0].title}</p>
              </div>
              <div className="mt-10">
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
                  <div className="grid">
                    <button
                      type="submit"
                      className="btn btn-outline btn-success"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="spinner"></div>
                      ) : (
                        "CONFIRM PAYMENT"
                      )}
                    </button>
                  </div>
                  {paymentStatus === "success" && (
                    <p className="text-green-500 mt-2">
                      Payment successful!
                    </p>
                  )}
                  {paymentStatus === "error" && (
                    <p className="text-red-500 mt-2">Payment failed.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CheckoutForm;
