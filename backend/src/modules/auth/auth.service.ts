import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";
import { ApiError } from "../../utils/apiError";

export class AuthService {
  static async login(email: string, passwordPlain: string) {
    if (!email || !passwordPlain) {
      throw new ApiError(400, "Email and password are required.");
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or credentials.");
    }

    const isMatch = await bcrypt.compare(passwordPlain, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or credentials.");
    }

    const token = jwt.sign(
      { id: user.id, userId: user.id, email: user.email, role: user.role },
      ENV.JWT_SECRET || "default_jwt_secret_key",
      { expiresIn: "7d" }
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
}

