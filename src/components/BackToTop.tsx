import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

interface BackToTopProps {
  theme: "dark" | "light";
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.889 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export function BackToTop({ theme }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled past 500px (hero section)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socials = [
    { icon: WhatsAppIcon, href: "https://wa.me/923294947812?text=Hello%20Majid!%20I%20would%20like%20to%20discuss%20an%20SEO%20/%20WordPress%20project.", label: "WhatsApp (+92 329 4947812)" },
    { icon: Facebook, href: "https://www.facebook.com/people/All-In-One-Digital-Solutions/61576383253081/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/majidarain778866/", label: "Instagram" },
    { icon: Github, href: "https://github.com/majidarain778866-ui", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/ArainD41848", label: "Twitter (X)" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/majid-arain-bb6a03393/", label: "LinkedIn" },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {/* Vertical Social Media Dock */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`flex flex-col items-center gap-3 p-2 rounded-full border shadow-2xl backdrop-blur-md transition-colors duration-500 ${
          theme === "dark"
            ? "bg-neutral-950/60 border-white/5"
            : "bg-white/80 border-neutral-200/80"
        }`}
      >
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2.5 rounded-full transition-colors duration-300 ${
                theme === "dark"
                  ? "text-neutral-400 hover:text-[#ff451d] hover:bg-white/5"
                  : "text-neutral-600 hover:text-[#ff451d] hover:bg-neutral-100"
              }`}
              aria-label={social.label}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            id="back-to-top-btn"
            layout
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className={`p-3 rounded-full border shadow-2xl backdrop-blur-md transition-colors duration-300 ${
              theme === "dark"
                ? "bg-neutral-950/80 border-white/10 text-white hover:bg-neutral-900 hover:border-[#ff451d]/40"
                : "bg-white/90 border-neutral-200 text-neutral-900 hover:bg-slate-50 hover:border-[#ff451d]/40"
            }`}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#ff451d]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
