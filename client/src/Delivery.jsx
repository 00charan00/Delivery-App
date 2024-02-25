import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import moment from 'moment';
const Delivery = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from backend
        axios.get('https://delivery-app-backend-qtge.onrender.com/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const markDelivered = (orderId) => {
        // Update status to 1
        updateStatus(orderId, 1);
    };

    const cancelOrder = (orderId) => {
        // Update status to 2
        updateStatus(orderId, 2);
    };

    const updateStatus = (orderId, status) => {
        // Update status in backend
        axios.post('https://delivery-app-backend-qtge.onrender.com/updateOrderStatus', { orderId, status })
            .then(response => {
                if (response.data.success) {
                    setOrders(prevOrders =>
                        prevOrders.map(order =>
                            order.id === orderId ? { ...order, status } : order
                        )
                    );
                } else {
                    console.error('Failed to update order status');
                }
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    return (
        <div>
            <Navbar/>
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
                        <tr key={order.id} className={`${order.status === 0 ? 'bg-red-200' : order.status === 1 ? 'bg-green-200' : 'bg-orange-200'}`}>
                            <td className="border px-4 py-2">{order.name}</td>
                            <td className="border px-4 py-2">{order.address}</td>
                            <td className="border px-4 py-2">{order.p_name}</td>
                            <td className="border px-4 py-2">{order.p_category}</td>
                            <td className="border px-4 py-2">{moment(order.expiry).format('DD-MM-YYYY')}</td>

                            <td className="border px-4 py-2">{order.count}</td>
                            <td className="border px-4 py-2">
                                {!order.delivered && (
                                    <>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => markDelivered(order.id)}>Delivered</button>
                                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded" onClick={() => cancelOrder(order.id)}>Unanswered</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Delivery;
