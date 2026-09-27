import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowUpRight, Sparkles, Layout, Cpu, Globe } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aether Portal",
    category: "PLATFORM & UX/UI DEVELOPMENT",
    description: "A highly immersive, real-time analytics hub and client experience platform for a modern cloud orchestration suite.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tech: ["React", "D3.js", "Tailwind CSS", "TypeScript"],
    icon: Layout
  },
  {
    id: 2,
    title: "Krypton Protocol",
    category: "CRYPTOGRAPHIC PLATFORM",
    description: "A secure dashboard mapping transactional latency and visual node distribution for distributed ledger platforms.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    tech: ["Web3.js", "Framer Motion", "Go", "Tailwind"],
    icon: Cpu
  },
  {
    id: 3,
    title: "Novis Engine",
    category: "NEXT-GEN DESIGN SYSTEMS",
    description: "An automated design token generator and component pipeline streamlining brand assets to production-ready code.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tech: ["Figma API", "Node.js", "Tailwind CSS", "Sass"],
    icon: Globe
  }
];

interface FeaturedProjectsProps {
  theme: "dark" | "light";
}

export function FeaturedProjects({ theme }: FeaturedProjectsProps) {
  return (
    <section 
      id="projects"
      className={`relative py-24 transition-colors duration-500 overflow-hidden border-t ${
        theme === 'dark' 
          ? 'bg-black border-white/5 text-white' 
          : 'bg-slate-50 border-neutral-200 text-neutral-900'
      }`}
    >
      {/* Dynamic Glow Accents */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#ff451d]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

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
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>PORTFOLIO</span>
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
            Featured <span className="font-serif italic text-[#ff451d] font-normal drop-shadow-[0_2px_15px_rgba(255,69,29,0.1)]">Projects</span>
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
            A curated showcase of bespoke digital creations designed for optimal user engagement and raw performance.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} theme={theme} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface ProjectCardProps {
  key?: React.Key | null | undefined;
  project: Project;
  theme: "dark" | "light";
  idx: number;
}

function ProjectCard({ project, theme, idx }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  // Track cursor position inside card for advanced subtle tilt effect
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`relative group rounded-3xl p-6 border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
        theme === 'dark'
          ? 'bg-neutral-950/40 border-white/5 shadow-2xl hover:border-[#ff451d]/35'
          : 'bg-white border-neutral-200/80 shadow-lg hover:border-[#ff451d]/35'
      }`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {/* Project Image Container */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-neutral-800/10">
          <img 
            src={project.image} 
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Subtle Icon Badge on image */}
          <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-[#ff451d]">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Project Tag/Category */}
        <span className="text-[10px] font-bold tracking-widest font-mono text-[#ff451d] uppercase block mb-2">
          {project.category}
        </span>

        {/* Project Title */}
        <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-neutral-900'
        }`}>
          {project.title}
        </h3>

        {/* Project Description */}
        <p className={`text-xs sm:text-sm leading-relaxed mb-6 transition-colors duration-300 ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          {project.description}
        </p>
      </div>

      {/* Card Footer Tech and Link */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-neutral-800/20"
      >
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 max-w-[70%]">
          {project.tech.map((t) => (
            <span 
              key={t}
              className={`text-[9px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-white/5 text-neutral-400 border border-white/5'
                  : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Link / Action element */}
        <div className="flex items-center gap-1 text-[#ff451d] font-bold text-xs uppercase tracking-wider font-mono group-hover:translate-x-1 transition-transform">
          <span>View Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}
