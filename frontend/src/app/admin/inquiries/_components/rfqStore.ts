export interface RFQItem {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  category: string;
  volume: string;
  capacity: string;
  date: string;
  status:
    | "New Inquiry"
    | "Technical Review"
    | "Sample Dispatched"
    | "Quotation Sent"
    | "Closed Won";
  notes?: string;
}

export const RFQ_STATUSES: RFQItem["status"][] = [
  "New Inquiry",
  "Technical Review",
  "Sample Dispatched",
  "Quotation Sent",
  "Closed Won",
];

export const INITIAL_RFQS: RFQItem[] = [
  {
    id: "RFQ-2026-XCL-8841",
    company: "Berger Paints Bangladesh Ltd.",
    contact: "Engr. Shamimur Rahman",
    email: "shamim.rahman@bergerbd.com",
    phone: "+880 1711-234567",
    category: "Industrial Plastic Pails & Buckets",
    volume: "120,000 units/year",
    capacity: "20 Liters & 4 Liters",
    date: "2026-11-04 14:30",
    status: "New Inquiry",
    notes: "Requires UN certification for export-grade solvent-based emulsion paint.",
  },
  {
    id: "RFQ-2026-XCL-8839",
    company: "Square Pharmaceuticals Ltd.",
    contact: "Dr. Farhana Yasmin",
    email: "f.yasmin@squarepharma.com.bd",
    phone: "+880 1819-876543",
    category: "Pharma Droppers & Jars",
    volume: "250,000 units/year",
    capacity: "10ml Calibrated Dropper",
    date: "2026-11-04 11:15",
    status: "Technical Review",
    notes: "Cleanroom Class 100,000 protocol required. Gamma radiation test certificate requested.",
  },
  {
    id: "RFQ-2026-XCL-8835",
    company: "Akij Food & Beverage Ltd.",
    contact: "Zahid Hasan",
    email: "zahid.hasan@akij.net",
    phone: "+880 1912-345678",
    category: "PET Beverage Bottles",
    volume: "500,000 units/year",
    capacity: "500ml Crystal PET",
    date: "2026-11-03 16:45",
    status: "Sample Dispatched",
    notes: "Sample batch of 50 preforms sent via Gazipur express courier.",
  },
  {
    id: "RFQ-2026-XCL-8828",
    company: "Dulux / AkzoNobel Bangladesh",
    contact: "Kamrul Islam",
    email: "kamrul.islam@akzonobel.com",
    phone: "+880 1680-112233",
    category: "Tin Cans & Aerosols",
    volume: "80,000 units/year",
    capacity: "1 Liter Paint Tin",
    date: "2026-11-02 10:20",
    status: "Quotation Sent",
    notes: "Official price breakdown per thousand units provided. Awaiting commercial sign-off.",
  },
  {
    id: "RFQ-2026-XCL-8819",
    company: "Marico Bangladesh Limited",
    contact: "Nusrat Jahan",
    email: "nusrat.jahan@marico.com",
    phone: "+880 1714-998877",
    category: "Plastic Bottles",
    volume: "350,000 units/year",
    capacity: "200ml Hair Oil Bottle",
    date: "2026-10-31 09:00",
    status: "Closed Won",
    notes: "Annual master contract executed for Kaliakoir plant supply line.",
  },
];

const LOCAL_RFQS_KEY = "noor_admin_rfqs_v1";

export function getLocalRfqs(): RFQItem[] {
  if (typeof window === "undefined") return INITIAL_RFQS;
  try {
    const raw = window.localStorage.getItem(LOCAL_RFQS_KEY);
    if (!raw) return INITIAL_RFQS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return INITIAL_RFQS;
}

export function saveLocalRfqs(items: RFQItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_RFQS_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
}

export function getStatusBadge(status: RFQItem["status"]): string {
  switch (status) {
    case "New Inquiry":
      return "bg-blue-950 text-cyan-400 border border-cyan-800/60";
    case "Technical Review":
      return "bg-amber-950 text-amber-400 border border-amber-800/60";
    case "Sample Dispatched":
      return "bg-emerald-950 text-emerald-400 border border-emerald-800/60";
    case "Quotation Sent":
      return "bg-purple-950 text-purple-400 border border-purple-800/60";
    case "Closed Won":
      return "bg-green-950 text-green-300 border border-green-700/80 font-black";
  }
}

