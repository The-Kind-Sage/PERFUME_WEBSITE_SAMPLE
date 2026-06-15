import server from "../dist/server/server.js";

export const config = { runtime: "nodejs20.x" };

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
