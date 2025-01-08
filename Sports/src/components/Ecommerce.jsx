import React, { useState, useEffect } from 'react';
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
    const [user, setUser] = useState(null); // Store user data
    const [cartTotal, setCartTotal] = useState(0); // Store cart total
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the user's data on component mount
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userData = await response.json();
            setUser(userData);
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // Update the cart total whenever the cart is modified
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        setCartTotal(total);
    }, [cart]);

    const products = [
        { id: 1, name: 'Soccer Ball', price: 20, image: footballImg },
        { id: 2, name: 'Jersey', price: 30, image: jerseyImg },
        { id: 3, name: 'Goalkeeper Gloves', price: 25, image: glovesImg },
        { id: 4, name: 'Football Boots', price: 50, image: bootsImg },
        { id: 5, name: 'Basketball', price: 22, image: basketballImg },
        { id: 6, name: 'Tennis Racket', price: 60, image: tennisRacketImg },
        { id: 7, name: 'Badminton Shuttlecock Pack', price: 15, image: badmintonShuttleImg },
        { id: 8, name: 'Cricket Bat', price: 45, image: cricketBatImg },
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const handleCheckout = async () => {
        if (!user) {
            alert('User not logged in');
            return;
        }
    
        if (user.wallet.balance < cartTotal) {
            alert('Insufficient balance for the purchase');
            return;
        }
    
        // Ensure the cartTotal is a number
        const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    
        if (isNaN(totalAmount) || totalAmount <= 0) {
            alert('Invalid total amount');
            return;
        }
    
        // Send a request to the backend to deduct money
        const response = await fetch('/api/users/update-wallet', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ balance: user.wallet.balance - totalAmount }),  // Update the balance here
        });
    
        const data = await response.json();
    
        if (response.ok) {
            alert('Purchase successful!');
            setCart([]); // Clear cart after successful purchase
        } else {
            alert(data.message || 'Failed to make purchase');
        }
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
                <p>Total: ${cartTotal}</p>
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

            {/* Checkout Button */}
            <button onClick={handleCheckout} className="checkout-button">
                Checkout
            </button>
        </div>
    );
}

export default Ecommerce;
