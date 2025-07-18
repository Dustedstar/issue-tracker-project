//* We're using Radix UI components instead of writing TailwindCSS for consistency.

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const param = await params;
  const issueId = parseInt(param.id);
  //! If the given ID is not a number, return 404.
  if (Number.isNaN(issueId)) notFound();
  //! ---
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  //! If the given ID doesn't exist, return 404.
  if (!issue) notFound();
  //! ---
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
