import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/ecommerce.css'; // Adjust the path based on your folder structure

function Ecommerce() {
    const [cart, setCart] = useState([]); // State to store the products in the cart
    const navigate = useNavigate(); // Initialize navigate hook

    const products = [
        { id: 1, name: 'Soccer Ball', price: 20 },
        { id: 2, name: 'Jersey', price: 30 },
        { id: 3, name: 'Goalkeeper Gloves', price: 25 },
        { id: 4, name: 'Football Boots', price: 50 }
    ];

    const addToCart = (product) => {
        setCart([...cart, product]); // Add product to the cart
    };

    return (
        <div className="ecommerce">
            {/* Header */}
            <header className="ecommerce-header">
                <h2>Sports Merchandise Store</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    ⬅ Back to Dashboard
                </button>
            </header>

            {/* Cart summary */}
            <section className="cart-summary">
                <h3>Cart: {cart.length} items</h3>
                {cart.length > 0 && (
                    <ul className="cart-items">
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Product list */}
            <section className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        {/* Add a placeholder image */}
                        <img
                            src={`/${product.name.toLowerCase().replace(' ', '-')}.jpg`}
                            alt={product.name}
                            onError={(e) => (e.target.src = '/default-product.jpg')} // Fallback image
                        />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)} className="add-to-cart-button">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Ecommerce;
