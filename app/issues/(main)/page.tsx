import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/generated/prisma";
import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParameters = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParameters.status)
    ? searchParameters.status
    : undefined;
  const where = { status };

  const order: "asc" | "desc" =
    searchParameters.order === "desc" ? "desc" : "asc";

  const orderBy = columnNames.includes(searchParameters.orderBy)
    ? { [searchParameters.orderBy]: order }
    : undefined;

  const page = parseInt(searchParameters.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex gap="2" justify="center" direction="column">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParameters} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Flex>
  );
};

//* This page is static,since it has no parameters. Since we need it to update the issues everytime a user enters, for example after creating a new issue, we have to make the page dynamic.
//* https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
//* There is still the issue of client-side caching with the router navigation, so we have to go to our IssueForm component and do a router.refresh() after pushing the user to the issues page.
export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
