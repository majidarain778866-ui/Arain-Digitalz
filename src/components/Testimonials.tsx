import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  project: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Arain Digitalz completely reimagined our customer portal. The resulting design isn't just visually spectacular; it increased our conversion rate by 42% in the first quarter alone.",
    name: "Sarah Jenkins",
    role: "Head of Product",
    company: "zantic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    project: "Customer Portal & UX Strategy"
  },
  {
    id: 2,
    quote: "They don't build standard templates. They build digital interfaces optimized for actual human psychology. The level of animation craft and attention to spacing is outstanding.",
    name: "Marcus Vance",
    role: "Tech Lead",
    company: "Crona",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    project: "Modular System & Architecture"
  },
  {
    id: 3,
    quote: "Working with Arain Digitalz was a revelation. Their custom design-to-code workflow saved us months of development. Responsive layouts feel fluid, precise, and uniquely bespoke.",
    name: "Elena Rostova",
    role: "Creative Director",
    company: "Mercury Solutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    project: "Brand Experience & Web Interface"
  },
  {
    id: 4,
    quote: "Absolute perfectionists. They listened to our brand values and translated them into an immersive digital reality that our clients rave about. The user engagement speaks for itself.",
    name: "Devendra Naidoo",
    role: "Founder & CEO",
    company: "BookStore",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    project: "Bespoke E-Commerce Space"
  }
];

interface TestimonialsProps {
  theme: "dark" | "light";
}

