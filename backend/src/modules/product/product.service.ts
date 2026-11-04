import { ApiError } from "../../utils/apiError";

export interface ProductItem {
  id: string;
  name: string;
  slug?: string;
  category: string;
  categoryLabel: string;
  material: string;
  capacityRange: string;
  factory: string;
  applications: string[];
  description: string;
  isActive: boolean;
  image: string;
}

let productsStore: ProductItem[] = [
  {
    id: "prod-1",
    name: "Industrial Paint & Chemical Pail (Q Pail)",
    slug: "industrial-paint-chemical-pail-q-pail",
    category: "pail-bucket",
    categoryLabel: "Pails & Drums",
    material: "Virgin HDPE / Impact Copolymer PP",
    capacityRange: "1 Liter - 25 Liters",
    factory: "Q Pail Limited",
    applications: ["Emulsion Paints", "Industrial Inks", "Lubricants", "Adhesives"],
    description: "Heavy-duty plastic pail with reinforced ribs, airtight gasket lid, and steel handle with plastic grip.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
  },
  {
    id: "prod-2",
    name: "Aerosol & High-Pressure Tin Container",
    slug: "aerosol-high-pressure-tin-container",
    category: "tin-can",
    categoryLabel: "Tin Cans",
    material: "Electrolytic Tinplate (ETP)",
    capacityRange: "150ml - 750ml",
    factory: "Xclusive Can Limited",
    applications: ["Insecticides", "Air Fresheners", "Spray Paints", "Automotive Polish"],
    description: "Three-piece welded aerosol tinplate cans tested up to 18 bar burst pressure with epoxy-phenolic internal lacquer.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
  },
  {
    id: "prod-3",
    name: "Pharmaceutical Dropper & Eye Drop Bottle",
    slug: "pharmaceutical-dropper-eye-drop-bottle",
    category: "jar-dropper",
    categoryLabel: "Bottles & Jars",
    material: "Medical Grade Low-Density Polyethylene (LDPE)",
    capacityRange: "5ml - 30ml",
    factory: "Xclusive Can Limited",
    applications: ["Ophthalmic Solutions", "Nasal Sprays", "Herbal Drops"],
    description: "Produced in cleanroom Class 100,000 environment with precise drop volume tip and child-resistant cap.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130325.png",
  },
  {
    id: "prod-4",
    name: "Crystal Clear PET Beverage & Water Bottle",
    slug: "crystal-clear-pet-beverage-water-bottle",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "100% Virgin Food-Grade PET",
    capacityRange: "250ml - 2000ml",
    factory: "Xclusive Can Limited",
    applications: ["Mineral Water", "Carbonated Beverages", "Fruit Juices"],
    description: "Lightweight blow-molded PET bottle with high carbonation barrier and crystal optical clarity.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130237.png",
  },
  {
    id: "prod-cat-1",
    name: "Pharmaceutical Bottle (100ml)",
    slug: "pharmaceutical-bottle-100ml",
    category: "plastic-bottle",
    categoryLabel: "Bottles & Jars",
    material: "100% Food-Grade Virgin HDPE",
    capacityRange: "100 ml",
    factory: "Xclusive Can Limited",
    applications: ["Pharmaceutical", "Radiant Pharma"],
    description: "100 ml HDPE Pharmaceuticals Bottle made with food grade virgin material.",
    isActive: true,
    image: "/images/catalog/cat-prod-1.png",
  },
  {
    id: "prod-cat-2",
    name: "Liquid Washing Container (1L-2L)",
    slug: "liquid-washing-container-1l-2l",
    category: "pail-bucket",
    categoryLabel: "Pails & Drums",
    material: "High-Density Polyethylene (HDPE)",
    capacityRange: "1000 ml - 2000 ml",
    factory: "Q Pail Limited",
    applications: ["Home Care", "Liquid Detergent"],
    description: "HDPE Washing Powder Container For Home care usage.",
    isActive: true,
    image: "/images/catalog/cat-prod-2.png",
  },
  {
    id: "prod-cat-3",
    name: "Vitamin Container (26 gm)",
    slug: "vitamin-container-26gm",
    category: "jar-dropper",
    categoryLabel: "Bottles & Jars",
    material: "Pharmaceutical Virgin HDPE",
    capacityRange: "26 gm",
    factory: "Xclusive Can Limited",
    applications: ["Radiant Pharma", "Healthcare"],
    description: "26 gm Container (Menacal-D) with Cap for Pharmaceutical uses. It is used for Radiant Pharma.",
    isActive: true,
    image: "/images/catalog/cat-prod-3.png",
  },
  {
    id: "prod-cat-7",
    name: "Chemical Bottle (500 ML)",
    slug: "chemical-bottle-500ml",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "HDPE Chemical Resistant Resin",
    capacityRange: "500 ml",
    factory: "Xclusive Can Limited",
    applications: ["Samuda Chemical Industries", "Industrial Reagents"],
    description: "500 ML Chemical Bottle uses for Samuda Chemical Industries.",
    isActive: true,
    image: "/images/catalog/cat-prod-7.png",
  },
  {
    id: "prod-cat-8",
    name: "Double Handle Can (4.8L)",
    slug: "double-handle-can-4-8l",
    category: "pail-bucket",
    categoryLabel: "Jerrycans & Drums",
    material: "Industrial Heavy HDPE",
    capacityRange: "4.8 Liter",
    factory: "Q Pail Limited",
    applications: ["Automotive Oil", "Industrial Solvents"],
    description: "4.8 Ltr Double Handle HDPE jerry Can.",
    isActive: true,
    image: "/images/catalog/cat-prod-8.png",
  },
];

