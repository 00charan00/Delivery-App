import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-800 p-4 text-white flex items-center ">
            <img className="h-10 w-10 " src={logo} alt="Logo" />
            <div className="flex items-center">
                <Link to="/home" className="text-white ml-4">Link</Link>
                <Link to="/home" className="text-white ml-4">Link</Link>
                <Link to="/home" className="text-white ml-4">Link</Link>
                <Link to="/home" className="text-white ml-4">Link</Link>
                <Link to="/home" className="text-white ml-4">Link</Link>
                <Link to="/home" className="text-white ml-4">Link</Link>

            </div>
        </nav>
    );
};

export default Navbar;