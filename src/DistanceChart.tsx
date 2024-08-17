import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface DistanceChartProps {
    distance: number;
}

const DistanceChart: React.FC<DistanceChartProps> = ({ distance }) => {
    // Data for the chart, you can add more bars if needed
    const data = [
        {
            name: "Distance",
            value: distance,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DistanceChart;
