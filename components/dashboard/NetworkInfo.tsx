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
const getData = () => {
  const data = [];
  for (let i = 0; i < 40; i++) {
    data.push({
      name: `14:21:${i.toString().padStart(2, "0")}`, // 格式化时间
      In: Math.floor(Math.random() * 11),
      Out: Math.floor(Math.random() * 11),
    });
  }
  console.log(data);
  return data;
};
export const NetworkInfo = () => {
  return (
    <ResponsiveContainer width="100%" height="80%" style={{ fontSize: 12 }}>
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

        <XAxis dataKey="name" tick={{ dy: 5 }}></XAxis>
        <YAxis
          orientation="right"
          type="number"
          domain={[0, 100]}
          tickCount={6}
          width={40}
          ticks={[0, 25, 50, 75, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Area type="monotone" dataKey="In" />
        <Area type="monotone" dataKey="Out" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
