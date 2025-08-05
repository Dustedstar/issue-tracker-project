import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@/app/generated/prisma";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as NextLink } from "next/link";
import { Link } from "@/app/components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order?: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const searchParameters = await searchParams;
  const order: "asc" | "desc" =
    searchParameters.order === "desc" ? "desc" : "asc";
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
            const isActive = column.value === searchParameters.orderBy;
            const nextOrder = isActive && order === "asc" ? "desc" : "asc";
            return (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParameters,
                      orderBy: column.value,
                      order: isActive ? nextOrder : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {isActive && (
                  <ArrowUpIcon
                    className={`inline transition-transform ${
                      order === "desc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Table.ColumnHeaderCell>
            );
          })}
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
