import { useState } from "react";
import { MapPin, MessageSquare, ChevronRight, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const eventsData = [
  { id: "we3ds", year: "2024", iconText: "⚡" },
  { id: "freelance", year: "2023", iconText: "AR" },
  { id: "platform", year: "2024", iconText: "●", featured: true },
  { id: "degree", year: "2021", iconText: "❖" },
];

export function ExperiencePreview() {
  const [activeTab, setActiveTab] = useState("TALKS");
  const { tr } = useI18n();

  return (
    <section id="events" className="w-full bg-background py-20 px-4 sm:px-8 md:px-12 text-foreground select-none">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-center text-foreground mb-8 tracking-tight">
          {tr("events.title")}
        </h2>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {["INTERVIEWS", "TALKS", "EXHIBITION"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-6 py-2.5 font-sans text-xs font-black tracking-[0.2em] uppercase transition-all ${
                activeTab === tab
                  ? "bg-foreground text-background shadow-md scale-105"
                  : "bg-foreground/10 text-foreground border border-border hover:bg-foreground/20"
              }`}
            >
              {tr(`events.tab.${tab.toLowerCase()}`)}
            </button>
          ))}
        </div>

        {/* Event Rows */}
        <div className="flex flex-col gap-4">
          {eventsData.map(({ id, year, iconText, featured }) => (
            <div
              key={id}
              className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-[2rem] transition-all duration-300 ${
                featured
                  ? "bg-foreground text-background shadow-[var(--shadow-glow)] scale-[1.02]"
                  : "bg-card text-card-foreground border border-border shadow-md hover:bg-card/90"
              }`}
            >
              <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto">
                <span dir="ltr" className="font-['Oswald',sans-serif] text-sm font-bold opacity-80 min-w-10">
                  {year}
                </span>

                <div
                  className={`grid size-10 place-items-center rounded-full font-black text-sm ${
                    featured ? "bg-primary text-primary-foreground" : "bg-foreground/15 text-primary"
                  }`}
                >
                  {iconText}
                </div>

                <h3
                  className={`font-['Oswald',sans-serif] text-xl sm:text-2xl font-bold tracking-tight ${
                    featured ? "text-background" : "text-card-foreground"
                  }`}
                >
                  {tr(`events.item.${id}.name`)}
                </h3>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                  <MapPin className="size-3.5 text-primary" />
                  <span>{tr(`events.item.${id}.location`)}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                  <MessageSquare className="size-3.5 text-primary" />
                  <span>{tr(`events.item.${id}.topic`)}</span>
                </div>

                {featured ? (
                  <button className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm hover:scale-105 transition-transform">
                    <ArrowRight className="size-4 stroke-[3] rtl:rotate-180" />
                  </button>
                ) : (
                  <ChevronRight className="size-5 opacity-60 rtl:rotate-180" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
