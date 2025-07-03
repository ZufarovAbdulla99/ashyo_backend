import { UserRoles } from "../enums/user-roles.enum";

export interface UpdateMeRequest {
  fullname?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  role?: UserRoles;
  is_verified?: boolean;
}