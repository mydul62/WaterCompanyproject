import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "../../utils/apiError";

export class UserService {
  static async getAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(payload: any) {
    if (!payload.email || !payload.password || !payload.name) {
      throw new ApiError(400, "Name, email, and password are required.");
    }

    const existing = await prisma.user.findUnique({
      where: { email: payload.email.toLowerCase().trim() },
    });
    if (existing) {
      throw new ApiError(409, "A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    return prisma.user.create({
      data: {
        email: payload.email.toLowerCase().trim(),
        name: payload.name,
        password: passwordHash,
        role: payload.role || "ADMIN",
        avatar: payload.avatar || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  static async update(id: string, payload: any) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "User not found.");

    const data: any = {
      name: payload.name ?? existing.name,
      role: payload.role ?? existing.role,
      avatar: payload.avatar ?? existing.avatar,
    };

    if (payload.password) {
      data.password = await bcrypt.hash(payload.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        updatedAt: true,
      },
    });
  }

  static async delete(id: string) {
    const superAdminCount = await prisma.user.count({ where: { role: "SUPER_ADMIN" } });
    const target = await prisma.user.findUnique({ where: { id } });

    if (target?.role === "SUPER_ADMIN" && superAdminCount <= 1) {
      throw new ApiError(400, "Cannot delete the only Super Administrator account.");
    }

    return prisma.user.delete({ where: { id } });
  }
}

