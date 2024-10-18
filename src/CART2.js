import ReactDOM from "react-dom";
import classes from "./Cart.module.css";
import { useState } from "react";
import Cart from "./Cart";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
var cartTotal;
export function CART2({ totalPrice, onClose, cartItems }) {
cartTotal=totalPrice;
  return ReactDOM.createPortal(
    <>


      <div className={classes.backdrop} onClick={onClose} />
      <aside className={classes.cart}>
      
        <PayPalScriptProvider options={paypalScriptOptions}>
          <Button cartTotal={totalPrice} />
        </PayPalScriptProvider>
        <div className={classes.actions}>
          <button onClick={onClose}>Close</button>
          
        </div>
      </aside>
    </>,
    document.getElementById("modal")
  );
}

const paypalScriptOptions = {
  "client-id": "AQaDyXzDcEckQa2JJpfmznVQgiF2d2BhnW2UzJtVtQJm2l0C247rnKlux7Uk5JMqqQBPJ2nKElJTpZtu",
  currency: "USD",
};

function Button({ cartTotal }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps = {
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartTotal.toString(),
            },
          },
        ],
      });
    },
    onApprove(data, actions) {
      return actions.order.capture({}).then((details) => {
        alert(
          "Transaction completed by: " +
            (details?.payer.name.given_name ?? "No details")
        );
      });
    },
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}

export default CART2;
