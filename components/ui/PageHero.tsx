import { ReactNode } from "react";

// 1. Tambahkan badge di interface
interface PageHeroProps {
  badge?: string;
  title: string;
  highlightTitle?: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHero({
  badge,
  title,
  highlightTitle,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-r from-[#005BAC] via-[#0A74CF] to-[#00A651] pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* Blueprint Grid & Glow Blur Accent */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Render badge jika ada */}
        {badge && (
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[3px] text-yellow-400 mb-3">
            {badge}
          </p>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white tracking-tight">
          {title}{" "}
          {highlightTitle && (
            <span className="text-yellow-400 block sm:inline">
              {highlightTitle}
            </span>
          )}
        </h1>

        {description && (
          <p className="mt-5 mx-auto max-w-2xl text-xs sm:text-base md:text-lg leading-relaxed text-blue-100/90 font-normal">
            {description}
          </p>
        )}

        {children}
      </div>

      {/* Wave SVG Putih Mentok */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 sm:h-20 text-white fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}