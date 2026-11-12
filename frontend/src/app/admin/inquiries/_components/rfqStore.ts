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

function normalizeRfqStatus(raw?: string): RFQItem["status"] {
  if (!raw || raw.toUpperCase() === "PENDING") return "New Inquiry";
  const matched = RFQ_STATUSES.find(
    (s) => s.toLowerCase() === raw.trim().toLowerCase()
  );
  return matched || "New Inquiry";
}

export function normalizeRfqItem(row: any): RFQItem {
  const rawDate = row?.date || row?.createdAt;
  const formattedDate = rawDate
    ? String(rawDate).slice(0, 16).replace("T", " ")
    : "—";

  return {
    id: String(row?.quoteNumber || row?.id || ""),
    company: String(row?.company || row?.companyName || "Enterprise Client"),
    contact: String(row?.contact || row?.contactPerson || row?.contactName || row?.name || "—"),
    email: String(row?.email || ""),
    phone: String(row?.phone || ""),
    category: String(row?.category || row?.productCategory || "Custom Packaging"),
    volume: String(row?.volume || row?.estimatedVolume || "—"),
    capacity: String(row?.capacity || row?.capacitySpec || "Standard"),
    date: formattedDate,
    status: normalizeRfqStatus(row?.status),
    notes: String(row?.notes || row?.message || ""),
  };
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
