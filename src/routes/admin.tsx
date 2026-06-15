import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { adminLogin, adminVerifySession } from "../../backend/admin/session.server";
import { listProducts, createProduct } from "../../backend/admin/products.server";
import { uploadImage } from "../../backend/admin/images.server";

const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [sessionOk, setSessionOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Products form
  const [products, setProducts] = useState<Product[]>([]);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState<number>(0);
  const [prodImageUrl, setProdImageUrl] = useState<string | undefined>(undefined);

  // Image upload
  const [uploadBusy, setUploadBusy] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (t) {
      setToken(t);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setSessionOk(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await adminVerifySession({ data: { token } });
        if (cancelled) return;
        setSessionOk(true);
        setErrorMsg(null);
        await refreshProducts(token);
      } catch (e) {
        if (cancelled) return;
        setSessionOk(false);
        setErrorMsg("Unauthorized. Please login again.");
        sessionStorage.removeItem("admin_token");
        setToken(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function refreshProducts(currentToken: string) {
    const res = await listProducts({ data: { token: currentToken } });
    setProducts(res.products);
  }

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    const parsed = LoginSchema.safeParse({ username, password });
    if (!parsed.success) {
      setErrorMsg("Enter username and password.");
      return;
    }

    setBusy(true);
    try {
        const res = await adminLogin({ data: { username, password } });
      sessionStorage.setItem("admin_token", res.token);
      setToken(res.token);
      setSessionOk(true);
    } catch {
      setErrorMsg("Invalid credentials.");
    } finally {
      setBusy(false);
    }
  }

  async function onAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setBusy(true);
    try {
      const price = Number(prodPrice);
      if (!prodName.trim() || !Number.isFinite(price) || price < 0) {
        setErrorMsg("Enter a valid product name and non-negative price.");
        return;
      }

      await createProduct({
        data: {
          token,
          name: prodName.trim(),
          price,
          imageUrl: prodImageUrl,
        },
      });

      setProdName("");
      setProdPrice(0);
      setProdImageUrl(undefined);

      await refreshProducts(token);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg((err as Error)?.message ?? "Failed to create product.");
    } finally {
      setBusy(false);
    }
  }

  async function onUploadImage(file: File | null) {
    if (!token) return;
    if (!file) return;

    setUploadBusy(true);
    setErrorMsg(null);
    try {
      const base64 = await fileToBase64(file);
      const res = await uploadImage({
        data: {
          token,
          filename: file.name,
          contentBase64: base64,
        },
      });
      setProdImageUrl(res.imageUrl);
    } catch (err) {
      setErrorMsg((err as Error)?.message ?? "Image upload failed.");
    } finally {
      setUploadBusy(false);
    }
  }

  function onLogout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setSessionOk(false);
    setProducts([]);
  }

  const canUseAdmin = Boolean(token) && sessionOk;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-velura-noir/60">Manage products & images</p>
        </div>

        {canUseAdmin ? (
          <button
            onClick={onLogout}
            className="rounded border border-velura-noir/20 px-4 py-2 text-sm hover:border-velura-gold"
          >
            Logout
          </button>
        ) : null}
      </div>

      {!canUseAdmin ? (
        <form onSubmit={onLogin} className="mx-auto max-w-md rounded border border-velura-noir/10 p-6">
          <h2 className="mb-4 text-lg font-medium">Admin login</h2>

          {errorMsg ? <div className="mb-3 text-sm text-red-600">{errorMsg}</div> : null}

          <label className="mb-3 block">
            <div className="mb-1 text-sm">Username</div>
            <input name="username" required className="w-full rounded border px-3 py-2" />
          </label>

          <label className="mb-4 block">
            <div className="mb-1 text-sm">Password</div>
            <input name="password" required type="password" className="w-full rounded border px-3 py-2" />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded bg-velura-gold px-4 py-2 text-sm text-velura-noir hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Login"}
          </button>
        </form>
      ) : (
        <div className="space-y-10">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium">Products</h2>
              <button
                type="button"
                onClick={() => refreshProducts(token!)}
                className="rounded border border-velura-noir/20 px-3 py-2 text-sm hover:border-velura-gold"
              >
                Refresh
              </button>
            </div>

            <div className="rounded border border-velura-noir/10 p-4">
              <form onSubmit={onAddProduct} className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <div className="mb-1 text-sm">Product name</div>
                  <input
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                  />
                </label>

                <label className="block">
                  <div className="mb-1 text-sm">Price</div>
                  <input
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    type="number"
                    min={0}
                    step="0.01"
                    className="w-full rounded border px-3 py-2"
                  />
                </label>

                <div className="block md:col-span-2">
                  <div className="mb-2 text-sm">Image (upload)</div>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onUploadImage(e.currentTarget.files?.[0] ?? null)}
                      disabled={uploadBusy}
                    />
                    {prodImageUrl ? (
                      <img
                        src={prodImageUrl}
                        alt="Selected product"
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      <div className="text-sm text-velura-noir/50">No image selected</div>
                    )}
                  </div>
                </div>

                {errorMsg ? <div className="md:col-span-2 text-sm text-red-600">{errorMsg}</div> : null}

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={busy}
                    className="rounded bg-velura-noir px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
                  >
                    {busy ? "Saving..." : "Add product"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 rounded border border-velura-noir/10 p-4">
              <h3 className="mb-3 text-sm font-medium text-velura-noir/70">Existing products</h3>
              <div className="space-y-3">
                {products.length === 0 ? (
                  <div className="text-sm text-velura-noir/50">No products yet.</div>
                ) : (
                  products.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 rounded border border-velura-noir/10 p-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="h-12 w-12 rounded object-cover" />
                      ) : (
                        <div className="h-12 w-12 rounded bg-velura-noir/5" />
                      )}
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.name}</div>
                        <div className="text-sm text-velura-noir/60">${p.price.toFixed(2)}</div>
                      </div>
                      <div className="ml-auto text-xs text-velura-noir/40">ID: {p.id}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">Images</h2>
            <p className="mt-1 text-sm text-velura-noir/60">
              Images are uploaded via the product form. (You can extend this with a dedicated gallery section later.)
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      // result looks like: data:image/png;base64,AAAA
      const idx = result.indexOf("base64,");
      if (idx === -1) return resolve(result);
      resolve(result.slice(idx + "base64,".length));
    };
    reader.readAsDataURL(file);
  });
}
