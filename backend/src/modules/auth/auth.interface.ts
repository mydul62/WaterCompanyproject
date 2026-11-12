export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AuthUserSummary {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
}

export interface AuthLoginResponse {
  token: string;
  user: AuthUserSummary;
}

