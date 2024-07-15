import React from "react";
import "./style/checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./Stateprovider";
import CheckoutProduct from "./CheckoutProduct";
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          {user ? (
            <h3>Hello, {user.email}</h3>
          ) : (
            <h3>Please sign in to view your basket</h3>
          )}
          <h2 className="checkout__title">Your shopping basket</h2>
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
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
