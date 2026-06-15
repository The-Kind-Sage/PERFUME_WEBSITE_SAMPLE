import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.401.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.361-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function Footer() {
  const footerLinks = {
    fragrance: [
      { label: "The Collection", to: "/collection" },
      { label: "New Arrivals", to: "/collection" },
      { label: "Limited Edition", to: "/collection" },
      { label: "Sample Kit", to: "/collection" },
      { label: "Gift Guide", to: "/collection" },
    ],
    experience: [
      { label: "Scent Finder", to: "/collection" },
      { label: "Discovery Samples", to: "/collection" },
      { label: "Virtual Try-On", to: "/collection" },
    ],
    maison: [
      { label: "Our Story", to: "/about" },
      { label: "The Perfumers", to: "/about" },
      { label: "Press & Media", to: "/journal" },
      { label: "Sustainability", to: "/about" },
    ],
    support: [
      { label: "Contact Us", to: "/about" },
      { label: "Shipping Info", to: "/about" },
      { label: "Returns", to: "/about" },
      { label: "FAQ", to: "/about" },
    ],
  };

  return (
    <footer className="bg-velura-noir text-velura-ivory/80">
      {/* Top decorative line */}
      <div className="h-px w-full bg-velura-gold/30" />

      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
        {/* Logo & Social */}
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-[0.3em] text-velura-ivory"
          >
            VELURA
          </Link>
          <p className="font-script text-2xl text-velura-gold">Wear your aura</p>
          <div className="flex items-center gap-5 pt-2">
            {[Instagram, PinterestIcon, TikTokIcon, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-velura-ivory/40 transition-colors duration-300 hover:text-velura-gold"
                aria-label="Social link"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          <div>
            <h4 className="mb-5 font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-velura-gold">
              Fragrance
            </h4>
            <ul className="space-y-3">
              {footerLinks.fragrance.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-velura-ivory/50 transition-colors duration-300 hover:text-velura-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-velura-gold">
              Experience
            </h4>
            <ul className="space-y-3">
              {footerLinks.experience.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-velura-ivory/50 transition-colors duration-300 hover:text-velura-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-velura-gold">
              Maison
            </h4>
            <ul className="space-y-3">
              {footerLinks.maison.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-velura-ivory/50 transition-colors duration-300 hover:text-velura-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-velura-gold">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-velura-ivory/50 transition-colors duration-300 hover:text-velura-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center gap-4 border-t border-velura-ivory/10 pt-8 text-center text-xs text-velura-ivory/30">
          <p className="font-body">Handcrafted in Paris. Shipped worldwide.</p>
          <p className="font-heading tracking-wider">
            &copy; 2024 VELURA Parfums. All Rights Reserved.
          </p>
          <div className="flex gap-6 pt-2">
            <span className="font-heading text-[10px] uppercase tracking-wider">Cruelty-Free</span>
            <span className="font-heading text-[10px] uppercase tracking-wider">Vegan</span>
            <span className="font-heading text-[10px] uppercase tracking-wider">Sustainable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
