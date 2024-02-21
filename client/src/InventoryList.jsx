import React, { useState, useEffect } from 'react';

function InventoryCard({ item }) {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.p_name}</div>
                <p className="text-gray-700 text-base">
                    Count: {item.count}<br />
                    Category: {item.p_category}<br />
                    Expiry: {item.expiry}<br />
                    Check-in: {item.check_in}
                </p>
            </div>
        </div>
    );
}

function InventoryList() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetch('/http://localhost:8080/inventory')
            .then(response => response.json())
            .then(data => {
                setInventory(data);
            })
            .catch(error => {
                console.error('Error fetching inventory data:', error);
            });
    }, []);

    return (
        <div className="flex flex-wrap justify-center">
            {inventory.map(item => (
                <InventoryCard key={item.id} item={item} />
            ))}
        </div>
    );
}

export default InventoryList;
