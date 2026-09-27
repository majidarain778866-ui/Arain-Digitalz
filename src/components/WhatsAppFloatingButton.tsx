import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useSound } from "../context/SoundContext";

interface WhatsAppFloatingButtonProps {
  theme: "dark" | "light";
  phoneNumber?: string;
}

export function WhatsAppFloatingButton({ 
  theme, 
  phoneNumber = "+92 329 4947812" 
}: WhatsAppFloatingButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { playClick, playHover } = useSound();

  // Format clean digits for wa.me API link: 923294947812
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const defaultMessage = encodeURIComponent(
    "Hello Majid! I visited your website and would like to discuss an SEO / WordPress project."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <div 
      className="fixed bottom-8 left-6 sm:left-8 z-50 flex flex-col items-start gap-3 select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Floating Info / Quick Chat Bubble */}
      <AnimatePresence>
        {(showTooltip && !isDismissed) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`relative max-w-xs p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-neutral-950/95 border-neutral-800 text-white shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                : "bg-white/95 border-neutral-200 text-neutral-900 shadow-xl shadow-neutral-300/40"
            }`}
          >
            {/* Close tooltip button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                theme === "dark" 
                  ? "text-neutral-400 hover:text-white hover:bg-neutral-800" 
                  : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              }`}
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3 mb-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,211,102,0.4)]">
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.889 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                {/* Active Online Indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-black rounded-full" />
              </div>

              <div>
                <div className="text-xs font-bold font-sans">M. Majid</div>
                <div className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online • Quick response</span>
                </div>
              </div>
            </div>

            <p className={`text-xs leading-relaxed mb-3 ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-600"
            }`}>
              Hi! Need an SEO audit, WordPress project, or custom web solution? Chat directly on WhatsApp.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs shadow-[0_4px_15px_rgba(37,211,102,0.35)] transition-all duration-200"
            >
              <span>Message {phoneNumber}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Little downward arrow anchor */}
            <div className={`absolute -bottom-1.5 left-6 w-3 h-3 rotate-45 border-b border-r ${
              theme === "dark" 
                ? "bg-neutral-950 border-neutral-800" 
                : "bg-white border-neutral-200"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating WhatsApp Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playClick()}
        onMouseEnter={() => {
          playHover();
          setShowTooltip(true);
        }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 p-3.5 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.65)] transition-all duration-300 cursor-pointer border border-white/20"
        aria-label={`Chat with M. Majid on WhatsApp: ${phoneNumber}`}
        title={`Chat with M. Majid on WhatsApp: ${phoneNumber}`}
      >
        {/* Pulsing ambient ripple effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg className="w-6 h-6 fill-current relative z-10 drop-shadow-md" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.889 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>

        {/* Text Label on desktop */}
        <div className="hidden sm:flex flex-col items-start relative z-10 text-left pr-1">
          <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-100 font-semibold leading-tight">
            WhatsApp Chat
          </span>
          <span className="text-xs font-bold text-white tracking-wide leading-tight">
            {phoneNumber}
          </span>
        </div>
      </motion.a>
    </div>
  );
}
