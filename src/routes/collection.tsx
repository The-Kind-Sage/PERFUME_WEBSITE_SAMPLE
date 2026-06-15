import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Filter, X } from "lucide-react";
import { allFragrances } from "../data/fragrances";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection | VELURA — Twelve Fragrances" },
      { name: "description", content: "Explore the complete VELURA collection. Twelve fragrances, each a world unto itself. Find the scent that was made for you." },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const filters = ["All", "Spring", "Summer", "Autumn", "Winter", "Year-round"];

  const filtered = activeFilter && activeFilter !== "All"
    ? allFragrances.filter((f) => f.season === activeFilter)
    : allFragrances;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/atelier.jpg"
            alt="The VELURA atelier"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-velura-noir/60" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl font-light text-white md:text-5xl lg:text-6xl"
          >
            THE VELURA COLLECTION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 max-w-md font-body text-base text-white/60"
          >
            Twelve fragrances. Each one a story.
          </motion.p>
        </div>
      </section>

      {/* Collection Content */}
      <section ref={ref} className="bg-velura-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="font-body text-base leading-relaxed text-velura-noir/50">
              Each VELURA fragrance is a world unto itself — composed by master perfumers, named for feelings, and designed to become the most intimate part of your wardrobe.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Filter className="mr-2 h-4 w-4 text-velura-noir/30" strokeWidth={1} />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter === "All" ? null : filter)}
                className={`rounded-full px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  (filter === "All" && !activeFilter) || activeFilter === filter
                    ? "bg-velura-noir text-white"
                    : "border border-velura-noir/10 text-velura-noir/50 hover:border-velura-gold hover:text-velura-gold"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((fragrance, i) => (
              <motion.div
                key={fragrance.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-velura-noir/5">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={fragrance.image}
                        alt={fragrance.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-velura-noir/0 transition-colors duration-500 group-hover:bg-velura-noir/10" />
                    <span className="absolute left-3 top-3 font-display text-6xl font-light leading-none text-velura-gold/10">
                      {fragrance.number}
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-velura-noir/60 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="text-center">
                        <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/70">
                          {fragrance.notes.top.join(" · ")}
                        </p>
                        <p className="mt-2 font-heading text-[10px] uppercase tracking-[0.2em] text-velura-gold">
                          from ${fragrance.price["30ml"]}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-lg font-light text-velura-noir transition-colors duration-300 group-hover:text-velura-gold">
                        {fragrance.name}
                      </h3>
                      <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-velura-noir/30">
                        {fragrance.season}
                      </span>
                    </div>
                    <p className="mt-1 font-body text-sm italic text-velura-noir/50">
                      {fragrance.tagline}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fragrance.mood.map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-velura-noir/10 px-3 py-1 font-heading text-[9px] uppercase tracking-[0.15em] text-velura-noir/40"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
