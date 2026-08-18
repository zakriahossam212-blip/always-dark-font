import { motion } from "framer-motion";
import { Play, Trophy } from "lucide-react";
import heroIso from "@/assets/hero-iso.webp";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { tr, dir } = useI18n();

  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pt-36 md:pt-40 text-foreground select-none">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        {/* Left Column Text & Action */}
        <div className="relative z-10 text-center lg:text-start">
          {/* Eyebrow Label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-sans text-xs font-black tracking-[0.35em] text-primary uppercase"
          >
            {tr("hero.eyebrow")}
          </motion.p>

          {/* Large Oswald Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="font-display text-[64px] sm:text-[84px] md:text-[104px] font-bold uppercase leading-[0.85] text-foreground tracking-normal"
          >
            {tr("hero.name.first")}
            <br />
            {tr("hero.name.last")}
          </motion.h1>

          {/* Subtitle & Trophy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 flex flex-col items-center lg:items-start gap-4"
          >
            <div className="flex items-center gap-3">
              <p className="max-w-md text-sm sm:text-base font-medium leading-snug text-foreground/90 text-center lg:text-start">
                {tr("hero.subtitle")}
              </p>
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground/10 border border-border text-foreground">
                <Trophy className="size-4 text-primary" />
              </div>
            </div>

            {/* LEARN MORE CTA Button */}
            <a
              href="#works"
              className="group inline-flex items-center gap-3 rounded-xl bg-card px-7 py-3.5 shadow-lg border border-border transition-all duration-300 hover:scale-105 hover:shadow-xl mt-4"
            >
              <span className="grid size-7 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-12">
                <Play className={`size-3.5 fill-primary-foreground text-primary-foreground ${dir === 'rtl' ? 'me-0.5 rotate-180' : 'ms-0.5'}`} />
              </span>
              <span className="font-sans text-xs font-black tracking-[0.2em] text-card-foreground uppercase">
                {tr("hero.cta")}
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Isometric Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.5, 0.3, 1] }}
          className="relative"
        >
          <img
            src={heroIso}
            alt="Mostafa Samir Full Stack Engineer Workspace"
            width={1200}
            height={1104}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            draggable={false}
            className="mx-auto w-full max-w-xl md:max-w-2xl animate-float drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
