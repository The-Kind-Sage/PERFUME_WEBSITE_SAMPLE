import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "../data/fragrances";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal | VELURA — Fragrance Stories & Beauty Notes" },
      { name: "description", content: "The VELURA Journal — fragrance education, ingredient stories, perfumer diaries, and moments of beauty." },
    ],
  }),
  component: JournalPage,
});

const categories = ["All", "Fragrance Education", "The Ingredients", "Behind The Scenes", "Style & Beauty"];

function JournalPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-main.jpg"
            alt="VELURA Journal"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-velura-noir/50" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold"
          >
            The Journal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl font-light text-white md:text-5xl lg:text-6xl"
          >
            LETTERS FROM VELURA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 max-w-lg font-body text-base text-white/60"
          >
            Fragrance stories, beauty notes, and little moments of luxury.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="bg-velura-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12 flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  cat === "All"
                    ? "bg-velura-noir text-white"
                    : "border border-velura-noir/10 text-velura-noir/50 hover:border-velura-gold hover:text-velura-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group mb-16"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={journalPosts[0].image}
                  alt={journalPosts[0].title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="mb-3 font-heading text-[10px] uppercase tracking-[0.25em] text-velura-gold">
                  {journalPosts[0].category}
                </span>
                <h2 className="font-display text-2xl font-light text-velura-noir md:text-3xl lg:text-4xl">
                  {journalPosts[0].title}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-velura-noir/50">
                  {journalPosts[0].excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="font-body text-sm text-velura-noir/30">{journalPosts[0].date}</span>
                  <Link
                    to="/journal"
                    className="group/link inline-flex items-center gap-2 font-body text-sm italic text-velura-gold transition-colors hover:text-velura-noir"
                  >
                    Read article
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" strokeWidth={1} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {journalPosts.slice(1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5">
                  <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-velura-gold">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-light text-velura-noir transition-colors group-hover:text-velura-gold">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-velura-noir/50">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 block font-body text-xs text-velura-noir/30">
                    {post.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
