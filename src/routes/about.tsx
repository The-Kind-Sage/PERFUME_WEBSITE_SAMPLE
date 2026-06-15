import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | VELURA — The Maison" },
      { name: "description", content: "Discover the VELURA story. Born in Paris, crafted by master perfumers, designed for women who leave a trace." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <OriginSection />
      <PhilosophySection />
      <ProcessSection />
      <SustainabilitySection />
    </>
  );
}

/* ─────────── ORIGIN ─────────── */
function OriginSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-velura-noir py-32 md:py-48">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 font-script text-2xl text-velura-gold md:text-3xl"
        >
          It began with a question...
        </motion.p>

        {[
          "Why should luxury fragrance feel distant?",
          "Cold? Unattainable?",
          "We believed perfume should feel like yours.",
          "Like it was waiting for you all along.",
        ].map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
            className="font-display text-2xl font-light leading-relaxed text-velura-ivory/80 md:text-3xl lg:text-4xl"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

/* ─────────── PHILOSOPHY ─────────── */
function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-velura-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <p className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold">
              The Philosophy
            </p>
            <h2 className="font-display text-3xl font-light leading-tight text-velura-noir md:text-4xl lg:text-5xl">
              Every bottle
              <br />
              <span className="italic">is a story.</span>
              <br />
              Every spritz
              <br />
              <span className="italic">is a chapter.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-body text-base leading-relaxed text-velura-noir/60">
              VELURA believes that perfume is the most intimate form of self-expression. More personal than clothing. More revealing than words. A VELURA fragrance is not what you wear — it is who you become when you wear it.
            </p>
            <p className="font-body text-base leading-relaxed text-velura-noir/60">
              Every scent is a world you carry with you. Crafted by master perfumers in our Paris atelier, each fragrance is composed from the world's finest ingredients — harvested at dawn, aged with patience, and blended with intention.
            </p>
            <div className="pt-4">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 font-body text-sm italic text-velura-gold transition-colors duration-300 hover:text-velura-noir"
              >
                Discover the collection
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20"
        >
          <div className="relative overflow-hidden">
            <img
              src="/images/atelier.jpg"
              alt="Inside the VELURA Paris atelier"
              className="h-[400px] w-full object-cover md:h-[500px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-velura-noir/40 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-display text-2xl font-light text-white md:text-3xl">
                The VELURA Atelier, Paris
              </p>
              <p className="mt-2 font-body text-sm italic text-white/60">
                Where every fragrance begins
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── PROCESS ─────────── */
function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      number: "01",
      title: "Ingredient Sourcing",
      desc: "Bulgarian roses at dawn. Florentine orris aged five years. Madagascan vanilla cured in the sun. We travel to the source of every note.",
    },
    {
      number: "02",
      title: "Extraction & Distillation",
      desc: "Steam, cold press, enfleurage — each ingredient demands its own method. Our perfumers honor the material by listening to what it wants to become.",
    },
    {
      number: "03",
      title: "Composition",
      desc: "The art of balance. Top notes that greet, heart notes that bloom, base notes that linger. Every accord is composed like a symphony.",
    },
    {
      number: "04",
      title: "Maceration & Aging",
      desc: "Time is our secret ingredient. Each blend rests, allowing the notes to marry and deepen. Patience is the perfumer's greatest virtue.",
    },
    {
      number: "05",
      title: "Bottling & Finishing",
      desc: "Hand-poured into crystal. Sealed with rose gold. Every bottle is inspected, polished, and prepared as a gift — because it is one.",
    },
  ];

  return (
    <section ref={ref} className="bg-velura-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold">
            The Craft
          </p>
          <h2 className="font-display text-3xl font-light text-velura-noir md:text-4xl lg:text-5xl">
            From Raw Material
            <br />
            <span className="italic">to Your Skin</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="grid items-start gap-6 border-b border-velura-noir/5 pb-12 md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr_1fr]"
            >
              <span className="font-display text-5xl font-light text-velura-gold/20">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-light text-velura-noir md:text-2xl">
                {step.title}
              </h3>
              <p className="font-body text-base leading-relaxed text-velura-noir/50">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── SUSTAINABILITY ─────────── */
function SustainabilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-velura-noir py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-heading text-[10px] font-light uppercase tracking-[0.35em] text-velura-gold">
            Our Promise
          </p>
          <h2 className="font-display text-3xl font-light text-velura-ivory md:text-4xl lg:text-5xl">
            Beauty should never come
            <br />
            <span className="italic">at the earth's expense.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-body text-lg leading-relaxed text-velura-ivory/60">
            Every VELURA fragrance comes with a promise: If it doesn't feel like yours, we will find you one that does. Or we will give you your money back. No questions. No forms. Just a call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {[
            { label: "Cruelty-Free", desc: "Never tested on animals. Never will be." },
            { label: "Sustainable Sourcing", desc: "Ethical partnerships with ingredient communities worldwide." },
            { label: "Recyclable Glass", desc: "Our bottles are designed to be refilled, not discarded." },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-velura-ivory/10 p-8 text-center"
            >
              <h3 className="font-display text-lg font-light text-velura-gold">
                {item.label}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-velura-ivory/40">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
