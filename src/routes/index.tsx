import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { fragrances, testimonials, pressQuotes, allFragrances } from "../data/fragrances";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VELURA | Wear Your Aura — Luxury Perfumes" },
      { name: "description", content: "VELURA Parfums — Twelve fragrances. Twelve worlds. One for every version of you. Discover your perfect scent." },
      { property: "og:title", content: "VELURA | Wear Your Aura" },
      { property: "og:description", content: "Twelve fragrances. Twelve worlds. One for every version of you." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <CollectionShowcase />
      <ScentFinderTeaser />
      <EditorialMoment />
      <TestimonialsSection />
      <PressSection />
      <NewsletterSection />
    </>
  );
}

/* ─────────── HERO SECTION ─────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="/images/hero-main.jpg"
          alt="VELURA — A woman in silk, golden hour light"
          className="h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-velura-noir/80 via-velura-noir/30 to-velura-noir/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-velura-noir/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 pt-28 md:px-12 md:pt-32 lg:justify-center lg:pb-12 lg:pl-16 lg:pt-[104px] xl:pl-24"
      >
        <div className="max-w-[46rem] lg:max-w-[52rem]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 font-heading text-[11px] font-light uppercase tracking-[0.3em] text-velura-gold"
          >
            VELURA PARIS &mdash; EST. 2024
          </motion.p>

          <h1 className="font-display text-4xl font-light leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.75rem] 2xl:text-[6.5rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block"
            >
              A SCENT
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block italic"
            >
              THAT STAYS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="block"
            >
              LONG AFTER
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="block italic text-velura-gold"
            >
              YOU LEAVE.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 max-w-md font-body text-base font-light leading-relaxed text-white/70 md:text-lg"
          >
            The debut collection. Twelve fragrances. Each one a world. Each one entirely yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 border border-white/40 px-8 py-4 font-heading text-[11px] font-light uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-velura-gold hover:bg-velura-gold/10"
            >
              Discover the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
            </Link>
            <Link
              to="/collection"
              className="group inline-flex items-center gap-2 font-body text-sm italic text-white/60 transition-colors duration-300 hover:text-velura-gold"
            >
              Find Your Scent
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-px bg-gradient-to-b from-transparent to-velura-gold/60" />
          <span className="font-script text-sm text-white/40">scroll to explore</span>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────── MANIFESTO SECTION ─────────── */
