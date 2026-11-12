import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "../../utils/apiError";
import { Role } from "../../middlewares/auth.middleware";
import { UserActorContext, UserCreatePayload, UserUpdatePayload } from "./user.interface";

const ALLOWED_ROLES: Role[] = ["SUPER_ADMIN", "ADMIN", "EDITOR", "SALES_MANAGER"];

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

  static async create(payload: UserCreatePayload, actorRole?: Role) {
    if (!payload.email || !payload.password || !payload.name) {
      throw new ApiError(400, "Name, email, and password are required.");
    }

    if (String(payload.password).length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long.");
    }

    const requestedRole = (payload.role || "EDITOR") as Role;
    if (!ALLOWED_ROLES.includes(requestedRole)) {
      throw new ApiError(400, "Invalid user role specified.");
    }

    if (requestedRole === "SUPER_ADMIN" && actorRole !== "SUPER_ADMIN") {
      throw new ApiError(403, "Only a Super Administrator can create a SUPER_ADMIN account.");
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
        role: requestedRole,
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

  static async update(id: string, payload: UserUpdatePayload, actor?: UserActorContext) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "User not found.");

    if (existing.role === "SUPER_ADMIN" && actor && actor.role !== "SUPER_ADMIN") {
      throw new ApiError(403, "Only a Super Administrator can modify a SUPER_ADMIN account.");
    }

    if (payload.role !== undefined) {
      if (!ALLOWED_ROLES.includes(payload.role)) {
        throw new ApiError(400, "Invalid user role specified.");
      }
      if (payload.role === "SUPER_ADMIN" && actor && actor.role !== "SUPER_ADMIN") {
        throw new ApiError(403, "Only a Super Administrator can assign the SUPER_ADMIN role.");
      }
      if (existing.role === "SUPER_ADMIN" && payload.role !== "SUPER_ADMIN") {
        const superAdminCount = await prisma.user.count({ where: { role: "SUPER_ADMIN" } });
        if (superAdminCount <= 1) {
          throw new ApiError(400, "Cannot demote the only Super Administrator account.");
        }
      }
    }

    const data: any = {
      name: payload.name ?? existing.name,
      role: payload.role ?? existing.role,
      avatar: payload.avatar ?? existing.avatar,
    };

    if (payload.password) {
      if (String(payload.password).length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long.");
      }
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

  static async delete(id: string, actor?: UserActorContext) {
    if (actor && actor.userId === id) {
      throw new ApiError(400, "You cannot delete your own active account.");
    }

    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      throw new ApiError(404, "User not found.");
    }

    if (target.role === "SUPER_ADMIN" && actor && actor.role !== "SUPER_ADMIN") {
      throw new ApiError(403, "Only a Super Administrator can delete a SUPER_ADMIN account.");
    }

    const superAdminCount = await prisma.user.count({ where: { role: "SUPER_ADMIN" } });
    if (target.role === "SUPER_ADMIN" && superAdminCount <= 1) {
      throw new ApiError(400, "Cannot delete the only Super Administrator account.");
    }

    return prisma.user.delete({ where: { id } });
  }
}

