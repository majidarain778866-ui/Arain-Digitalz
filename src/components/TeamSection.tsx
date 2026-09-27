import React from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Code2, 
  Gauge, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Globe
} from "lucide-react";
import { useSound } from "../context/SoundContext";

interface TeamSectionProps {
  theme: "dark" | "light";
  onContactClick?: () => void;
}

const EXPERTISE_TAGS = [
  "SEO",
  "Technical SEO",
  "On-Page SEO",
  "Off-Page SEO",
  "Local SEO",
  "WordPress Development",
  "Website Optimization",
  "Keyword Research",
  "Core Web Vitals"
];

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.889 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    url: "https://wa.me/923294947812?text=Hello%20Majid!%20I%20would%20like%20to%20discuss%20an%20SEO%20/%20WordPress%20project.",
    icon: WhatsAppIcon,
    label: "Chat on WhatsApp: +92 329 4947812"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/majid-arain-bb6a03393/",
    icon: Linkedin,
    label: "Connect on LinkedIn"
  },
  {
    name: "GitHub",
    url: "https://github.com/majidarain778866-ui",
    icon: Github,
    label: "Explore GitHub"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/majidarain778866/",
    icon: Instagram,
    label: "Follow on Instagram"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/people/All-In-One-Digital-Solutions/61576383253081/",
    icon: Facebook,
    label: "Visit Facebook Page"
  },
  {
    name: "Email",
    url: "mailto:majidarain778866@gmail.com",
    icon: Mail,
    label: "Send an Email"
  }
];

