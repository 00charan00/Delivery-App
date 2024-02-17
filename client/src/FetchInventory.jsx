import React, { useState, useEffect } from 'react';
import moment from "moment";

function InventoryTable() {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        // Fetch inventory data from the backend
        fetch('http://localhost:8080/inventory')
            .then(response => response.json())
            .then(data => setInventoryData(data))
            .catch(error => console.error('Error fetching inventory data:', error));
    }, []);

    return (
        <div className="container mx-auto">
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Count</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Expiry</th>
                    <th className="px-4 py-2">Check-in</th>
                </tr>
                </thead>
                <tbody>
                {inventoryData.map(item => (
                    <tr key={item.id} className="bg-gray-100">
                        <td className="border px-4 py-2">{item.p_name}</td>
                        <td className="border px-4 py-2">{item.count}</td>
                        <td className="border px-4 py-2">{item.p_category}</td>
                        <td className="border px-4 py-2">{moment(item.expiry).format('DD/MM/YY')}</td>
                        <td className="border px-4 py-2">{moment(item.check_in).format('DD/MM/YY')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;
