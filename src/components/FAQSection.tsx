import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useSound } from "../context/SoundContext";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What services does Arain Digitalz specialize in?",
    answer: "We specialize in crafting elite, high-performance digital products. Our capabilities include bespoke design-to-code frontend development, immersive interaction architecture, full-stack application systems, decoupled headless CMS integrations, and conversion-focused web applications."
  },
  {
    question: "How does the custom design-to-code workflow work?",
    answer: "We design directly within interactive high-fidelity environments rather than just offering static layout files. This completely bridges the gap between creative design and production-ready code, slashing typical development timelines by up to 40% and eliminating visual regression entirely."
  },
  {
    question: "Can you collaborate with our in-house engineering team?",
    answer: "Absolutely. We are highly flexible. We can function as your fully outsourced product team or build modular, reusable React/TypeScript component systems and design-system guidelines that integrate seamlessly into your engineering team's existing pipeline."
  },
  {
    question: "How do you ensure peak performance and fluid accessibility?",
    answer: "We build with extreme precision. We utilize mobile-first layouts, strict responsive design rules, fluid typography, optimized vector assets, and optimized state management. Every build is benchmarked to guarantee stellar loading speed, SEO visibility, and full digital accessibility."
  },
  {
    question: "What is your typical project timeline and onboarding process?",
    answer: "Typical digital sprint cycles range from 3 to 8 weeks depending on scope. Onboarding begins with an immersive discovery session, followed immediately by collaborative interactive sprints, weekly builds, and a comprehensive code handoff with integrated documentation."
  }
];

interface FAQSectionProps {
  theme: "dark" | "light";
}

export function FAQSection({ theme }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { playToggle, playHover } = useSound();

  const handleToggle = (index: number) => {
    playToggle();
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`relative py-24 transition-colors duration-500 overflow-hidden ${
        theme === "dark"
          ? "bg-[#050505] border-t border-white/5 text-white"
          : "bg-slate-50 border-t border-neutral-200 text-neutral-900"
      }`}
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff451d]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff451d]/15 bg-[#ff451d]/5 text-[#ff451d] text-[10px] font-bold uppercase tracking-wider font-mono"
          >
            <HelpCircle className="w-3 h-3 text-[#ff451d]" />
            <span>CUSTOMER INTELLIGENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-4xl font-semibold tracking-tight transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-neutral-900"
            }`}
          >
            Common <span className="font-serif italic text-[#ff451d] font-normal">Questions</span> Answered.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm max-w-lg mx-auto leading-relaxed transition-colors duration-300 ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Everything you need to know about our modern design workflow, technical capabilities, and project delivery.
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  theme === "dark"
                    ? isOpen
                      ? "bg-[#0c0c0c] border-[#ff451d]/35 shadow-[0_0_20px_rgba(255,69,29,0.04)]"
                      : "bg-[#0a0a0a]/50 border-white/5 hover:border-white/10 hover:bg-[#0d0d0d]/80"
                    : isOpen
                      ? "bg-white border-[#ff451d]/35 shadow-md shadow-neutral-200/50"
                      : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => handleToggle(index)}
                  onMouseEnter={() => playHover()}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-semibold tracking-tight transition-colors duration-200 ${
                    isOpen 
                      ? "text-[#ff451d]" 
                      : theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                  }`}>
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-all duration-300 ${
                    isOpen
                      ? "bg-[#ff451d]/10 text-[#ff451d] rotate-180"
                      : theme === "dark"
                        ? "bg-white/5 text-neutral-400"
                        : "bg-neutral-100 text-neutral-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={`px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                        theme === "dark" 
                          ? "border-white/[0.03] text-neutral-400" 
                          : "border-neutral-100 text-neutral-600"
                      }`}>
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic CTA Footer inside FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`mt-12 text-center p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === "dark"
              ? "bg-[#070707]/60 border-white/5"
              : "bg-white/50 border-neutral-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#ff451d]/10 rounded-xl">
              <Sparkles className="w-4 h-4 text-[#ff451d]" />
            </div>
            <div className="text-left">
              <div className={`text-xs font-bold ${theme === "dark" ? "text-white" : "text-neutral-900"}`}>
                Have a more custom question?
              </div>
              <div className="text-[10px] text-neutral-500 font-mono">
                Our design architects are ready to assist.
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 bg-[#ff451d] hover:bg-[#ff451d]/90 text-white rounded-lg text-xs font-semibold transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Ask our team
          </a>
        </motion.div>

      </div>
    </section>
  );
}
