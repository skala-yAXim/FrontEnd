import { ROLE_ADMIN, ROLE_LEADER, ROLE_MEMBER } from "@/const/role";

export type UserRole =
  | typeof ROLE_MEMBER
  | typeof ROLE_LEADER
  | typeof ROLE_ADMIN
  | null;

export interface User {
  name: string;
  email: string;
  userRole: UserRole;
  userId: string;
  gitEmail: string;
}

export interface UserComment {
  comment: string;
}
