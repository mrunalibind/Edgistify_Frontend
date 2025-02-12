import React from 'react'

const Card = ({ prop }) => {
    let { _id, image, type, pattern, rupees } = prop;

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You need to log in first!");
                return;
            }

            const response = await fetch("https://edgistify-backend-oh53.onrender.com/api/cart/addProductToCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
                body: JSON.stringify({
                    productID: _id,
                    quantity: 1,
                    price: rupees,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Added to cart");
            } else {
                alert(data.msg || "Error adding to cart");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className='card'>
            <img className='image' src={image} alt="" />
            <p className='type'>{type}</p>
            <p className='pattern'>{pattern}</p>
            <button onClick={handleAddToCart} className='button'>Add to Cart</button>
        </div>
    )
}

export default Card