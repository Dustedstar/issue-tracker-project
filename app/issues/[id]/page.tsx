import { prisma } from "@/prisma/client";
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
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
    </div>
  );
};

export default IssueDetailPage;
