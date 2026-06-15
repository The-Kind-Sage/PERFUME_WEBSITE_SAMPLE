import crypto from "crypto";

type AdminSession = {
  token: string;
  username: string;
  createdAt: string;
};

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getEnvOrThrow(name: string): string {
  const env = (globalThis.process as any)?.env as Record<string, string | undefined> | undefined;
  const v = env?.[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function hashPassword(password: string) {
  // SHA256 is used only to avoid storing plaintext; for production use bcrypt/argon2.
  return crypto.createHash("sha256").update(password).digest("hex");
}

function createToken(payload: object) {
  const secret = getEnvOrThrow("ADMIN_SESSION_SECRET");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyToken(token: string) {
  const secret = getEnvOrThrow("ADMIN_SESSION_SECRET");
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  if (!timingSafeEqual(sig, expected)) return null;

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf-8")) as AdminSession;
  } catch {
    return null;
  }
}

export function verifyAdminLogin({ username, password }: { username: string; password: string }) {
  const expectedUsername = getEnvOrThrow("ADMIN_USERNAME");
  const expectedPasswordHash = getEnvOrThrow("ADMIN_PASSWORD_HASH");

  if (username !== expectedUsername) return false;
  return hashPassword(password) === expectedPasswordHash;
}

export function createAdminSession({ username }: { username: string }) {
  const session: AdminSession = {
    token: "pending",
    username,
    createdAt: new Date().toISOString(),
  };
  const token = createToken(session);
  return { token };
}

export function requireAdminSession(token: string | undefined | null) {
  if (!token) return null;
  return verifyToken(token);
}
