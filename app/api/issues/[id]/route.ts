import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "../validationSchema";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

//! Vercel flagged the destructuring of params inside the PATCH parameters, so we'll have to extract dynamic route params from request.url instead.

export async function PATCH(request: NextRequest) {
  //! different from the course, due to updates.
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  //! ---
  const issueId = parseInt(id ?? "");
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json(
        { error: "User does not exist." },
        { status: 400 }
      );
  }

  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: "Issue was not found" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const issueId = parseInt(id ?? "");
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  await prisma.issue.delete({ where: { id: issueId } });
  return NextResponse.json({});
}
