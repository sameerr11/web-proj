import React, { useState } from 'react';

function Ecommerce() {
    const [cart, setCart] = useState([]); // State to store the products in the cart

    const products = [
        { id: 1, name: 'Soccer Ball', price: 20 },
        { id: 2, name: 'Jersey', price: 30 }
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);  // Add product to the cart
    };

    return (
        <div className="ecommerce">
            <h2>Sports Merchandise Store</h2>
            
            {/* Cart summary */}
            <div className="cart-summary">
                <h3>Cart: {cart.length} items</h3>
            </div>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        {/* Add product image (optional) */}
                        <img src={`/${product.name.toLowerCase().replace(' ', '-')}.jpg`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ecommerce;
