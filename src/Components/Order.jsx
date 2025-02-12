import React, { useEffect, useState } from 'react'
import "./Order.css"
import Checkout from './Checkout';
const Order = () => {
    const [data, setData] = useState([]);
    const fetchProduct = async () => {
        const token = localStorage.getItem("token"); // Get token from local storage

        const response = await fetch(`https://edgistify-backend-oh53.onrender.com/api/cart/getCartProduct`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const productsData = await response.json();
        console.log(productsData);
        setData(productsData.products);
    }
    useEffect(() => {

        fetchProduct()


    }, [])

    return (

        <div>
            {
                data.length == 0 ? (
                    <h1>Cart is empty, Add some product</h1>
                ) :
                    (<>
                        <div className="grid">
                            {data.map((product) => (
                                <div>
                                    <img src={product.productID.image} alt="" />
                                    <p>Rs. {product.productID.rupees}</p>
                                    <p>{product.productID.title}</p>
                                    <p className='pattern'>Quantity: {product.quantity}</p>
                                    {/* <button onClick={}>+</button> */}
                                    {/* <p className='pattern'>{product.price}</p> */}
                                </div>
                            )
                            )
                            }
                        </div>
                        <Checkout prop={data} />
                    </>)}
        </div>

    )
}

export default Order