import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";


const chartVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-xl shadow-md px-3 py-2 text-sm border border-gray-200">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-indigo-600">{payload[0].value} people</p>
      </div>
    );
  }
  return null;
};

export default function AgeDistributionChart({members}) {
  const ageGroups = [
    { label: "0-18", min: 0, max: 18 },
    { label: "19-25", min: 19, max: 25 },
    { label: "26-35", min: 26, max: 35 },
    { label: "36-45", min: 36, max: 45 },
    { label: "46-60", min: 46, max: 60 },
    { label: "60+", min: 61, max: Infinity }
  ];
  
  const ageData = ageGroups.map(group => {
    const count = members.filter(member =>
      member.age >= group.min && member.age <= group.max
    ).length;
  
    return {
      ageGroup: group.label,
      count
    };
  });
  
  console.log(ageData);
  
  return (
    <motion.div
      className="w-full max-w-4xl lg:p-6 p-1 mx-auto bg-white rounded-2xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={chartVariants}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Age Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ageData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="ageGroup" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#6366F1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
