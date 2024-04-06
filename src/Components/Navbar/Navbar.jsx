// eslint-disable-next-line no-unused-vars
import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="logo.png" alt="Logo" />
            </div>
            <div className="categories-dropdown">
                {/* Dropdown list for categories */}
                <select>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                </select>
            </div>
            <div className="search-bar">
                {/* Search bar */}
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>
            <div className="user-actions">
                <div className="sign-in">
                    {/* Sign in button/link */}
                    <button>Sign In</button>
                </div>
                <div className="favorite">
                    {/* Favorite icon or link */}
                    <button>Favorite</button>
                </div>
                <div className="cart">
                    {/* Cart icon or link */}
                    <button>Cart</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
