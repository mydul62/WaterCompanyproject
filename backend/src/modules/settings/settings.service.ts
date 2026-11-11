import { prisma } from "../../config/prisma";

export class SettingsService {
  static async getAll() {
    const records = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });

    const settingsMap: Record<string, string> = {};
    for (const r of records) {
      settingsMap[r.key] = r.value;
    }

    return {
      records,
      settings: settingsMap,
    };
  }

  static async getPublic() {
    const records = await prisma.siteSetting.findMany({
      where: { isPublic: true },
    });

    const publicMap: Record<string, string> = {};
    for (const r of records) {
      publicMap[r.key] = r.value;
    }
    return publicMap;
  }

  static async updateBatch(
    payload: Record<string, string> | { settings: { key: string; value: string }[] }
  ) {
    const normalizedMap: Record<string, string> = {};
    if (Array.isArray((payload as any)?.settings)) {
      for (const item of (payload as any).settings) {
        if (item?.key) {
          normalizedMap[item.key] = String(item.value ?? "");
        }
      }
    } else {
      for (const [k, v] of Object.entries(payload as Record<string, string>)) {
        normalizedMap[k] = String(v ?? "");
      }
    }

    const keys = Object.keys(normalizedMap);
    for (const key of keys) {
      const val = normalizedMap[key];
      let category = "GENERAL";
      if (key.includes("footer") || key.includes("copyright") || key.includes("developer")) {
        category = "FOOTER";
      } else if (key.includes("logo") || key.includes("name") || key.includes("tagline") || key.includes("brand")) {
        category = "BRANDING";
      } else if (key.includes("phone") || key.includes("email") || key.includes("headquarter") || key.includes("plant")) {
        category = "CONTACT";
      } else if (key.includes("social") || key.includes("facebook") || key.includes("youtube") || key.includes("linkedin")) {
        category = "SOCIAL";
      } else if (key.includes("seo") || key.includes("meta")) {
        category = "SEO";
      }

      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(val), category, isPublic: true },
        create: { key, value: String(val), category, isPublic: true },
      });
    }

    return this.getAll();
  }
}
