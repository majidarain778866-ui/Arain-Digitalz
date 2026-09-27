import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Shield, Globe, Award, Sparkles, Send, Volume2, VolumeX, Facebook, Instagram, Github, Twitter, Linkedin } from "lucide-react";
import { useSound } from "../context/SoundContext";

interface SitemapFooterProps {
  theme: "dark" | "light";
}

export function SitemapFooter({ theme }: SitemapFooterProps) {
  const { soundEnabled, setSoundEnabled, playClick, playHover } = useSound();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/people/All-In-One-Digital-Solutions/61576383253081/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/majidarain778866/", label: "Instagram" },
    { icon: Github, href: "https://github.com/majidarain778866-ui", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/ArainD41848", label: "Twitter (X)" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/majid-arain-bb6a03393/", label: "LinkedIn" },
  ];

  const services = [
    { name: "Brand Architecture", href: "#", icon: Sparkles },
    { name: "Interface & UX Engineering", href: "#", icon: Globe },
    { name: "WebGL & Interactive Motion", href: "#", icon: Award },
    { name: "Performance Optimization", href: "#", icon: Shield },
  ];

  const company = [
    { name: "About Arain Digitalz", href: "#" },
    { name: "Our Credentials", href: "#" },
    { name: "Philosophical Manifesto", href: "#" },
    { name: "System Status", href: "#" },
  ];

  const resources = [
    { name: "Documentation", href: "#", badge: "New" },
    { name: "Design System Guidelines", href: "#" },
    { name: "Tech Dispatch Blog", href: "#" },
    { name: "Terms of Engagement", href: "#" },
  ];

  return (
    <footer
      className={`relative z-10 border-t transition-all duration-500 overflow-hidden ${
        theme === "dark"
          ? "bg-[#030303] border-white/5 text-white"
          : "bg-slate-100/40 border-neutral-200 text-neutral-900"
      }`}
    >
      {/* Dynamic Background Light Accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#ff451d]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Sitemap Columns wrapped in Glassmorphic panel */}
        <div className={`rounded-3xl p-8 md:p-12 border transition-all duration-300 backdrop-blur-md ${
          theme === "dark"
            ? "bg-neutral-950/40 border-white/5"
            : "bg-white/60 border-neutral-200/80 shadow-sm"
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            
            {/* Column 1: Brand & Philosophy */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#ff451d] rounded-full animate-pulse" />
                <span className="font-bold tracking-widest text-sm uppercase font-sans">
                  ARAIN DIGITALZ
                </span>
              </div>
              <p className={`text-xs leading-relaxed max-w-xs ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-600"
              }`}>
                We create bespoke digital architectures optimized for visual impact, high interactivity, and absolute physical runtime speed.
              </p>
              
              {/* Social Channels Dock */}
              <div className="pt-2">
                <span className={`text-[10px] font-bold tracking-widest font-mono uppercase block mb-2 ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  Connect With Us
                </span>
                <div className="flex items-center flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClick()}
                        onMouseEnter={() => playHover()}
                        className={`p-2 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
                          theme === "dark"
                            ? "bg-white/5 border-white/5 hover:border-[#ff451d]/40 text-neutral-400 hover:text-[#ff451d] hover:bg-[#ff451d]/10"
                            : "bg-black/5 border-black/5 hover:border-[#ff451d]/40 text-neutral-600 hover:text-[#ff451d] hover:bg-[#ff451d]/10"
                        }`}
                        aria-label={social.label}
                        title={social.label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <a 
                  href="#" 
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className={`p-2 rounded-xl border transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-white/5 border-white/5 hover:border-white/10 text-neutral-400 hover:text-white" 
                      : "bg-black/5 border-black/5 hover:border-black/10 text-neutral-600 hover:text-black"
                  }`}
                  aria-label="Contact support"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="#" 
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className={`p-2 rounded-xl border transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-white/5 border-white/5 hover:border-white/10 text-neutral-400 hover:text-white" 
                      : "bg-black/5 border-black/5 hover:border-black/10 text-neutral-600 hover:text-black"
                  }`}
                  aria-label="View legal disclaimer"
                >
                  <Shield className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Sound Toggle Control Widget */}
              <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 max-w-[200px] backdrop-blur-md transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/5 border-white/5 hover:border-white/10"
                  : "bg-black/5 border-black/5 hover:border-black/10"
              }`}>
                <div className="flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#ff451d] animate-pulse" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-neutral-400" />
                  )}
                  <span className={`text-[11px] font-mono font-medium ${
                    theme === "dark" ? "text-neutral-300" : "text-neutral-700"
                  }`}>
                    Sound Feedback
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`relative w-8 h-4.5 rounded-full transition-colors duration-300 cursor-pointer ${
                    soundEnabled ? "bg-[#ff451d]" : "bg-neutral-600"
                  }`}
                  aria-label="Toggle Sound Feedback"
                >
                  <motion.div
                    layout
                    className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 left-0.5"
                    animate={{ x: soundEnabled ? 14 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest font-mono text-[#ff451d] uppercase">
                SERVICES
              </h4>
              <ul className="space-y-2.5">
                {services.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={() => playClick()}
                        onMouseEnter={() => playHover()}
                        className={`group flex items-center gap-2 text-xs transition-colors duration-200 ${
                          theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-[#ff451d] transition-all" />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest font-mono text-[#ff451d] uppercase">
                COMPANY
              </h4>
              <ul className="space-y-2.5">
                {company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className={`group flex items-center justify-between text-xs transition-colors duration-200 ${
                        theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#ff451d]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest font-mono text-[#ff451d] uppercase">
                RESOURCES
              </h4>
              <ul className="space-y-2.5">
                {resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className={`group flex items-center justify-between text-xs transition-colors duration-200 ${
                        theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.name}
                        {item.badge && (
                          <span className="text-[8px] font-bold tracking-wider font-mono text-white bg-[#ff451d] px-1.5 py-0.5 rounded-full uppercase">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#ff451d]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className={`text-[11px] font-mono transition-colors ${
            theme === "dark" ? "text-neutral-500" : "text-neutral-500"
          }`}>
            © {currentYear} Arain Digitalz. Crafted with absolute precision.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <a href="#" className={`transition-colors ${theme === "dark" ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-neutral-900"}`}>
              Privacy Policy
            </a>
            <a href="#" className={`transition-colors ${theme === "dark" ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-neutral-900"}`}>
              Terms of Use
            </a>
            <a href="#" className={`transition-colors ${theme === "dark" ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-neutral-900"}`}>
              Security Architecture
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
