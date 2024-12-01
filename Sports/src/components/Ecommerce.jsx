import React from 'react';

function Ecommerce() {
    return (
        <div className="ecommerce">
            <h2>Sports Merchandise Store</h2>
            <div className="product-list">
                <div className="product-card">
                    <h3>Soccer Ball</h3>
                    <p>Price: $20</p>
                    <button>Add to Cart</button>
                </div>
                <div className="product-card">
                    <h3>Jersey</h3>
                    <p>Price: $30</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Ecommerce;
