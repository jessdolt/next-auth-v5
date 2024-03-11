"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import UserInfo from "../_components/user-info";

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo user={user} label="👥 Client Component" />
    </div>
  );
};

export default ClientPage;