export class ProductService {
  static async getAll(query: {
    category?: string;
    factory?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    let list = [...productsStore];

    if (query.category && query.category !== "all") {
      list = list.filter((p) => p.category === query.category);
    }
    if (query.factory && query.factory !== "all") {
      list = list.filter((p) => p.factory === query.factory);
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      products: paginated,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  static async getById(id: string) {
    const product = productsStore.find((p) => p.id === id);
    if (!product) {
      throw new ApiError(404, "Product not found.");
    }
    return product;
  }

  static async getBySlug(slug: string) {
    const product = productsStore.find((p) => p.slug === slug || p.id === slug);
    if (!product) {
      throw new ApiError(404, "Product not found.");
    }
    return product;
  }

  static async create(payload: Partial<ProductItem>) {
    if (!payload.name || !payload.description) {
      throw new ApiError(400, "Product name and description are required.");
    }

    const slug =
      payload.slug ||
      payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      name: payload.name,
      slug,
      category: payload.category || "plastic-bottle",
      categoryLabel: payload.categoryLabel || "Plastic Bottles",
      material: payload.material || "Virgin HDPE",
      capacityRange: payload.capacityRange || "Standard",
      factory: payload.factory || "Xclusive Can Limited",
      applications: payload.applications || ["Industrial Packaging", "Consumer Goods"],
      description: payload.description,
      isActive: payload.isActive !== undefined ? payload.isActive : true,
      image: payload.image || "/cropped/product-card-1.png",
    };

    productsStore.unshift(newProduct);
    return newProduct;
  }

  static async update(id: string, payload: Partial<ProductItem>) {
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new ApiError(404, "Product not found to update.");
    }

    productsStore[index] = {
      ...productsStore[index],
      ...payload,
    };

    return productsStore[index];
  }

  static async delete(id: string) {
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new ApiError(404, "Product not found to delete.");
    }

    const deleted = productsStore.splice(index, 1)[0];
    return deleted;
  }

  static async toggleStatus(id: string) {
    const product = await this.getById(id);
    product.isActive = !product.isActive;
    return product;
  }
}
