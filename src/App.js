import dummyBikes from './data/dummy-bikes';
import Cart from './Cart';
import React, { useState } from 'react';
import { useScriptProviderContext } from '@paypal/react-paypal-js';

function App() {
 const [cartItems,setCart]=useState([]);
 let numItems=cartItems.length;
 const [modalIsOpen,setModalIsOpen]=useState(false);
 function buttonAction(item, itemInCart){
  if (!itemInCart) {setCart((prevItems)=>[...prevItems,item])}
    else {setCart(cartItems.filter((cartItem)=>cartItem.id!==item.id))}
 }
let totalPrice=0
cartItems.forEach(item=>{
  totalPrice+=item.price
});
console.log(totalPrice)
   return (
    <>
      <header >
        <h1>Buy a Bike!</h1>
        <button onClick={()=> setModalIsOpen(true)}>shopin cart ({numItems})</button>
      </header>
      {modalIsOpen&& <Cart cartItems={cartItems} totalPrice={totalPrice} onClose={()=>setModalIsOpen(false)}/>}

      <main>
        <ul style={{listStyleType:'none'}} >
        {dummyBikes.map((bike) => (
            <li key={bike.id}>
            <img src={bike.image} alt={bike.title} />
                <h2>{bike.title}</h2>
                <p >${bike.price}</p>
                <p>{bike.description}</p>
                {bike.itemInCart=cartItems.some((item) => {return item.id===bike.id})}
            <button onClick={() =>buttonAction(bike,bike.itemInCart)}>{bike.itemInCart?"remov THIG":"add THIGN"}</button>
     </li>
      ))}
      </ul>
    {console.log(cartItems)}
    </main>
    </>
  );
}

export default App;
