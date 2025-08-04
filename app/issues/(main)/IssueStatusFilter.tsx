"use client";

import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : " ";
        if (status === " ") router.push("/issues");
        else router.push("/issues" + query);
      }}
      defaultValue=" "
    >
      <Select.Trigger placeholder="Filter by" />
      <Select.Content position="popper" align="center">
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
