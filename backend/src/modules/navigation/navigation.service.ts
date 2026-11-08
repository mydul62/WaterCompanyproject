import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";

export class NavigationService {
  static async getByLocation(location: string) {
    const menu = await prisma.navigationMenu.findUnique({
      where: { location },
      include: {
        items: {
          where: { parentId: null, isVisible: true },
          orderBy: { order: "asc" },
          include: {
            children: {
              where: { isVisible: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    if (!menu) {
      throw new ApiError(404, `Navigation menu for location '${location}' not found.`);
    }

    return menu;
  }

  static async getAllMenus() {
    return prisma.navigationMenu.findMany({
      include: {
        items: {
          where: { parentId: null },
          orderBy: { order: "asc" },
          include: {
            children: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
  }

  static async createMenu(name: string, location: string) {
    const existing = await prisma.navigationMenu.findUnique({ where: { location } });
    if (existing) throw new ApiError(409, `Menu location '${location}' already exists.`);

    return prisma.navigationMenu.create({
      data: { name, location, isPublished: true },
    });
  }

  static async updateMenu(id: string, payload: { name?: string; isPublished?: boolean }) {
    return prisma.navigationMenu.update({
      where: { id },
      data: payload,
    });
  }

  static async saveMenuItems(menuId: string, items: any[]) {
    const menu = await prisma.navigationMenu.findUnique({ where: { id: menuId } });
    if (!menu) throw new ApiError(404, "Menu not found.");

    // Delete existing items for clean tree synchronization
    await prisma.navigationItem.deleteMany({ where: { menuId } });

    // Insert root and children
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const parent = await prisma.navigationItem.create({
        data: {
          menuId,
          label: item.label,
          url: item.url,
          target: item.target || "_self",
          order: i + 1,
          iconName: item.iconName || null,
          badgeText: item.badgeText || null,
          badgeColor: item.badgeColor || null,
          description: item.description || null,
          isVisible: item.isVisible !== false,
        },
      });

      if (Array.isArray(item.children) && item.children.length > 0) {
        for (let j = 0; j < item.children.length; j++) {
          const child = item.children[j];
          await prisma.navigationItem.create({
            data: {
              menuId,
              parentId: parent.id,
              label: child.label,
              url: child.url,
              target: child.target || "_self",
              order: j + 1,
              iconName: child.iconName || null,
              badgeText: child.badgeText || null,
              badgeColor: child.badgeColor || null,
              description: child.description || null,
              isVisible: child.isVisible !== false,
            },
          });
        }
      }
    }

    return this.getAllMenus();
  }

  static async deleteMenu(id: string) {
    return prisma.navigationMenu.delete({ where: { id } });
  }
}

