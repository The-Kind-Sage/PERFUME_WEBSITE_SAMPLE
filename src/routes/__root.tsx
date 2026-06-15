import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-velura-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-light text-velura-noir">404</h1>
        <h2 className="mt-4 font-display text-xl font-light text-velura-noir">Page not found</h2>
        <p className="mt-2 font-body text-sm text-velura-noir/50">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-velura-gold px-8 py-3 font-heading text-[11px] font-light uppercase tracking-[0.2em] text-velura-gold transition-colors duration-500 hover:bg-velura-gold hover:text-velura-noir"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-velura-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-light tracking-tight text-velura-noir">
          This page didn't load
        </h1>
        <p className="mt-2 font-body text-sm text-velura-noir/50">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center border border-velura-gold px-8 py-3 font-heading text-[11px] font-light uppercase tracking-[0.2em] text-velura-gold transition-colors duration-500 hover:bg-velura-gold hover:text-velura-noir"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-velura-noir/20 px-8 py-3 font-heading text-[11px] font-light uppercase tracking-[0.2em] text-velura-noir/70 transition-colors duration-300 hover:border-velura-noir/40"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VELURA | Wear Your Aura" },
      { name: "description", content: "VELURA Parfums — Twelve fragrances. Twelve worlds. One for every version of you." },
      { property: "og:title", content: "VELURA | Wear Your Aura" },
      { property: "og:description", content: "VELURA Parfums — Twelve fragrances. Twelve worlds. One for every version of you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@velura" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Jost:wght@200;300;400;500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

