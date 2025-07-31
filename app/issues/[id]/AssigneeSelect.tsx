"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "0" ? null : userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "0"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content position="popper" align="end">
          <Select.Group>
            <Select.Label>Suggesions</Select.Label>
            <Select.Item value="0">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default AssigneeSelect;
