import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const state = useRouterState();
  const isHome = state.location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { to: "/collection", label: "FRAGRANCE" },
    { to: "/about", label: "ABOUT" },
    { to: "/journal", label: "JOURNAL" },
  ];

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isTransparent
            ? "bg-transparent"
            : "bg-velura-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <nav className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className={`font-display text-xl font-semibold tracking-[0.2em] transition-colors duration-500 ${
                isTransparent ? "text-white" : "text-velura-noir"
              }`}
            >
              VELURA
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-10 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-heading text-[11px] font-light tracking-[0.25em] transition-colors duration-300 hover:text-velura-gold ${
                    isTransparent ? "text-white/90" : "text-velura-noir/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`transition-colors duration-300 hover:text-velura-gold ${
                  isTransparent ? "text-white/90" : "text-velura-noir/80"
                }`}
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <button
                className={`hidden transition-colors duration-300 hover:text-velura-gold sm:block ${
                  isTransparent ? "text-white/90" : "text-velura-noir/80"
                }`}
                aria-label="Wishlist"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <button
                className={`relative transition-colors duration-300 hover:text-velura-gold ${
                  isTransparent ? "text-white/90" : "text-velura-noir/80"
                }`}
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`transition-colors duration-300 lg:hidden ${
                  isTransparent ? "text-white/90" : "text-velura-noir/80"
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-velura-noir"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-light text-velura-ivory/90 transition-colors hover:text-velura-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="font-script text-4xl text-velura-gold"
                >
                  Wear your aura
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-velura-ivory/98 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="flex h-full flex-col items-center justify-center px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-6 top-6 text-velura-noir/60 hover:text-velura-noir"
                aria-label="Close search"
              >
                <X className="h-6 w-6" strokeWidth={1} />
              </button>
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                type="text"
                placeholder="Search fragrances, notes, moods..."
                className="w-full max-w-xl border-b border-velura-noir/20 bg-transparent pb-4 text-center font-display text-2xl text-velura-noir placeholder:text-velura-noir/30 focus:border-velura-gold focus:outline-none md:text-4xl"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
