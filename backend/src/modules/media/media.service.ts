import { ApiError } from "../../utils/apiError";

export interface MediaStory {
  id: string;
  title: string;
  banglaTitle: string;
  newspaper: string;
  date: string;
  summary: string;
  highlightQuote: string;
  image: string;
  tag: string;
}

let mediaStore: MediaStory[] = [
  {
    id: "story-1",
    title: "Nasir's Packaging Enterprise Crosses 100-Crore Milestone",
    banglaTitle: "নাসিরের ব্যবসা এখন শতকোটি টাকার",
    newspaper: "The Daily Prothom Alo",
    date: "Special Industrial Report",
    summary:
      "A deep-dive investigation into how visionary entrepreneur Nasir built Xclusive Can Limited from an ambitious local workshop into Bangladesh's leading packaging powerhouse.",
    highlightQuote:
      "From struggling beginnings to establishing a 100-crore state-of-the-art packaging benchmark with LEED Platinum certification.",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Founder's Journey",
  },
];

export class MediaService {
  static async getAll() {
    return mediaStore;
  }

  static async getById(id: string) {
    const story = mediaStore.find((s) => s.id === id);
    if (!story) {
      throw new ApiError(404, "Story not found.");
    }
    return story;
  }

  static async create(payload: Partial<MediaStory>) {
    if (!payload.title || !payload.newspaper) {
      throw new ApiError(400, "Title and newspaper are required.");
    }

    const newStory: MediaStory = {
      id: `story-${Date.now()}`,
      title: payload.title,
      banglaTitle: payload.banglaTitle || payload.title,
      newspaper: payload.newspaper,
      date: payload.date || "Special Industrial Report",
      summary: payload.summary || "",
      highlightQuote: payload.highlightQuote || "",
      image: payload.image || "/Infoimages/Screenshot 2026-11-04 130333.png",
      tag: payload.tag || "Milestone",
    };

    mediaStore.unshift(newStory);
    return newStory;
  }

  static async update(id: string, payload: Partial<MediaStory>) {
    const index = mediaStore.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new ApiError(404, "Story not found to update.");
    }

    mediaStore[index] = {
      ...mediaStore[index],
      ...payload,
    };
    return mediaStore[index];
  }

  static async delete(id: string) {
    const index = mediaStore.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new ApiError(404, "Story not found to delete.");
    }
    return mediaStore.splice(index, 1)[0];
  }
}