function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    { text: "PERFUME IS MEMORY", style: "display" },
    { text: "It is the first summer you fell in love.", style: "poetry" },
    { text: "The morning your life changed.", style: "poetry" },
    { text: "The person you miss the most.", style: "poetry" },
    { text: "VELURA captures these moments —", style: "brand" },
    { text: "and gives them back to you.", style: "poetry" },
    { text: "Every time you open the bottle.", style: "poetry" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-velura-noir py-32 md:py-48">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`mb-6 last:mb-0 ${
              line.style === "display"
                ? "font-display text-4xl font-light text-velura-ivory md:text-6xl lg:text-7xl"
                : line.style === "brand"
                ? "font-display text-2xl italic text-velura-gold md:text-3xl"
                : "font-body text-lg italic text-velura-ivory/50 md:text-xl"
            }`}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

/* ─────────── COLLECTION SHOWCASE ─────────── */
function CollectionShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-velura-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 text-center"
        >
          <p className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold">
            The Collection
          </p>
          <h2 className="font-display text-4xl font-light text-velura-noir md:text-5xl lg:text-6xl">
            THE VELURA COLLECTION
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-base text-velura-noir/50">
            Twelve fragrances. Twelve worlds. One for every version of you.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-velura-gold" />
        </motion.div>

        {/* Featured Fragrances Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fragrances.map((fragrance, i) => (
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <Link to="/collection" className="group block">
                <div className="relative overflow-hidden bg-velura-noir/5">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={fragrance.image}
                      alt={fragrance.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-velura-noir/0 transition-colors duration-500 group-hover:bg-velura-noir/20" />
                  {/* Collection number */}
                  <span className="absolute left-4 top-4 font-display text-7xl font-light leading-none text-velura-gold/10">
                    {fragrance.number}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-xl font-light text-velura-noir transition-colors duration-300 group-hover:text-velura-gold">
                    {fragrance.name}
                  </h3>
                  <p className="mt-1 font-body text-sm italic text-velura-noir/50">
                    {fragrance.tagline}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {fragrance.notes.top.map((note) => (
                      <span
                        key={note}
                        className="font-heading text-[9px] uppercase tracking-[0.2em] text-velura-noir/40"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 font-heading text-[11px] uppercase tracking-[0.2em] text-velura-gold">
                    from ${fragrance.price["30ml"]}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <Link
            to="/collection"
            className="group inline-flex items-center gap-3 border border-velura-noir/20 px-8 py-4 font-heading text-[11px] font-light uppercase tracking-[0.25em] text-velura-noir transition-all duration-500 hover:border-velura-gold hover:bg-velura-gold/5"
          >
            Explore All Twelve
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── SCENT FINDER TEASER ─────────── */
function ScentFinderTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="gradient-morning-silk py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl font-light text-velura-noir md:text-5xl lg:text-6xl">
            Which VELURA
            <br />
            are you?
          </h2>
          <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-velura-noir/60">
            Answer five questions. Discover the fragrance that was made for you.
          </p>
          <div className="mt-8">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 border border-velura-noir/20 bg-white/50 px-10 py-5 font-heading text-[11px] font-light uppercase tracking-[0.25em] text-velura-noir backdrop-blur-sm transition-all duration-500 hover:border-velura-gold hover:bg-white/80"
            >
              Find My Scent
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
            </Link>
          </div>
          <p className="mt-6 font-body text-sm text-velura-noir/40">
            Taken by 180,000+ women worldwide &middot; Takes just 2 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── EDITORIAL MOMENT ─────────── */
function EditorialMoment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-velura-noir py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/lifestyle-spritz.jpg"
                alt="The VELURA ritual — applying fragrance"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative frame corners */}
            <div className="absolute -left-3 -top-3 h-16 w-16 border-l border-t border-velura-gold/30" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-velura-gold/30" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold">
              The Ritual
            </p>
            <h2 className="font-display text-3xl font-light leading-tight text-velura-ivory md:text-4xl lg:text-5xl">
              She opens the bottle.
              <br />
              Closes her eyes.
              <br />
              <span className="italic text-velura-gold">And for a moment —</span>
              <br />
              nothing else exists.
            </h2>
            <p className="mt-8 max-w-md font-body text-base leading-relaxed text-velura-ivory/50">
              Your outfit makes an entrance. Your perfume makes a memory. The right scent doesn't announce you. It announces the version of you you always knew you were.
            </p>
            <div className="mt-8">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 font-body text-sm italic text-velura-gold transition-colors duration-300 hover:text-velura-ivory"
              >
                Find that scent
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── TESTIMONIALS ─────────── */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="bg-velura-ivory py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold">
            In their own words
          </p>
          <h2 className="font-display text-3xl font-light text-velura-noir md:text-4xl">
            WOMEN WHO WEAR VELURA
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="mb-6 text-6xl text-velura-gold/20">&ldquo;</div>
                <blockquote className="max-w-2xl font-body text-lg italic leading-relaxed text-velura-noir/70 md:text-xl">
                  {testimonials[active].text}
                </blockquote>
                <div className="mt-8">
                  <p className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] text-velura-noir">
                    {testimonials[active].author}
                  </p>
                  <p className="mt-1 font-body text-sm text-velura-noir/40">
                    {testimonials[active].location} &middot; {testimonials[active].fragrance}
                  </p>
                </div>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-velura-gold text-velura-gold" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="p-2 text-velura-noir/30 transition-colors hover:text-velura-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-velura-gold" : "w-1.5 bg-velura-noir/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 text-velura-noir/30 transition-colors hover:text-velura-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── PRESS SECTION ─────────── */
function PressSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-velura-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-light text-velura-noir md:text-4xl">
            The world noticed.
          </h2>
        </motion.div>

        {/* Press Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {["VOGUE", "Harper's BAZAAR", "ELLE", "W Magazine", "Forbes", "REFINERY29"].map((name) => (
            <span
              key={name}
              className="font-display text-lg font-light tracking-[0.15em] text-velura-noir/20 transition-colors duration-500 hover:text-velura-noir/50 md:text-xl"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Press Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {pressQuotes.map((quote, i) => (
            <div
              key={i}
              className="group border border-velura-noir/5 bg-white p-8 transition-all duration-500 hover:shadow-lg hover:shadow-velura-noir/5"
            >
              <div className="mb-6 font-display text-5xl leading-none text-velura-gold/20">&ldquo;</div>
              <p className="font-body text-base italic leading-relaxed text-velura-noir/60">
                {quote.quote}
              </p>
              <p className="mt-6 font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-velura-gold">
                {quote.source}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── NEWSLETTER ─────────── */
function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section ref={ref} className="relative overflow-hidden bg-velura-blush/30 py-24 md:py-36">
      {/* Subtle silk texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl font-light text-velura-noir md:text-5xl">
            Letters from Velura.
          </h2>
          <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-velura-noir/50">
            Beauty notes, fragrance stories, early access to new collections, and little moments of luxury — delivered to your inbox.
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full max-w-sm border-b border-velura-noir/20 bg-transparent px-0 py-3 font-body text-base text-velura-noir placeholder:text-velura-noir/30 focus:border-velura-gold focus:outline-none sm:w-auto sm:flex-1"
              />
              <button
                type="submit"
                className="flex items-center gap-2 font-heading text-[11px] font-light uppercase tracking-[0.25em] text-velura-gold transition-colors duration-300 hover:text-velura-noir"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" strokeWidth={1} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <p className="font-script text-2xl text-velura-gold">Thank you, darling.</p>
              <p className="mt-2 font-body text-sm text-velura-noir/50">Your first letter is on its way.</p>
            </motion.div>
          )}

          <p className="mt-8 font-body text-xs text-velura-noir/30">
            Join 200,000+ women who receive The Velura Letters. No spam. Ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
