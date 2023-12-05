"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({
  color = "#2563EB",
  data,
}: {
  color: string;
  data: any;
}) {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="ano"
          stroke={"#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
