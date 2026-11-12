export interface AnalyticsTelemetry {
  activeProducts: number;
  totalRfqs: number;
  pendingRfqs: number;
  annualCapacity: string;
  leedStandard: string;
  operationalFacilities: string[];
  systemHealth: string;
}

export interface AnalyticsStats {
  totalRevenue: string;
  productionEfficiency: string;
  activeClients: number;
  exportMarkets: string[];
}

export interface AnalyticsOverviewResponse {
  telemetry: AnalyticsTelemetry;
  stats: AnalyticsStats;
}

