import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
    // Check if data exists and is not empty
    if (!data || Object.keys(data).length === 0) {
        console.error("PieChart: No data provided or data is empty");
        return null;
    }

    // Check if data is in the correct format
    if (!(data instanceof Object) || !Object.values(data).every(value => typeof value === "number")) {
        console.error("PieChart: Invalid data format");
        return null;
    }

    // Generate random colors
    const colors = randomColor({
        count: Object.keys(data).length,
        luminosity: "dark",
        hue: "random",
        seed: 1,
    });

    // Construct data object for Chart.js
    const dataObj = {
        labels: Object.keys(data),
        datasets: [
            {
                label: title || "",
                data: Object.values(data),
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 20,
                },
            },
            title: {
                display: true,
                text: title || "",
            },
        },
    };

    return (
        <Pie data={dataObj} options={options} />
    );
};

export default PieChart;
