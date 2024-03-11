"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import FormError from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
}

const RoleGate: React.FC<RoleGateProps> = ({ children, allowedRole }) => {
  const role = useCurrentRole();

  if (!role) return null;

  if (!allowedRole.includes(role)) {
    return (
      <FormError message="You do not have permission to view this content" />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
