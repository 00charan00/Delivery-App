import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import moment from "moment/moment";

const Orders = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/inventory')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('Error fetching inventory:', error);
            });
    }, []);

    const bookProduct = (name, category, expiry) => {
        const userName = prompt('Enter your name:');
        const userAddress = prompt('Enter your address:');
        const itemCount = parseInt(prompt('Enter the number of items needed:'));

        if (userName && userAddress && itemCount) {
            axios.post('http://localhost:8080/book', {
                name: userName,
                address: userAddress,
                count: itemCount,
                p_name: name,
                p_category: category,
                expiry: expiry
            })
                .then(response => {
                    alert(response.data.message);
                })
                .catch(error => {
                    console.error('Error booking product:', error);
                });
        }
    };

    return (
        <div><Navbar/>
        <div className="container mx-auto">


            <h1 className="text-2xl font-bold mb-4">Inventory</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Count</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Expiry</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map((item, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{item.p_name}</td>
                        <td className="border px-4 py-2">{item.count}</td>
                        <td className="border px-4 py-2">{item.p_category}</td>
                        <td className="border px-4 py-2">{moment(item.expiry).format('DD-MM-YYYY')}</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => bookProduct(item.p_name, item.p_category, item.expiry)}>Book</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Orders;
