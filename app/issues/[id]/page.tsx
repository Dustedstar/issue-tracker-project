/**
 * * We're using Radix UI components instead of writing TailwindCSS for consistency.
 * * We also had to install react-markdown in order to preview the Markdown content.
 * ! TailwindCSS has no default styling for H1 and ul/li tags, so we use the @tailwindcss/typography plugin to circumvent this.
 * ! Because of the newest TailwindCSS version, there is no tailwind.config.js file, we have to import the plugin for typography by adding @plugin "@tailwindcss/typography" to our global.css
 * ! for more info --> https://github.com/tailwindlabs/tailwindcss-typography
 */

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const issueId = parseInt(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  //! If the given ID is not a number, return 404.
  if (Number.isNaN(issueId)) notFound();
  //! If the given ID doesn't exist, return 404.
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
