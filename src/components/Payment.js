import React, { useState, useEffect } from "react";
import "./style/Payment.css";
import { useStateValue } from "./Stateprovider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from 'axios';
import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
          data: {
            amount: getBasketTotal(basket) * 100,
          },
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    getClientSecret();
  }, [basket]);

  console.log("The SECRET IS>>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const options = {
        key: 'rzp_test_gKxd099EQ7UaJz',
        amount: getBasketTotal(basket) * 100,
        currency: "INR",
        order_id: clientSecret,
        handler: async function (response) {
          console.log(response);

          try {
            const userDocRef = doc(db, "users", user?.uid);
            const orderDocRef = doc(collection(userDocRef, "orders"), response.razorpay_payment_id);

            await setDoc(orderDocRef, {
              basket: basket,
              amount: getBasketTotal(basket),
              created: new Date()
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({ type: 'EMPTY_BASKET' });
            navigate('/orders');
          } catch (error) {
            setError("Failed to save order details: " + error.message);
            setProcessing(false);
          }
        },
        prefill: {
          name: user?.displayName || user?.email,
          email: user?.email,
          contact: "9999999999"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Failed to process payment. Please try again later.");
      setProcessing(false);
    }
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
