import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../validationSchema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const param = await params;
  const body = await request.json();
  const issueId = parseInt(param.id);
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: "Issue was not found" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}
