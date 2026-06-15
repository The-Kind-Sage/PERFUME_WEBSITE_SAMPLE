import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Buffer } from "buffer";

import { requireAdminSession } from "./auth.server";
import { getAdminDb } from "./mongo.server";

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images", "admin");

function ensureDir() {
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

function safeFileExt(maybeFilename: string | undefined) {
  const fallback = "jpg";
  if (!maybeFilename) return fallback;
  const idx = maybeFilename.lastIndexOf(".");
  if (idx === -1) return fallback;
  const ext = maybeFilename.slice(idx + 1).toLowerCase();
  if (!/^[a-z0-9]+$/.test(ext)) return fallback;
  return ext;
}

export const listImages = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const session = requireAdminSession(data.token);
    if (!session) throw new Error("Unauthorized");

    const db = await getAdminDb();
    const docs = await db
      .collection("images")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const images = docs
      .map((d) => (d.imageUrl ? String(d.imageUrl) : undefined))
      .filter(Boolean) as string[];

    return { images };
  });

/**
 * Upload image as base64 (client will read File using FileReader).
 * Returns an image URL under /images/admin/...
 */
export const uploadImage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
      filename: z.string().optional(),
      contentBase64: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const session = requireAdminSession(data.token);
    if (!session) throw new Error("Unauthorized");

    ensureDir();

    const ext = safeFileExt(data.filename);
    const id = crypto.randomUUID();
    const outFilename = `${id}.${ext}`;
    const outPath = path.join(PUBLIC_IMAGES_DIR, outFilename);

    const buf = Buffer.from(data.contentBase64, "base64");
    fs.writeFileSync(outPath, buf);

    const imageUrl = `/images/admin/${outFilename}`;

    const db = await getAdminDb();
    await db.collection("images").insertOne({
      id,
      filename: data.filename ?? null,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return { imageUrl };
  });
