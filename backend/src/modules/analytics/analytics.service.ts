import { ProductService } from "../product/product.service";
import { RFQService } from "../rfq/rfq.service";
import { AnalyticsOverviewResponse } from "./analytics.interface";

export class AnalyticsService {
  static async getOverview(): Promise<AnalyticsOverviewResponse> {
    const products = await ProductService.getAll();
    const { rfqs } = await RFQService.getAll();

    const pendingRfqs = rfqs.filter((r) => r.status === "New Inquiry" || r.status === "PENDING").length;

    return {
      telemetry: {
        activeProducts: products.length,
        totalRfqs: rfqs.length,
        pendingRfqs,
        annualCapacity: "500 Million Containers",
        leedStandard: "LEED Platinum (USGBC)",
        operationalFacilities: ["Latifpur-B, Kaliakoir-1750, Gazipur"],
        systemHealth: "100% Operational",
      },
      stats: {
        totalRevenue: "$4,850,000",
        productionEfficiency: "98.4%",
        activeClients: 142,
        exportMarkets: ["India", "UAE", "Sri Lanka", "Myanmar", "Kenya"],
      },
    };
  }
}

