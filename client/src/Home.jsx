import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Navbar from "./Navbar";
import axios from "axios";

function Home() {
    const [inventoryData, setInventoryData] = useState([]);
    const [perishableCount, setPerishableCount] = useState(0);
    const [nonPerishableCount, setNonPerishableCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const pieChartRef = useRef(null);

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            const response = await axios.get("https://delivery-app-backend-qtge.onrender.com/inventory");
            setInventoryData(response.data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };

    useEffect(() => {
        if (inventoryData.length > 0) {
            const perishableCount = inventoryData.filter(
                (item) => item.p_category === "Perishable"
            ).length;
            const nonPerishableCount = inventoryData.filter(
                (item) => item.p_category === "Non-Perishable"
            ).length;
            const itemCount = inventoryData.reduce((total, item) => {
                if (typeof item.count === "number") {
                    return total + item.count;
                } else {
                    return total;
                }
            }, 0);

            setPerishableCount(perishableCount);
            setNonPerishableCount(nonPerishableCount);
            setItemCount(itemCount);

            if (pieChartRef.current && pieChartRef.current.chart) {
                pieChartRef.current.chart.destroy(); // Destroy existing chart instance
            }

            pieChartRef.current.chart = new Chart(pieChartRef.current, {
                type: "pie",
                data: {
                    labels: ["Perishable", "Non-Perishable"],
                    datasets: [
                        {
                            data: [perishableCount, nonPerishableCount],
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                        },
                    ],
                },
            });
        }
    }, [inventoryData]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="w-60 h-60">
                    <canvas id="pieChart" ref={pieChartRef}></canvas>
                </div>
                <p className="text-lg">Perishable Count: {perishableCount}</p>
                <p className="text-lg">Non-Perishable Count: {nonPerishableCount}</p>
                <p className="text-lg">Item Count: {itemCount}</p>
            </div>
        </div>
    );
}

export default Home;
