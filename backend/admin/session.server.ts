import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createAdminSession, requireAdminSession, verifyAdminLogin } from "./auth.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const ok = verifyAdminLogin({ username: data.username, password: data.password });
    if (!ok) throw new Error("Invalid credentials");
    const session = createAdminSession({ username: data.username });
    return session;
  });

export const adminVerifySession = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const session = requireAdminSession(data.token);
    if (!session) throw new Error("Unauthorized");
    return { username: session.username, createdAt: session.createdAt };
  });
