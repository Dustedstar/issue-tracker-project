import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Link from "../../components/Link";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
