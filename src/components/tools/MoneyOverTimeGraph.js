import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO, startOfWeek, startOfMonth } from "date-fns";
import { motion } from "framer-motion";

const groupBy = (data, type) => {
  const grouped = {};

  for (const entry of data) {
    const date = parseISO(entry.timestamp);
    let key = "";

    if (type === "day") {
      key = format(date, "yyyy-MM-dd");
    } else if (type === "week") {
      key = format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
    } else if (type === "month") {
      key = format(startOfMonth(date), "yyyy-MM");
    }

    if (!grouped[key]) {
      grouped[key] = 0;
    }
    grouped[key] += entry.amount;
  }

  return Object.entries(grouped).map(([key, amount]) => ({ date: key, amount }));
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-sm border">
        <p className="text-gray-600 font-medium">{label}</p>
        <p className="text-indigo-600 font-semibold">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const MoneyOverTimeGraph = ({ data }) => {
  const [filter, setFilter] = useState("day");

  const filteredData = useMemo(() => groupBy(data, filter), [data, filter]);

  return (
    <motion.div
      className="bg-white rounded-2xl lg:p-6 p-1 shadow-lg w-full "
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800"> Income Over Time</h2>
        <select
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-indigo-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMoney" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              format(parseISO(date), filter === "month" ? "MMM yyyy" : "dd MMM")
            }
            stroke="#94a3b8"
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
            fill="url(#colorMoney)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MoneyOverTimeGraph;
