import crypto from "crypto";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminDb } from "./mongo.server";

import { requireAdminSession } from "./auth.server";

export const listProducts = createServerFn({ method: "POST" })
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
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const products = docs.map((d) => ({
      id: String(d.id),
      name: String(d.name),
      price: Number(d.price),
      imageUrl: d.imageUrl ? String(d.imageUrl) : undefined,
      createdAt: String(d.createdAt),
    }));

    return { products };
  });

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
      name: z.string().min(1),
      price: z.number().nonnegative(),
      imageUrl: z.string().url().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = requireAdminSession(data.token);
    if (!session) throw new Error("Unauthorized");

    const db = await getAdminDb();
    const product = {
      id: crypto.randomUUID(),
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
      createdAt: new Date().toISOString(),
    };

    await db.collection("products").insertOne(product);

    return { product };
  });
