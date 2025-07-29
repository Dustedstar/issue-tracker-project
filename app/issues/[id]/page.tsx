/**
 * * We're using Radix UI components instead of writing TailwindCSS for consistency.
 * * We also had to install react-markdown in order to preview the Markdown content.
 * ! TailwindCSS has no default styling for H1 and ul/li tags, so we use the @tailwindcss/typography plugin to circumvent this.
 * ! Because of the newest TailwindCSS version, there is no tailwind.config.js file, we have to import the plugin for typography by adding @plugin "@tailwindcss/typography" to our global.css
 * ! for more info --> https://github.com/tailwindlabs/tailwindcss-typography
 */

import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

//! In the new Next.js version, params are now a Promise, and should be treated as such by awaiting them.
interface Props {
  params: Promise<{ id: string }>;
}

export default async function IssueDetailPage({ params }: Props) {
  const param = await params;
  const issueId = parseInt(param.id);

  //! If the given ID is not a number, return 404.
  if (Number.isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  //! If the given ID doesn't exist, return 404.
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}
