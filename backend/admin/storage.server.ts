import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "backend", "admin", "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

type StoreShape = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    createdAt: string;
  }>;
};

function defaultStore(): StoreShape {
  return { products: [] };
}

export function readStore(): StoreShape {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) return defaultStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return { ...defaultStore(), ...(JSON.parse(raw) as Partial<StoreShape>) };
}

export function writeStore(next: StoreShape) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
}