export function TeamSection({ theme, onContactClick }: TeamSectionProps) {
  const { playClick, playHover } = useSound();

  return (
    <section 
      id="team"
      className="relative w-full py-20 lg:py-28 bg-transparent overflow-hidden"
      aria-label="About M. Majid - Lead SEO Expert and WordPress Developer"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider mb-4 border transition-colors bg-[#ff451d]/10 border-[#ff451d]/30 text-[#ff451d]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff451d] animate-pulse" />
            <span>Lead Specialist & Developer</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-neutral-900"
            }`}
          >
            Behind the Architecture
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-sm sm:text-base leading-relaxed mt-3 font-normal transition-colors duration-300 ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Dedicated expertise focused on search engine visibility, robust WordPress solutions, and performance-first web execution.
          </motion.p>
        </div>

        {/* Dedicated Single Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`relative rounded-3xl p-8 sm:p-10 lg:p-12 border backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-2xl ${
            theme === "dark"
              ? "bg-[#060606]/80 border-neutral-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              : "bg-white/80 border-neutral-200/90 shadow-xl shadow-black/5"
          }`}
        >
          {/* Ambient Corner Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff451d]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Portrait & Visual Identity */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Outer Glow & Framed Container */}
              <div className="relative group">
                {/* Radial Glow Layer */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff451d]/30 via-transparent to-[#ff451d]/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Portrait Circle with Precision Border */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full flex items-center justify-center overflow-hidden border-2 border-[#ff451d]/40 bg-gradient-to-br from-[#ff451d]/15 via-black/40 to-transparent shadow-[0_0_30px_rgba(255,69,29,0.2)] group-hover:shadow-[0_0_45px_rgba(255,69,29,0.35)] transition-all duration-500">
                  
                  {/* Subtle radial inner glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,29,0.25)_0%,transparent_70%)]" />

                  {/* Profile Portrait */}
                  <img
                    src="/images/majid-profile.svg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/majid-profile.png";
                    }}
                    alt="M. Majid - SEO Expert & WordPress Developer"
                    title="Settings icons created by rsetiawan - Flaticon"
                    referrerPolicy="no-referrer"
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 object-contain relative z-10 transition-transform duration-500 group-hover:scale-108 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* Floating Availability Badge */}
                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full border text-xs font-medium flex items-center gap-2 shadow-lg backdrop-blur-md transition-colors ${
                  theme === "dark" 
                    ? "bg-neutral-900/95 border-neutral-700/80 text-neutral-200" 
                    : "bg-white/95 border-neutral-200 text-neutral-800 shadow-neutral-200/50"
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Available for Projects</span>
                </div>
              </div>

              {/* Core Pillars Mini Badges */}
              <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xs text-center">
                <span className={`px-3 py-1 rounded-xl text-xs font-mono border transition-colors ${
                  theme === "dark" ? "bg-white/5 border-white/5 text-neutral-400" : "bg-neutral-100 border-neutral-200 text-neutral-600"
                }`}>
                  SEO Audits
                </span>
                <span className={`px-3 py-1 rounded-xl text-xs font-mono border transition-colors ${
                  theme === "dark" ? "bg-white/5 border-white/5 text-neutral-400" : "bg-neutral-100 border-neutral-200 text-neutral-600"
                }`}>
                  WordPress CMS
                </span>
                <span className={`px-3 py-1 rounded-xl text-xs font-mono border transition-colors ${
                  theme === "dark" ? "bg-white/5 border-white/5 text-neutral-400" : "bg-neutral-100 border-neutral-200 text-neutral-600"
                }`}>
                  Web Vitals
                </span>
              </div>

            </div>

            {/* Right Column: Bio, Skills & Connections */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Name & Official Title */}
              <div className="w-full">
                <div className="flex items-center gap-3">
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans transition-colors duration-300 ${
                    theme === "dark" ? "text-white" : "text-neutral-950"
                  }`}>
                    M. Majid
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[#ff451d]/15 text-[#ff451d] border border-[#ff451d]/30 font-semibold">
                    Lead
                  </span>
                </div>

                <div className="text-base sm:text-lg font-medium text-[#ff451d] font-sans mt-1.5 flex items-center gap-2">
                  <span>SEO Expert & WordPress Developer</span>
                </div>

                <div className={`text-xs sm:text-sm font-mono tracking-wide mt-1 transition-colors ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  SEO Specialist • WordPress Developer • Digital Growth & Web Solutions
                </div>
              </div>

              {/* Professional Bio */}
              <div className={`mt-5 space-y-3 text-sm sm:text-base leading-relaxed font-normal transition-colors duration-300 ${
                theme === "dark" ? "text-neutral-300" : "text-neutral-700"
              }`}>
                <p>
                  M. Majid is an SEO specialist and WordPress developer focused on building search-friendly, high-performing websites and improving online visibility through practical SEO strategies.
                </p>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}>
                  Specializing in technical SEO audits, clean WordPress architecture, keyword performance, and speed optimization to bridge search discoverability with smooth, human-centered digital experiences.
                </p>
              </div>

              {/* Three Strategic Focus Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6">
                
                <div className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-white/[0.03] border-white/5 hover:border-[#ff451d]/30"
                    : "bg-slate-50/80 border-neutral-200/80 hover:border-[#ff451d]/40"
                }`}>
                  <div className="flex items-center gap-2 text-[#ff451d] mb-1.5">
                    <Search className="w-4 h-4" />
                    <span className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                      Search Visibility
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}>
                    Technical, On-Page, Off-Page & Local SEO strategies.
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-white/[0.03] border-white/5 hover:border-[#ff451d]/30"
                    : "bg-slate-50/80 border-neutral-200/80 hover:border-[#ff451d]/40"
                }`}>
                  <div className="flex items-center gap-2 text-[#ff451d] mb-1.5">
                    <Code2 className="w-4 h-4" />
                    <span className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                      WordPress CMS
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}>
                    Custom themes, clean architecture & maintenance.
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-white/[0.03] border-white/5 hover:border-[#ff451d]/30"
                    : "bg-slate-50/80 border-neutral-200/80 hover:border-[#ff451d]/40"
                }`}>
                  <div className="flex items-center gap-2 text-[#ff451d] mb-1.5">
                    <Gauge className="w-4 h-4" />
                    <span className={`text-xs font-semibold ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                      Optimization
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${theme === "dark" ? "text-neutral-400" : "text-neutral-600"}`}>
                    Core Web Vitals, fast loading & audit benchmarks.
                  </p>
                </div>

              </div>

              {/* Skills & Expertise Badges */}
              <div className="mt-6 w-full">
                <span className={`text-[11px] font-bold tracking-widest font-mono uppercase block mb-3 ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  Core Capabilities & Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {EXPERTISE_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border transition-colors ${
                        theme === "dark"
                          ? "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-[#ff451d]/40 hover:text-white"
                          : "bg-white border-neutral-200 text-neutral-800 shadow-sm hover:border-[#ff451d]/40"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#ff451d]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className={`w-full h-[1px] my-6 transition-colors ${
                theme === "dark" ? "bg-neutral-800/80" : "bg-neutral-200"
              }`} />

              {/* Social Channels & Direct CTA */}
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Social Profiles */}
                <div className="flex items-center flex-wrap gap-2">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        onClick={() => playClick()}
                        onMouseEnter={() => playHover()}
                        className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 ${
                          theme === "dark"
                            ? "bg-neutral-900/90 border-neutral-800 text-neutral-400 hover:text-[#ff451d] hover:border-[#ff451d]/40 hover:bg-[#ff451d]/10"
                            : "bg-white border-neutral-200 text-neutral-600 hover:text-[#ff451d] hover:border-[#ff451d]/40 shadow-sm"
                        }`}
                        title={social.label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>

                {/* Direct Action Buttons: WhatsApp & Contact */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/923294947812?text=Hello%20Majid!%20I%20would%20like%20to%20discuss%20an%20SEO%20/%20WordPress%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] transition-all duration-200 active:scale-95"
                    title="Connect with Majid on WhatsApp (+92 329 4947812)"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Connect on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      playClick();
                      if (onContactClick) {
                        e.preventDefault();
                        onContactClick();
                      }
                    }}
                    onMouseEnter={() => playHover()}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 active:scale-95 ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20"
                        : "bg-black/5 border-black/10 text-neutral-700 hover:text-black hover:bg-black/10 hover:border-black/20"
                    }`}
                  >
                    <span>Send Message</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

        {/* Attribution note for Flaticon settings icon */}
        <div className="mt-8 text-center">
          <a
            href="https://www.flaticon.com/free-icons/settings"
            title="settings icons"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-neutral-500 hover:text-[#ff451d] transition-colors"
          >
            Settings icons created by rsetiawan - Flaticon
          </a>
        </div>

      </div>
    </section>
  );
}

