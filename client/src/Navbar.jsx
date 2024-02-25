import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Delivery App</div>
                <ul className="flex space-x-4">

                    <li>
                        <Link
                            to="/home"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/inventory"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                        >
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/delivery"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                        >
                            Delivery
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/placeorders"
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                        >
                            Place Orders
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
