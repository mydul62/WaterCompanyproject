import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { CategoryCreatePayload, CategoryUpdatePayload } from "./category.interface";

export class CategoryService {
  static async getAll() {
    return prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  static async create(payload: CategoryCreatePayload) {
    if (!payload.name) {
      throw new ApiError(400, "Category name is required.");
    }

    const slug =
      payload.slug?.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") ||
      payload.name.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError(409, `Category '${slug}' already exists.`);
    }

    return prisma.category.create({
      data: {
        name: payload.name,
        slug,
        description: payload.description || null,
        material: payload.material || "TINPLATE",
        order: Number(payload.order) || 0,
        image: payload.image || null,
        isActive: payload.isActive !== false,
      },
    });
  }

  static async update(id: string, payload: CategoryUpdatePayload) {
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Category not found.");
    }

    const nextSlug =
      payload.slug && payload.slug !== existing.slug
        ? payload.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-")
        : undefined;

    if (nextSlug) {
      const clash = await prisma.category.findUnique({ where: { slug: nextSlug } });
      if (clash && clash.id !== id) {
        throw new ApiError(409, `Category '${nextSlug}' already exists.`);
      }
    }

    return prisma.category.update({
      where: { id },
      data: {
        ...(payload.name !== undefined ? { name: payload.name } : {}),
        ...(nextSlug !== undefined ? { slug: nextSlug } : {}),
        ...(payload.description !== undefined ? { description: payload.description } : {}),
        ...(payload.material !== undefined ? { material: payload.material } : {}),
        ...(payload.order !== undefined ? { order: Number(payload.order) } : {}),
        ...(payload.image !== undefined ? { image: payload.image } : {}),
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
      },
    });
  }

  static async delete(id: string) {
    const productsCount = await prisma.product.count({ where: { categoryId: id } });
    if (productsCount > 0) {
      throw new ApiError(400, `Cannot delete category: ${productsCount} products are assigned to it.`);
    }
    return prisma.category.delete({ where: { id } });
  }
}

