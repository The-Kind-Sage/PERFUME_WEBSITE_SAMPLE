import crypto from "crypto";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { readStore, writeStore } from "./storage.server";
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

    const store = readStore();
    return { products: store.products };
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

    const store = readStore();
    const product = {
      id: crypto.randomUUID(),
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
      createdAt: new Date().toISOString(),
    };

    writeStore({ ...store, products: [product, ...store.products] });

    return { product };
  });
