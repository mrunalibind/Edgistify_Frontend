import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Checkout = ({prop}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shippingAddress: "",

  });
  const handleSubmit = async (userData) => {
    try {
      // console.log(userData);
      // console.log(prop);
      const token = localStorage.getItem("token"); //Get token from local storage
      const orderData = {
        items: prop.map(({ productID, quantity, price }) => ({
          productID,
          quantity,
          price,
        })),
        shippingAddress: userData.shippingAddress,
      };

      console.log(orderData);
  
      const response = await fetch('https://edgistify-backend-oh53.onrender.com/api/order/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
      });
      const errorData = await response.json(); // Parse the error message
      console.log(errorData)

      if (response.ok) {
        alert("Order Confirm Successfully");
        navigate('/product')
      }

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }


  const changeHandler = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }
  return (
    <div>
      <h1>Checkout</h1>
      <form className='' onSubmit={(e) => {
        e.preventDefault()
        // console.log(formData);
        handleSubmit(formData);
      }}>
        <input value={formData.shippingAddress} onChange={(event) => { changeHandler("shippingAddress", event.target.value) }} type="text" placeholder='Shipping Address' required />
        <input className='click-btn' type="submit" value="Checkout" />
      </form>
    </div>
  )
}

export default Checkout