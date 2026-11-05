import { ApiError } from "../../utils/apiError";

export interface SliderItem {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  tagline: string;
  image: string;
  order: number;
  isActive: boolean;
}

let sliderStore: SliderItem[] = [
  {
    id: "slide-1",
    badge: "100% Recyclable • USGBC Benchmark",
    title: "Eco-Friendly Tin Cans & Pails",
    highlight: "LEED Platinum",
    tagline:
      "Green, eco-friendly metal & plastic packaging solutions engineered for safety, purity, and circular sustainability.",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    order: 1,
    isActive: true,
  },
  {
    id: "slide-2",
    badge: "Food Grade • Zero Contamination",
    title: "Precision Plastic Bottles & Jars",
    highlight: "Ultra Purity",
    tagline:
      "Cleanroom Class 100,000 certified pharmaceutical containers, PET mineral water bottles, and calibrated dropper tips.",
    image: "/Infoimages/Screenshot 2026-11-04 130237.png",
    order: 2,
    isActive: true,
  },
  {
    id: "slide-3",
    badge: "Heavy Duty • Chemical Resistant",
    title: "Industrial Q Pail Heavy Containers",
    highlight: "Impact Armor",
    tagline:
      "Engineered for Asian Paints, Berger, and lubricant brands with airtight triple-seal snap lids and heavy-duty steel handles.",
    image: "/Infoimages/Screenshot 2026-11-04 130325.png",
    order: 3,
    isActive: true,
  },
];

export class SliderService {
  static async getAll() {
    return sliderStore.sort((a, b) => a.order - b.order);
  }

  static async getById(id: string) {
    const slide = sliderStore.find((s) => s.id === id);
    if (!slide) {
      throw new ApiError(404, "Slide not found.");
    }
    return slide;
  }

  static async create(payload: Partial<SliderItem>) {
    if (!payload.title || !payload.highlight) {
      throw new ApiError(400, "Title and highlight text are required.");
    }

    const newSlide: SliderItem = {
      id: `slide-${Date.now()}`,
      badge: payload.badge || "Industrial Packaging",
      title: payload.title,
      highlight: payload.highlight,
      tagline: payload.tagline || "",
      image: payload.image || "/Infoimages/Screenshot 2026-11-04 130154.png",
      order: payload.order || sliderStore.length + 1,
      isActive: payload.isActive !== undefined ? payload.isActive : true,
    };

    sliderStore.push(newSlide);
    return newSlide;
  }

  static async update(id: string, payload: Partial<SliderItem>) {
    const index = sliderStore.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new ApiError(404, "Slide not found to update.");
    }

    sliderStore[index] = {
      ...sliderStore[index],
      ...payload,
    };
    return sliderStore[index];
  }

  static async delete(id: string) {
    const index = sliderStore.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new ApiError(404, "Slide not found to delete.");
    }
    return sliderStore.splice(index, 1)[0];
  }
}

