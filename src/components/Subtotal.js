import React from 'react'
import "./style/Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './Stateprovider';
import {getBasketTotal} from './reducer.js'
import { useNavigate} from 'react-router-dom';


function Subtotal() {
  const history =useNavigate();
      const [{basket}]=useStateValue();
    return (
        <div className="subtotal">
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  {/* Part of the homework */}
                  Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                  <input type="checkbox" /> This order contains a gift
                </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} // Part of the homework
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
    
          <button onClick={e=>history('/payment')}>Proceed to Checkout</button>
        </div>
      );
    }

export default Subtotal
