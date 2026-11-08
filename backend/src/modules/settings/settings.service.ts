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

  static async updateBatch(payload: Record<string, string>) {
    const keys = Object.keys(payload);
    for (const key of keys) {
      const val = payload[key];
      let category = "GENERAL";
      if (key.includes("logo") || key.includes("name") || key.includes("tagline") || key.includes("brand")) {
        category = "BRANDING";
      } else if (key.includes("phone") || key.includes("email") || key.includes("headquarter") || key.includes("plant")) {
        category = "CONTACT";
      } else if (key.includes("social") || key.includes("facebook") || key.includes("youtube") || key.includes("linkedin")) {
        category = "SOCIAL";
      } else if (key.includes("seo") || key.includes("meta")) {
        category = "SEO";
      } else if (key.includes("footer") || key.includes("copyright")) {
        category = "FOOTER";
      }

      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(val), category },
        create: { key, value: String(val), category, isPublic: true },
      });
    }

    return this.getAll();
  }
}
