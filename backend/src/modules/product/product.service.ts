import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";

export interface ProductFilterParams {
  category?: string;
  material?: string;
  isFeatured?: boolean | string;
  search?: string;
  sort?: string;
}

export class ProductService {
  static async getAll(filters: ProductFilterParams = {}) {
    const where: any = { isActive: true };

    if (filters.category && filters.category !== "all") {
      where.category = { slug: filters.category };
    }

    if (filters.material && filters.material !== "all") {
      where.material = filters.material;
    }

    if (filters.isFeatured !== undefined && filters.isFeatured !== "all") {
      where.isFeatured = String(filters.isFeatured) === "true";
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
        { sku: { contains: filters.search } },
      ];
    }

    let orderBy: any = { order: "asc" };
    if (filters.sort === "newest") orderBy = { createdAt: "desc" };
    if (filters.sort === "name") orderBy = { name: "asc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
    });

    return products.map((p) => ({
      ...p,
      categoryLabel: p.category?.name || "General",
      categorySlug: p.category?.slug || "general",
      applications: JSON.parse(p.applications || "[]"),
      features: JSON.parse(p.features || "[]"),
      specifications: JSON.parse(p.specifications || "{}"),
      galleryUrls: JSON.parse(p.galleryUrls || "[]"),
    }));
  }

  static async getAllAdmin() {
    const products = await prisma.product.findMany({
      orderBy: { order: "asc" },
      include: { category: true },
    });

    return products.map((p) => ({
      ...p,
      categoryLabel: p.category?.name || "General",
      categorySlug: p.category?.slug || "general",
      applications: JSON.parse(p.applications || "[]"),
      features: JSON.parse(p.features || "[]"),
      specifications: JSON.parse(p.specifications || "{}"),
      galleryUrls: JSON.parse(p.galleryUrls || "[]"),
    }));
  }

  static async getBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) {
      throw new ApiError(404, `Product '${slug}' not found.`);
    }

    return {
      ...product,
      categoryLabel: product.category?.name || "General",
      categorySlug: product.category?.slug || "general",
      applications: JSON.parse(product.applications || "[]"),
      features: JSON.parse(product.features || "[]"),
      specifications: JSON.parse(product.specifications || "{}"),
      galleryUrls: JSON.parse(product.galleryUrls || "[]"),
    };
  }

  static async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new ApiError(404, "Product not found.");

    return {
      ...product,
      categoryLabel: product.category?.name || "General",
      categorySlug: product.category?.slug || "general",
      applications: JSON.parse(product.applications || "[]"),
      features: JSON.parse(product.features || "[]"),
      specifications: JSON.parse(product.specifications || "{}"),
      galleryUrls: JSON.parse(product.galleryUrls || "[]"),
    };
  }

  static async create(payload: any) {
    if (!payload.name) {
      throw new ApiError(400, "Product name is required.");
    }

    let categoryId = payload.categoryId;
    if (!categoryId && payload.category) {
      const cat = await prisma.category.findFirst({
        where: {
          OR: [
            { id: payload.category },
            { slug: payload.category },
            { name: payload.category },
          ],
        },
      });
      if (cat) categoryId = cat.id;
    }
    if (!categoryId) {
      const firstCat = await prisma.category.findFirst();
      if (firstCat) categoryId = firstCat.id;
    }

    if (!categoryId) {
      throw new ApiError(400, "A valid product category is required.");
    }

    const slug =
      payload.slug?.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") ||
      payload.name.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError(409, `Product with slug '${slug}' already exists.`);
    }

    const created = await prisma.product.create({
      data: {
        name: payload.name,
        slug,
        sku: payload.sku || `SKU-${Date.now().toString().slice(-6)}`,
        description: payload.description || "",
        categoryId,
        material: payload.material || "TINPLATE",
        capacityRange: payload.capacityRange || "Custom",
        neckSize: payload.neckSize || null,
        factory: payload.factory || "Noor Plastic Industries",
        applications: typeof payload.applications === "string" ? payload.applications : JSON.stringify(payload.applications || []),
        features: typeof payload.features === "string" ? payload.features : JSON.stringify(payload.features || []),
        specifications: typeof payload.specifications === "string" ? payload.specifications : JSON.stringify(payload.specifications || {}),
        imageUrl: payload.imageUrl || payload.image || "/cropped/product-card-1.png",
        galleryUrls: typeof payload.galleryUrls === "string" ? payload.galleryUrls : JSON.stringify(payload.galleryUrls || []),
        tdsPdfUrl: payload.tdsPdfUrl || null,
        isFeatured: payload.isFeatured === true,
        isActive: payload.isActive !== false,
        order: Number(payload.order) || 0,
        seoTitle: payload.seoTitle || null,
        seoDescription: payload.seoDescription || null,
      },
      include: { category: true },
    });

    return {
      ...created,
      applications: JSON.parse(created.applications || "[]"),
      features: JSON.parse(created.features || "[]"),
      specifications: JSON.parse(created.specifications || "{}"),
      galleryUrls: JSON.parse(created.galleryUrls || "[]"),
    };
  }

  static async update(id: string, payload: any) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Product not found.");

    if (payload.slug && payload.slug !== existing.slug) {
      const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
      const clash = await prisma.product.findUnique({ where: { slug: cleanSlug } });
      if (clash && clash.id !== id) {
        throw new ApiError(409, `Product slug '${cleanSlug}' is already in use.`);
      }
      payload.slug = cleanSlug;
    }

    let resolvedCategoryId = payload.categoryId;
    if (!resolvedCategoryId && payload.category) {
      const cat = await prisma.category.findFirst({
        where: {
          OR: [
            { id: payload.category },
            { slug: payload.category },
            { name: payload.category },
          ],
        },
      });
      if (cat) resolvedCategoryId = cat.id;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: payload.name ?? existing.name,
        slug: payload.slug ?? existing.slug,
        sku: payload.sku ?? existing.sku,
        description: payload.description ?? existing.description,
        categoryId: resolvedCategoryId ?? existing.categoryId,
        material: payload.material ?? existing.material,
        capacityRange: payload.capacityRange ?? existing.capacityRange,
        neckSize: payload.neckSize ?? existing.neckSize,
        factory: payload.factory ?? existing.factory,
        applications: payload.applications !== undefined
          ? (typeof payload.applications === "string" ? payload.applications : JSON.stringify(payload.applications))
          : existing.applications,
        features: payload.features !== undefined
          ? (typeof payload.features === "string" ? payload.features : JSON.stringify(payload.features))
          : existing.features,
        specifications: payload.specifications !== undefined
          ? (typeof payload.specifications === "string" ? payload.specifications : JSON.stringify(payload.specifications))
          : existing.specifications,
        imageUrl: payload.imageUrl ?? payload.image ?? existing.imageUrl,
        galleryUrls: payload.galleryUrls !== undefined
          ? (typeof payload.galleryUrls === "string" ? payload.galleryUrls : JSON.stringify(payload.galleryUrls))
          : existing.galleryUrls,
        tdsPdfUrl: payload.tdsPdfUrl ?? existing.tdsPdfUrl,
        isFeatured: payload.isFeatured !== undefined ? payload.isFeatured : existing.isFeatured,
        isActive: payload.isActive !== undefined ? payload.isActive : existing.isActive,
        order: payload.order !== undefined ? Number(payload.order) : existing.order,
        seoTitle: payload.seoTitle ?? existing.seoTitle,
        seoDescription: payload.seoDescription ?? existing.seoDescription,
      },
      include: { category: true },
    });

    return {
      ...updated,
      applications: JSON.parse(updated.applications || "[]"),
      features: JSON.parse(updated.features || "[]"),
      specifications: JSON.parse(updated.specifications || "{}"),
      galleryUrls: JSON.parse(updated.galleryUrls || "[]"),
    };
  }

  static async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }

  // Categories
  static async getCategories() {
    return prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  static async createCategory(payload: any) {
    if (!payload.name) throw new ApiError(400, "Category name is required.");
    const slug =
      payload.slug?.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") ||
      payload.name.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) throw new ApiError(409, `Category '${slug}' already exists.`);

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

  static async updateCategory(id: string, payload: any) {
    return prisma.category.update({
      where: { id },
      data: payload,
    });
  }

  static async deleteCategory(id: string) {
    const productsCount = await prisma.product.count({ where: { categoryId: id } });
    if (productsCount > 0) {
      throw new ApiError(400, `Cannot delete category: ${productsCount} products are assigned to it.`);
    }
    return prisma.category.delete({ where: { id } });
  }
}
