import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Male", value: 40 },
  { name: "Female", value: 60 },
];

const COLORS = ["#4285F4", "#DB4437"]; // Blue and Red

const donutVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function GenderDonutChart({members}) {
  const [males, setMales] = useState(members.filter(member => member.gender === 'female').length)
  const [females, setFemales] = useState(members.filter(member => member.gender === 'female').length)
  return (
    <div className="bg-white shadow-md py-4 rounded-lg">
         <div  className="text-center text-[17px] font-bold">Gender Distribution</div>
    <motion.div
      className="flex justify-center items-center p-4"
      variants={donutVariants}
      initial="hidden"
      animate="visible"
    >
        
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270} // Clockwise
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value) => <span className="text-sm">{value}</span>}
        />
      </PieChart>
    </motion.div>
    </div>
  );
}
