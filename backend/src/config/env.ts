import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const candidateEnvPaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "backend", ".env"),
  path.resolve(__dirname, "..", "..", ".env"),
  path.resolve(__dirname, "..", "..", "..", ".env"),
];

const envPath = candidateEnvPaths.find((p) => fs.existsSync(p));
dotenv.config(envPath ? { path: envPath } : undefined);

const isProd = process.env.NODE_ENV === "production";

function parseDurationToMs(raw: string | undefined, fallbackMs: number): number {
  if (!raw) return fallbackMs;
  const match = String(raw).trim().match(/^(\d+)\s*(ms|s|m|h|d)?$/i);
  if (!match) return fallbackMs;
  const value = Number(match[1]);
  const unit = (match[2] || "s").toLowerCase();
  const mult: Record<string, number> = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return Number.isFinite(value) && value > 0 ? value * (mult[unit] || 1000) : fallbackMs;
}

if (isProd && !process.env.JWT_SECRET) {
  console.error("[SECURITY] FATAL: JWT_SECRET environment variable is not set in production.");
}

export function getUploadsDir(): string {
  const candidates = [
    path.resolve(__dirname, "..", ".."),
    path.resolve(__dirname, "..", "..", ".."),
    path.resolve(process.cwd(), "backend"),
    process.cwd(),
  ];
  const backendRoot =
    candidates.find(
      (dir) =>
        fs.existsSync(path.join(dir, "package.json")) &&
        fs.existsSync(path.join(dir, "prisma", "schema.prisma"))
    ) || process.cwd();
  return path.join(backendRoot, "public", "uploads");
}

const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "12h";

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || (isProd ? "" : "waterweb_local_dev_jwt_secret_change_me"),
  JWT_EXPIRES_IN: jwtExpiresIn,
  AUTH_COOKIE_MAX_AGE_MS: parseDurationToMs(jwtExpiresIn, 12 * 60 * 60 * 1000),
  FRONTEND_URL:
    process.env.FRONTEND_URL ||
    (isProd ? "https://watercompany-frontend.vercel.app" : "http://localhost:3000"),
  CORS_ORIGINS: process.env.CORS_ORIGINS || "",
  BACKEND_BASE_URL:
    process.env.BACKEND_BASE_URL ||
    (isProd ? "https://watercompany-backend.vercel.app" : "http://localhost:5000"),
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || "waterweb",
};

