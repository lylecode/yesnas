"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];
const getData = () => {
  const data = [];
  for (let i = 0; i < 40; i++) {
    data.push({
      name: `14:21:${i.toString().padStart(2, "0")}`, // 格式化时间
      CPU0: Math.floor(Math.random() * 11),
    });
  }
  console.log(data);
  return data;
};
const TestPage = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" style={{ fontSize: 12 }}>
      <AreaChart
        data={getData()}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis hide={true} dataKey="name" tick={{ dy: 5 }}></XAxis>
        <YAxis
          hide={true}
          orientation="right"
          type="number"
          domain={[0, 100]}
          width={40}
          ticks={[0, 25, 50, 75, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />

        {Array.from({ length: 6 }).map((_, index) => (
          <Area
            key={`cpu-${index}`} // 必须添加key
            type="monotone"
            dataKey={`CPU${index}`}
            stroke={COLORS[index % COLORS.length]}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TestPage;
