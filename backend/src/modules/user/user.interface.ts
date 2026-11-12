import { Role } from "../../middlewares/auth.middleware";

export interface UserCreatePayload {
  email: string;
  password: string;
  name: string;
  role?: Role;
  avatar?: string | null;
}

export interface UserUpdatePayload {
  name?: string;
  role?: Role;
  avatar?: string | null;
  password?: string;
}

export interface UserActorContext {
  userId: string;
  role: Role;
}

