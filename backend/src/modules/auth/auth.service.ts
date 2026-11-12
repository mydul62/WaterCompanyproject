import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";
import { ApiError } from "../../utils/apiError";
import { AuthLoginResponse } from "./auth.interface";

export class AuthService {
  static async login(email: string, passwordPlain: string): Promise<AuthLoginResponse> {
    if (!email || !passwordPlain) {
      throw new ApiError(400, "Email and password are required.");
    }

    if (!ENV.JWT_SECRET) {
      throw new ApiError(500, "Authentication service is not configured.");
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(passwordPlain, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const token = jwt.sign(
      { id: user.id, userId: user.id, email: user.email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  static async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    });
    if (!user) throw new ApiError(404, "User not found.");
    return user;
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    if (!currentPassword || !newPassword) {
      throw new ApiError(400, "Current password and new password are required.");
    }
    if (newPassword.length < 8) {
      throw new ApiError(400, "New password must be at least 8 characters long.");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Current password is incorrect.");
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new ApiError(400, "New password must be different from your current password.");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: passwordHash },
    });
  }
}

