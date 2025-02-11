"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Examens validés", value: 159, color:"#0fc0fc"  }, // Green
  { name: "Examens non validés", value: 135, color: "#CFCEFF" }, // Red
];

const ExamsPieChart = () => {
  return (
    <div className=" rounded-xl w-full h-full p-4 flex flex-col items-center">
      <h1 className="text-lg font-semibold ">Statistiques de validation des examens</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExamsPieChart;
