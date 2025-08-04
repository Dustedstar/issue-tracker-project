import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParameters = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParameters.status)
    ? searchParameters.status
    : undefined;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParameters.orderBy)
    ? { [searchParameters.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParameters, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParameters.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

//* This page is static,since it has no parameters. Since we need it to update the issues everytime a user enters, for example after creating a new issue, we have to make the page dynamic.
//* https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
//* There is still the issue of client-side caching with the router navigation, so we have to go to our IssueForm component and do a router.refresh() after pushing the user to the issues page.
export const dynamic = "force-dynamic";

export default IssuesPage;
