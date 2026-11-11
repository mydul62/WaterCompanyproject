import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { appRouter } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { ENV } from "./config/env";

export const app: Application = express();

// Security and parsing middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        ENV.FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:3001",
      ];
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Allow client requests
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static uploads directory fallback
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

// Root Info Endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    service: "Noor Plastic Industries Platform REST API",
    status: "online",
    version: "1.0.0",
    headquarters: "Latifpur-B, Kaliakoir-1750, Gazipur, Dhaka, Bangladesh",
    certifications: ["Trade License #242501300583", "BIN 007122199-1205", "ISO 9001:2015", "BSTI Food Grade"],
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "waterweb-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes mounted on both /api/v1 and /api for backward compatibility
app.use("/api/v1", appRouter);
app.use("/api", appRouter);

// Global Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
