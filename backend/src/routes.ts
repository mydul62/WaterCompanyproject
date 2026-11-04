import { Router, Request, Response } from "express";

const router = Router();

// Products endpoint
router.get("/products", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: "prod-1",
        name: "Industrial Paint & Chemical Pail (Q Pail)",
        category: "Pails & Drums",
        material: "Virgin HDPE",
        capacityRange: "1L - 25L",
      },
      {
        id: "prod-2",
        name: "Aerosol & High-Pressure Tin Container",
        category: "Tin Cans",
        material: "Electrolytic Tinplate (ETP)",
        capacityRange: "150ml - 750ml",
      },
    ],
  });
});

// RFQ submission endpoint
router.post("/rfq", (req: Request, res: Response) => {
  const { companyName, contactPerson, email, phone, category, volume } = req.body;
  const quoteNumber = `RFQ-2026-XCL-${Math.floor(1000 + Math.random() * 9000)}`;

  res.status(201).json({
    success: true,
    message: "Request for Quotation registered successfully",
    quoteNumber,
    receivedAt: new Date().toISOString(),
  });
});

export default router;