export function Testimonials({ theme }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const duration = 6000; // 6 seconds per testimonial
  const intervalStep = 50; // Update progress every 50ms

  // Handle slide transitions
  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setProgress(0);
  };

  const handleSelect = (idx: number) => {
    if (idx === index) return;
    setDirection(idx > index ? 1 : -1);
    setIndex(idx);
    setProgress(0);
  };

  // Manage auto-slide timer and visual progress bar
  useEffect(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isPlaying) {
      const startTime = Date.now();
      const initialProgress = progress;

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100 + initialProgress, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          handleNext();
        }
      }, intervalStep);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, index]);

  // Framer Motion variants for sliding carousel
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  const currentTestimonial = TESTIMONIALS[index];

  return (
    <section 
      id="testimonials"
      className={`relative py-24 overflow-hidden border-t transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-[#030303] border-white/5 text-white' 
          : 'bg-slate-50/50 border-neutral-200 text-neutral-900'
      }`}
    >
      {/* Visual Accent Background Elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ff451d]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

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
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>TESTIMONIALS</span>
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
            Trusted by modern <span className="font-serif italic text-[#ff451d] font-normal drop-shadow-[0_2px_15px_rgba(255,69,29,0.1)]">innovators</span>.
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
            We partner with visionary companies to design, build, and optimize memorable web environments.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[440px] md:min-h-[380px] flex items-center justify-center">
          
          {/* Main Card with AnimatePresence for smooth slide/fade */}
          <div className="w-full max-w-4xl relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`w-full rounded-3xl p-8 md:p-12 border relative transition-all duration-300 shadow-xl overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-neutral-950/40 border-white/10 backdrop-blur-md shadow-black/25'
                    : 'bg-white/80 border-neutral-200/80 backdrop-blur-md shadow-neutral-200/50'
                }`}
              >
                {/* Huge Background Quote Icon */}
                <Quote 
                  className={`absolute -right-4 -bottom-4 w-48 h-48 opacity-[0.03] select-none pointer-events-none transform rotate-180 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`} 
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
                  
                  {/* Left Column: Author Image & Details */}
                  <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="relative mb-4 group">
                      <div className="absolute inset-0 bg-[#ff451d]/15 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                      <img 
                        src={currentTestimonial.avatar} 
                        alt={currentTestimonial.name}
                        referrerPolicy="no-referrer"
                        className={`w-24 h-24 rounded-2xl object-cover relative z-10 border transition-transform duration-300 group-hover:scale-105 ${
                          theme === 'dark' ? 'border-white/10' : 'border-neutral-200'
                        }`}
                      />
                    </div>

                    <h4 className={`text-lg font-bold tracking-tight ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {currentTestimonial.name}
                    </h4>
                    
                    <p className={`text-xs font-medium mt-0.5 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {currentTestimonial.role}
                    </p>
                    
                    <p className="text-xs font-bold text-[#ff451d] uppercase tracking-wider mt-1.5 font-mono">
                      @{currentTestimonial.company}
                    </p>

                    <div className={`text-[10px] font-semibold uppercase tracking-wider font-mono mt-4 px-2.5 py-1 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'bg-white/5 text-neutral-400 border border-white/5' 
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}>
                      {currentTestimonial.project}
                    </div>
                  </div>

                  {/* Right Column: Quote & Rating */}
                  <div className="md:col-span-8 flex flex-col justify-center">
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-6 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 fill-current ${
                            i < currentTestimonial.rating ? 'text-amber-500' : 'text-neutral-300'
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Actual Quote */}
                    <blockquote className={`text-lg sm:text-xl md:text-2xl font-medium leading-relaxed tracking-wide italic font-serif relative mb-6 text-center md:text-left ${
                      theme === 'dark' ? 'text-neutral-100' : 'text-neutral-800'
                    }`}>
                      <Quote className="w-8 h-8 text-[#ff451d]/40 absolute -left-6 -top-5 hidden sm:inline" />
                      "{currentTestimonial.quote}"
                    </blockquote>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Overlay Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden lg:flex justify-between pointer-events-none px-4">
            <button
              onClick={handlePrev}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-950/80 border-white/10 hover:border-white/20 text-neutral-400 hover:text-white hover:bg-neutral-900 shadow-lg shadow-black/40'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-50 shadow-md shadow-neutral-200'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleNext}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-950/80 border-white/10 hover:border-white/20 text-neutral-400 hover:text-white hover:bg-neutral-900 shadow-lg shadow-black/40'
                  : 'bg-white/90 border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-50 shadow-md shadow-neutral-200'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Footer Navigation Bar: Progress bar, indicators, play/pause controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 max-w-4xl mx-auto border-t border-dashed border-neutral-800/40 pt-8">
          
          {/* Pause / Play Control */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                  : 'bg-black/5 border-black/10 text-neutral-600 hover:text-black hover:bg-black/10'
              }`}
              aria-label={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <span className={`text-xs font-mono tracking-wider transition-colors ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              {isPlaying ? "AUTO-SLIDING ACTIVE" : "SLIDESHOW PAUSED"}
            </span>
          </div>

          {/* Interactive Pagination Dots with Progress Indicator */}
          <div className="flex items-center gap-4">
            {TESTIMONIALS.map((t, idx) => {
              const isCurrent = idx === index;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(idx)}
                  className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  <div className="relative w-8 sm:w-12 h-1 bg-neutral-300/20 dark:bg-neutral-800/60 rounded-full overflow-hidden">
                    {/* Fill layer for active item */}
                    {isCurrent && (
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-[#ff451d]"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {/* Static high-opacity fill if it is current but paused or static */}
                    {!isCurrent && (
                      <div className="absolute inset-0 bg-transparent transition-colors" />
                    )}
                  </div>
                  
                  <span className={`text-[10px] font-mono transition-colors font-bold ${
                    isCurrent 
                      ? 'text-[#ff451d]' 
                      : (theme === 'dark' ? 'text-neutral-600 hover:text-neutral-400' : 'text-neutral-400 hover:text-neutral-600')
                  }`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Arrows for manual control on touch/smaller viewports */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={handlePrev}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                  : 'bg-black/5 border-black/10 text-neutral-600 hover:text-black'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                  : 'bg-black/5 border-black/10 text-neutral-600 hover:text-black'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
