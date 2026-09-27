import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Atom, Wind, Sparkles, Braces, Server, Network, BarChart3, Star, Percent } from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  stats: {
    projectsCount: number;
    proficiency: number;
    utilization: string;
  };
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "react",
    name: "React & Next.js",
    category: "FRONTEND FRAMEWORK",
    description: "Component-driven architectures, modern Hooks, Server Actions, and virtual DOM diff optimizations.",
    icon: Atom,
    color: "#ff451d",
    stats: {
      projectsCount: 14,
      proficiency: 95,
      utilization: "68%"
    }
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "DESIGN UTILITIES",
    description: "Utility-first design styling, responsive viewport grids, theme fluidities, and custom animation tokens.",
    icon: Wind,
    color: "#ff451d",
    stats: {
      projectsCount: 18,
      proficiency: 98,
      utilization: "85%"
    }
  },
  {
    id: "motion",
    name: "Framer Motion",
    category: "INTERACTIVE ANIMATION",
    description: "Fluid spring-physics transitions, layout transformations, orchestrations, and keyframe mechanics.",
    icon: Sparkles,
    color: "#ff451d",
    stats: {
      projectsCount: 9,
      proficiency: 88,
      utilization: "42%"
    }
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "TYPE SYSTEM & LOGIC",
    description: "Strict compile-time type-safety, comprehensive system contracts, and reusable generics.",
    icon: Braces,
    color: "#ff451d",
    stats: {
      projectsCount: 16,
      proficiency: 92,
      utilization: "78%"
    }
  },
  {
    id: "node",
    name: "Node.js & Express",
    category: "BACKEND INFRASTRUCTURE",
    description: "Asynchronous I/O servers, secure RESTful APIs, Vite middlewares, and bundled production services.",
    icon: Server,
    color: "#ff451d",
    stats: {
      projectsCount: 11,
      proficiency: 85,
      utilization: "52%"
    }
  },
  {
    id: "graphql",
    name: "APIs & Databases",
    category: "DATA DISTRIBUTION",
    description: "Firestore query designs, PostgreSQL relational schemas, robust GraphQL schemas, and fetchers.",
    icon: Network,
    color: "#ff451d",
    stats: {
      projectsCount: 10,
      proficiency: 80,
      utilization: "48%"
    }
  }
];

interface TechStackProps {
  theme: "dark" | "light";
}

export function TechStack({ theme }: TechStackProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section 
      id="stack"
      className={`relative py-24 border-t transition-colors duration-500 overflow-hidden ${
        theme === 'dark' 
          ? 'bg-[#050505] border-white/5 text-white' 
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      {/* Decorative dynamic ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff451d]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff451d]/15 bg-[#ff451d]/5 text-[#ff451d] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>TOOLCHAIN</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight font-sans transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Technology <span className="font-serif italic text-[#ff451d] font-normal drop-shadow-[0_2px_15px_rgba(255,69,29,0.1)]">Stack</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm sm:text-base max-w-xl mx-auto mt-4 transition-colors ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Our operational stack matches aesthetic precision with rock-solid, production-ready engineering foundations.
          </motion.p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                // Continuous wave floating animation transitioning into hover uplift
                animate={{
                  y: isHovered ? -6 : [0, -6, 0]
                }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  y: isHovered
                    ? { duration: 0.3, ease: "easeOut" }
                    : { repeat: Infinity, duration: 4 + (idx % 3) * 0.5, ease: "easeInOut" }
                }}
                whileHover={{
                  borderColor: "rgba(255, 69, 29, 0.45)",
                  boxShadow: "0 15px 35px rgba(255, 69, 29, 0.08)",
                  scale: 1.02,
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-2xl p-6 border backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-neutral-950/40 border-white/5 hover:bg-[#070707]/60'
                    : 'bg-white/40 border-neutral-200 hover:bg-white/60'
                }`}
              >
                <div>
                  {/* Top line with Icon and category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                      isHovered 
                        ? 'bg-[#ff451d] text-white scale-110' 
                        : theme === 'dark' 
                          ? 'bg-white/5 text-white border border-white/5' 
                          : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest font-mono text-neutral-500 uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className={`text-lg font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {item.name}
                  </h3>

                  {/* Description / dynamic content */}
                  <div className="relative mt-2 h-14 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {!isHovered ? (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className={`text-xs leading-relaxed transition-colors duration-300 ${
                            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                          }`}
                        >
                          {item.description}
                        </motion.p>
                      ) : (
                        <motion.div
                          key="stats"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="grid grid-cols-3 gap-2 h-full items-center text-center"
                        >
                          <div className="flex flex-col items-center">
                            <Star className="w-3.5 h-3.5 text-[#ff451d] mb-1 shrink-0" />
                            <span className={`text-[10px] font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                              {item.stats.projectsCount} Projects
                            </span>
                          </div>
                          
                          <div className="flex flex-col items-center border-x border-neutral-800/10 px-1">
                            <Percent className="w-3.5 h-3.5 text-[#ff451d] mb-1 shrink-0" />
                            <span className={`text-[10px] font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                              {item.stats.proficiency}% Mastery
                            </span>
                          </div>

                          <div className="flex flex-col items-center">
                            <BarChart3 className="w-3.5 h-3.5 text-[#ff451d] mb-1 shrink-0" />
                            <span className={`text-[10px] font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                              {item.stats.utilization} Core
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Interactive bar indicating mastery */}
                <div className="mt-5 w-full bg-neutral-200/40 dark:bg-neutral-800/20 h-[3px] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.stats.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-[#ff451d] h-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
