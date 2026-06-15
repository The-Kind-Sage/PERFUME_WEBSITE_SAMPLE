import fs from "fs";
import path from "path";
import server from "../dist/server/server.js";

export const config = { runtime: "nodejs" };

const CLIENT_DIR = path.resolve(process.cwd(), "dist", "client");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
};

function serveStatic(urlPath: string, res: any): boolean {
  if (urlPath === "/" || urlPath.startsWith("/api")) return false;
  const filePath = path.resolve(CLIENT_DIR, urlPath.replace(/^\/+/, ""));
  if (!filePath.startsWith(CLIENT_DIR + path.sep)) return false;
  if (!fs.existsSync(filePath)) return false;
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return false;
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const content = fs.readFileSync(filePath);
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Length", String(stat.size));
  if (contentType.startsWith("image/") || ext === ".js" || ext === ".css") {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  }
  res.status(200);
  res.end(content);
  return true;
}

async function readBody(req: any): Promise<Uint8Array | null> {
  if (req.method === "GET" || req.method === "HEAD") return null;

  if (req.body) {
    if (typeof req.body === "string") return new TextEncoder().encode(req.body);
    if (req.body instanceof Uint8Array) return req.body;

    const NodeBuffer = (globalThis as any).Buffer;
    if (NodeBuffer?.isBuffer?.(req.body)) {
      return new Uint8Array(req.body);
    }
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(
      typeof chunk === "string"
        ? new TextEncoder().encode(chunk)
        : new Uint8Array(chunk),
    );
  }
  if (!chunks.length) return null;

  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

export default async function handler(req: any, res: any) {
  const pathname = req.url ? new URL(req.url, `http://localhost`).pathname : "/";

  if (serveStatic(pathname, res)) return;

  const host = req.headers?.host ?? "localhost";
  const proto = req.headers?.["x-forwarded-proto"] ?? "https";
  const path = req.url?.startsWith("/") ? req.url : `/${req.url}`;
  const url = `${proto}://${host}${path}`;

  const headers = new Headers(req.headers ?? {});
  const body = await readBody(req);

  const request = new Request(url, {
    method: req.method,
    headers,
    body: body ? (body as any) : undefined,
  });

  const env = (globalThis as any).process?.env ?? {};
  const response: Response = await (server as any).fetch(request, env, {});

  res.status(response.status);
  response.headers.forEach((value: string, key: string) => res.setHeader(key, value));

  const respBody = new Uint8Array(await response.arrayBuffer());
  const NodeBuffer = (globalThis as any).Buffer;
  if (NodeBuffer) {
    res.send(NodeBuffer.from(respBody));
    return;
  }

  res.end(respBody);
}
