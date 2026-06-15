import { MongoClient, type Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

function getEnvOrThrow(name: string): string {
  const env = (globalThis.process as any)?.env as Record<string, string | undefined> | undefined;
  const v = env?.[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function connect() {
  if (db) return db;

  const uri = getEnvOrThrow("MONGODB_URI");
  const databaseName = getEnvOrThrow("MONGODB_DB");

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(databaseName);
  return db;
}

export async function getAdminDb() {
  return connect();
}
