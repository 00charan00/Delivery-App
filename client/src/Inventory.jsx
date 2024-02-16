import React, {useState} from 'react';
import InventoryTable from "./FetchInventory";
import axios from 'axios';

function Inventory() {
    const [formData, setFormData] = useState({
        p_name: '', p_id: '', p_category: '', expiry: '', check_in: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form Data:", formData);
            const response = await axios.post('http://localhost:8080/inventoryadd', formData);
            console.log("successful transfer from frontend to backend");
            window.location.reload();
            console.log("Response:", response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (<div className="flex justify-center flex-col items-center">
        <form onSubmit={handleSubmit}>
            <div className="rounded-3xl bg-amber-50 border-amber-200 flex-auto p-4">
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="p_name"
                            value={formData.p_name}
                            onChange={handleChange}
                            placeholder="Product Name"
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Product Id</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="p_id"
                            value={formData.p_id}
                            onChange={handleChange}
                            placeholder="Product Id"
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="p_category"
                            value={formData.p_category}
                            onChange={handleChange}
                            defaultValue="Perishable/Non Perishable"
                        >
                            <option value="Perishable">Perishable</option>
                            <option value="Non-Perishable">Non-Perishable</option>
                        </select>


                    </div>
                    <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Expiry</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Check-In</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            name="check_in"
                            value={formData.check_in}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/6 pl-14 mb-4 md:mb-0 flex items-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 md:mt-0 text-sm"
                            type="submit"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div className="mt-4">
            <InventoryTable/>
        </div>
    </div>);
}

export default Inventory;



















