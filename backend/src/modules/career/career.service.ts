import { ApiError } from "../../utils/apiError";

export interface CareerCandidate {
  id: string;
  name: string;
  position: string;
  experience: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  facility: string;
}

let careerStore: CareerCandidate[] = [
  {
    id: "APP-2026-001",
    name: "Tanvir Ahmed",
    position: "Senior Quality Assurance Engineer (Cleanroom)",
    experience: "6 Years (Pharma Packaging)",
    email: "tanvir.engr@gmail.com",
    phone: "+880 1712-456789",
    date: "2026-11-04",
    status: "New",
    facility: "Gazipur Facility",
  },
  {
    id: "APP-2026-002",
    name: "Mehedi Hasan",
    position: "High-Speed Blow Molding Technician",
    experience: "4 Years (PET Preforms)",
    email: "mehedi.tech@yahoo.com",
    phone: "+880 1819-334455",
    date: "2026-11-03",
    status: "Shortlisted",
    facility: "Tongi Plant",
  },
];

export class CareerService {
  static async getAll() {
    return careerStore;
  }

  static async getById(id: string) {
    const item = careerStore.find((c) => c.id === id);
    if (!item) {
      throw new ApiError(404, "Candidate application not found.");
    }
    return item;
  }

  static async create(payload: Partial<CareerCandidate>) {
    if (!payload.name || !payload.email || !payload.position) {
      throw new ApiError(400, "Name, email, and position are required.");
    }

    const newApp: CareerCandidate = {
      id: `APP-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: payload.name,
      position: payload.position,
      experience: payload.experience || "1-3 Years",
      email: payload.email,
      phone: payload.phone || "Not Provided",
      date: new Date().toISOString().slice(0, 10),
      status: "New",
      facility: payload.facility || "Gazipur Facility",
    };

    careerStore.unshift(newApp);
    return newApp;
  }

  static async updateStatus(id: string, status: string) {
    const candidate = await this.getById(id);
    candidate.status = status;
    return candidate;
  }

  static async delete(id: string) {
    const index = careerStore.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new ApiError(404, "Candidate application not found.");
    }
    return careerStore.splice(index, 1)[0];
  }
}

