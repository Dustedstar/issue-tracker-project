import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Status } from "./generated/prisma";
import Link from "next/link";

interface IssueCounts {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ counts }: { counts: IssueCounts }) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: counts.open, status: "OPEN" },
    {
      label: "In-Progress Issues",
      value: counts.inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", value: counts.closed, status: "CLOSED" },
  ];
  return (
    <Flex mt="5" gap="4" justify="center">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="font-semibold"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="4" className="font-extrabold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
