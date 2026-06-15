/**
 * Legacy storage layer (local JSON store).
 * The admin backend now persists to MongoDB Atlas (see `mongo.server.ts`).
 *
 * This module is kept only to avoid breaking older imports during migration.
 */
export type StoreShape = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    createdAt: string;
  }>;
};

export function readStore(): StoreShape {
  throw new Error("Legacy local JSON storage is disabled. Use MongoDB (mongo.server.ts).");
}

export function writeStore(_: StoreShape) {
  throw new Error("Legacy local JSON storage is disabled. Use MongoDB (mongo.server.ts).");
}
