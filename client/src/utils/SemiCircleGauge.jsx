import { PieChart, Pie, Cell } from "recharts";
import React from "react";

const RADIAN = Math.PI / 180;

const Needle = ({ value, min, max, cx, cy, outerRadius }) => {
    const angle = 180 - ((value - min) * 180) / (max - min);

    const length = outerRadius - 15;
    const x = cx + length * Math.cos(-RADIAN * angle);
    const y = cy + length * Math.sin(-RADIAN * angle);

    return (
        <>
            <circle cx={cx} cy={cy} r={6} fill="#111" />
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#111" strokeWidth={3} />
        </>
    );
};

export default function SemiCircleGauge({ value, min, max, ranges, title }) {
    return (
        <div className="flex flex-col items-center">
            <PieChart width={400} height={250}>
                <Pie
                    data={ranges}
                    cx={200}
                    cy={200}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={90}
                    outerRadius={120}
                    dataKey="value"
                >
                    {ranges.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>

                <Needle
                    value={value}
                    min={min}
                    max={max}
                    cx={200}
                    cy={200}
                    outerRadius={100}
                />
            </PieChart>

            <div className="-mt-16 text-center">
                <h2 className="text-3xl font-bold">{value}</h2>
                <p className="text-gray-500">{title}</p>
            </div>
        </div>
    );
}
