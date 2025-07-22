import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const param = await params;
  const issueId = parseInt(param.id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
