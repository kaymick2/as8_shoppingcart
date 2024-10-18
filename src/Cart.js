import ReactDOM from 'react-dom';
import classes from './Cart.module.css';
import { useState } from 'react';
import CART2 from './CART2';
function Cart({ cartItems, totalPrice, onClose }) {
const [cartIsOpen,setCartOpen]=useState(false);

    return ReactDOM.createPortal(
    <>
          {cartIsOpen&& <CART2 totalPrice={totalPrice} onClose={()=>setCartOpen(false)}/>}

      <div className={classes.backdrop} onClick={onClose} />
      <aside className={classes.cart}>
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} (${item.price})
            </li>
          ))}
        </ul>
        <p className={classes.total}>Total: ${totalPrice}</p>
        <div className={classes.actions}>
          <button onClick={onClose}>Close</button>
          <button onClick={()=> setCartOpen(true)}>BUY WIT PAY PEL</button>
          <button onClick={onClose}>Buy</button>
        </div>
      </aside>
    </>,
    document.getElementById('modal')
  );
}

export default Cart;
