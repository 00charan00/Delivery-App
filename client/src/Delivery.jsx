// Orders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delivery = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from backend
        axios.get('http://localhost:8080/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const markDelivered = (orderId) => {
        // Update UI only, no backend call
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, delivered: true } : order
            )
        );
    };

    const cancelOrder = (orderId) => {
        // Update UI only, no backend call
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, cancelled: true } : order
            )
        );
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Expiry</th>
                    <th className="px-4 py-2">Count</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id} className={`${order.delivered ? 'bg-green-200' : ''} ${order.cancelled ? 'bg-red-200' : ''}`}>
                        <td className="border px-4 py-2">{order.name}</td>
                        <td className="border px-4 py-2">{order.address}</td>
                        <td className="border px-4 py-2">{order.p_name}</td>
                        <td className="border px-4 py-2">{order.p_category}</td>
                        <td className="border px-4 py-2">{order.expiry}</td>
                        <td className="border px-4 py-2">{order.count}</td>
                        <td className="border px-4 py-2">
                            {!order.delivered && !order.cancelled && (
                                <>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => markDelivered(order.id)}>Delivered</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => cancelOrder(order.id)}>X</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Delivery;
