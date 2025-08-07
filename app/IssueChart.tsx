"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface IssueCounts {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ counts }: { counts: IssueCounts }) => {
  const data = [
    { label: "Open", value: counts.open },
    { label: "In Progress", value: counts.inProgress },
    { label: "Closed", value: counts.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label"></XAxis>
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--violet-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
