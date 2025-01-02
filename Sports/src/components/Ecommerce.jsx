import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/ecommerce.css'; 

// Import images
import footballImg from './football.jpg';
import jerseyImg from './jersey.jpg';
import glovesImg from './gloves.webp';
import bootsImg from './boots.avif';
import basketballImg from './basketball.avif';
import tennisRacketImg from './tenis.webp';
import badmintonShuttleImg from './shuttle.jpg';
import cricketBatImg from './bat.jpg';

function Ecommerce() {
    const [cart, setCart] = useState([]); 
    const navigate = useNavigate(); 

    // Products with images
    const products = [
        {
            id: 1,
            name: 'Soccer Ball',
            price: 20,
            image: footballImg,
        },
        {
            id: 2,
            name: 'Jersey',
            price: 30,
            image: jerseyImg,
        },
        {
            id: 3,
            name: 'Goalkeeper Gloves',
            price: 25,
            image: glovesImg,
        },
        {
            id: 4,
            name: 'Football Boots',
            price: 50,
            image: bootsImg,
        },
        {
            id: 5,
            name: 'Basketball',
            price: 22,
            image: basketballImg,
        },
        {
            id: 6,
            name: 'Tennis Racket',
            price: 60,
            image: tennisRacketImg,
        },
        {
            id: 7,
            name: 'Badminton Shuttlecock Pack',
            price: 15,
            image: badmintonShuttleImg,
        },
        {
            id: 8,
            name: 'Cricket Bat',
            price: 45,
            image: cricketBatImg,
        },
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
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
                        <img
                            src={product.image}
                            alt={product.name}
                            onError={(e) => (e.target.src = 'default.jpg')} 
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
