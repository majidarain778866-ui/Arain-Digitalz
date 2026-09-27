/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  Sparkles, 
  Layers, 
  Compass, 
  Cpu, 
  Dribbble,
  Radio,
  ExternalLink,
  BookOpen,
  Menu,
  X,
  Sliders,
  Maximize2,
  Minimize2,
  Monitor,
  Layout,
  Play,
  Volume2,
  VolumeX,
  Award,
  Trophy,
  ShieldCheck,
  Sun,
  Moon
} from "lucide-react";
import { MagneticButton } from "./components/MagneticButton";
import { ContactModal } from "./components/ContactModal";
import { Testimonials } from "./components/Testimonials";
import { Newsletter } from "./components/Newsletter";
import { FAQSection } from "./components/FAQSection";
import { CustomCursor } from "./components/CustomCursor";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { TechStack } from "./components/TechStack";
import { SitemapFooter } from "./components/SitemapFooter";
import { TeamSection } from "./components/TeamSection";
import { BackToTop } from "./components/BackToTop";
import { SearchSections } from "./components/SearchSections";
import { QuickFeedbackDrawer } from "./components/QuickFeedbackDrawer";
import { Header } from "./components/Header";
import { SmoothLoader } from "./components/SmoothLoader";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";
import { useSound } from "./context/SoundContext";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const heroChildVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function App() {
  const { soundEnabled, setSoundEnabled, playClick, playHover, playToggle, playSuccess } = useSound();
  const [activeTab, setActiveTab] = useState("Home");
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Interactive count-up state for stats
  const [projectsCount, setProjectsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    // Count up animation for Projects
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setProjectsCount(Math.floor((150 / steps) * step));
      setSatisfactionCount(Math.floor((98 / steps) * step));
      if (step >= steps) {
        clearInterval(timer);
        setProjectsCount(150);
        setSatisfactionCount(98);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 selection:bg-[#ff451d]/30 selection:text-[#ff451d] ${
      theme === "dark" ? "bg-black text-white" : "bg-slate-50 text-neutral-900"
    }`}>
      
      {/* Facebook-style Smooth Top Loader & Skeleton Shimmer Screen */}
      <SmoothLoader 
        isLoading={isPageLoading} 
        theme={theme} 
        onFinished={() => setIsPageLoading(false)} 
      />

      {/* Custom Stylized Cursor */}
      <CustomCursor theme={theme} />
      
      {/* Global Page Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-screen relative flex flex-col"
      >
      
      {/* HERO SECTION WITH VIDEO BACKGROUND */}
      <div className={`relative border-b transition-colors duration-500 ${
        theme === 'dark' ? 'border-neutral-900/40' : 'border-neutral-200/60'
      }`}>
        
        {/* Background Video Layer - ONLY for Hero Section (Fixed behind) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video 
            src="https://res.cloudinary.com/dikrzzri0/video/upload/v1782546322/yaar_prompt_aisi_de_ke_robot_s_1_fij1lt.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              theme === 'dark' ? 'opacity-90' : 'opacity-20'
            }`}
          />
          {/* Subtle overlay color transition */}
          <div className={`absolute inset-0 transition-colors duration-500 ${
            theme === 'dark' ? 'bg-black/40' : 'bg-white/80'
          }`} />
        </div>

        {/* Decorative top-most subtle ambient light line */}
        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent transition-all duration-500 ${
          theme === 'dark' ? 'via-neutral-800/40' : 'via-neutral-300/40'
        }`} />

        {/* Universal Responsive Header (Desktop, Tablet, Mobile) */}
        <Header
          theme={theme}
          onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onOpenContact={() => setContactOpen(true)}
          playClick={playClick}
          playHover={playHover}
          playToggle={playToggle}
          playSuccess={playSuccess}
          onRefreshLoading={() => setIsPageLoading(true)}
        />

        {/* Main Hero Copy Grid Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-14 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* LEFT AREA: Hero Copy, Badge, CTA */}
            <motion.div 
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-8 flex flex-col justify-start"
            >
              
              {/* World Support Badge */}
              <motion.div 
                variants={heroChildVariants}
                className="flex items-start gap-3 mb-8"
              >
                <div className="p-1 mt-0.5">
                  <Globe className={`w-5 h-5 stroke-[1.5] transition-colors ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[11px] md:text-xs font-semibold tracking-[0.15em] leading-tight transition-colors ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    HUB SUPPORT PEOPLE FROM
                  </span>
                  <span className={`text-[11px] md:text-xs font-semibold tracking-[0.15em] leading-tight transition-colors ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    ALL OVER THE WORLD
                  </span>
                </div>
              </motion.div>

              {/* Giant Replicated Typography Heading */}
              <h1 className={`text-[2.5rem] min-[360px]:text-[2.85rem] min-[400px]:text-5xl sm:text-7xl lg:text-[8rem] font-medium leading-[1.03] tracking-tight select-none transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                <motion.div
                  variants={heroChildVariants}
                  className="block"
                >
                  Technology
                </motion.div>
                
                <motion.div
                  variants={heroChildVariants}
                  className="block mt-1 sm:mt-2"
                >
                  Crafted for <span className="font-serif italic text-[#ff451d] font-normal tracking-normal px-1 drop-shadow-[0_2px_20px_rgba(255,69,29,0.15)]">All</span>
                </motion.div>
                
                <motion.div
                  variants={heroChildVariants}
                  className="block mt-1 sm:mt-2"
                >
                  <span className={`font-serif italic font-normal tracking-normal mr-2 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>Not</span> 
                  <span className="font-serif italic text-[#ff451d] font-normal tracking-normal drop-shadow-[0_2px_20px_rgba(255,69,29,0.15)]">Machines</span>
                </motion.div>
              </h1>

              {/* Subtitle Description */}
              <motion.p 
                variants={heroChildVariants}
                className={`text-base sm:text-lg max-w-xl mt-8 mb-10 font-normal leading-relaxed tracking-wide transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                We create clear, intuitive, and accessible digital experiences shaped by real human behavior.
              </motion.p>

              {/* Actions: CTA and Happy Clients Overlapping */}
              <motion.div 
                variants={heroChildVariants}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
              >
                
                {/* Vibrant CTA Button with Magnetic hover effect */}
                <MagneticButton 
                  id="cta-get-started"
                  className="group relative flex items-center bg-gradient-to-r from-[#ff3c00] to-[#ff5224] text-white pl-7 pr-3 py-3.5 rounded-full text-base font-semibold shadow-[0_8px_30px_rgb(255,69,29,0.25)] hover:shadow-[0_12px_40px_rgb(255,69,29,0.4)] cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10 mr-4">Get started</span>
                  <div className="relative z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
                  </div>
                  {/* Subtle backglow overlay */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </MagneticButton>

                {/* Happy Clients Badge */}
                <div className="flex items-center gap-4 py-2">
                  {/* Overlapping Avatar Stack */}
                  <div className="flex -space-x-3.5">
                    <img 
                      className={`w-10 h-10 rounded-full border-2 object-cover shadow-lg hover:scale-110 hover:z-20 transition-transform duration-200 ${
                        theme === 'dark' ? 'border-black' : 'border-white'
                      }`}
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Client female portrait" 
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      className={`w-10 h-10 rounded-full border-2 object-cover shadow-lg hover:scale-110 hover:z-20 transition-transform duration-200 ${
                        theme === 'dark' ? 'border-black' : 'border-white'
                      }`}
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Client male portrait" 
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      className={`w-10 h-10 rounded-full border-2 object-cover shadow-lg hover:scale-110 hover:z-20 transition-transform duration-200 ${
                        theme === 'dark' ? 'border-black' : 'border-white'
                      }`}
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" 
                      alt="Client portrait smiling" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Clients description */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-neutral-400' : 'bg-neutral-500'}`} />
                      <span className={`text-sm font-medium tracking-wide transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-800'
                      }`}>
                        800+ Happy Clients
                      </span>
                    </div>
                    <span className={`text-xs font-light mt-0.5 transition-colors ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      Over 5 years
                    </span>
                  </div>
                </div>

              </motion.div>

            </motion.div>

            {/* RIGHT AREA: Empty spacer on large screens */}
            <div className="hidden lg:block lg:col-span-4" />

          </div>
        </div>

        {/* Sleek, subtle Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          onClick={() => {
            const nextSection = document.getElementById("lower-section");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <span className={`text-[10px] font-bold tracking-[0.35em] uppercase font-mono transition-colors group-hover:text-[#ff451d] select-none ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className={`flex items-center justify-center w-8 h-8 rounded-full border bg-black/40 backdrop-blur-sm group-hover:border-[#ff451d]/30 group-hover:bg-[#ff451d]/5 transition-all duration-300 ${
              theme === 'dark' ? 'border-neutral-800/40' : 'border-neutral-300/60'
            }`}
          >
            <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-[#ff451d] transition-colors" />
          </motion.div>
        </motion.div>

      </div>

      {/* LOWER SECTION: GLASSMORPHISM BACKGROUND */}
      <div 
        id="lower-section" 
        className={`relative z-10 pt-16 pb-24 border-t transition-colors duration-500 ${
          theme === 'dark' 
            ? 'bg-black/40 backdrop-blur-xl border-white/5' 
            : 'bg-white/40 backdrop-blur-xl border-black/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            
            {/* Stats Cards Cluster (Bottom-Left Alignment) */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4">
              
              {/* Card 1: Projects Delivered */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 69, 29, 0.4)", boxShadow: "0 10px 30px rgba(255, 69, 29, 0.05)" }}
                className={`flex-1 backdrop-blur-md rounded-2xl p-6 relative transition-all duration-300 group border ${
                  theme === 'dark'
                    ? 'bg-[#0a0503]/70 border-[#ff451d]/15'
                    : 'bg-white/70 border-[#ff451d]/20 shadow-md shadow-black/5'
                }`}
              >
                {/* Decorative Small Accent Glow inside card */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff451d]/5 rounded-full blur-xl pointer-events-none" />
                
                {/* Star icon at top right */}
                <div className="absolute top-4 right-4 text-[#ff451d] transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Star className="w-4 h-4 fill-current" />
                </div>

                <div className={`text-4xl md:text-5xl font-semibold tracking-tight mb-2.5 font-sans transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {projectsCount}+
                </div>
                
                <div className={`text-[11px] font-bold tracking-wider font-mono flex items-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  PROJECTS DELIVERED<span className="text-[#ff451d] ml-0.5">*</span>
                </div>
              </motion.div>

              {/* Card 2: Client Satisfaction */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 69, 29, 0.3)", boxShadow: "0 10px 30px rgba(255, 69, 29, 0.03)" }}
                className={`flex-1 backdrop-blur-md rounded-2xl p-6 relative transition-all duration-300 group border ${
                  theme === 'dark'
                    ? 'bg-[#050505]/70 border-neutral-800'
                    : 'bg-white/70 border-neutral-200 shadow-md shadow-black/5'
                }`}
              >
                {/* Outlined star icon at top right */}
                <div className="absolute top-4 right-4 text-neutral-500 group-hover:text-[#ff451d] transition-colors duration-300">
                  <Star className="w-4 h-4" />
                </div>

                <div className={`text-4xl md:text-5xl font-semibold tracking-tight mb-2.5 font-sans transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {satisfactionCount}%
                </div>
                
                <div className={`text-[11px] font-bold tracking-wider font-mono flex items-center transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  CLIENT SATISFACTION<span className="text-[#ff451d] ml-0.5">*</span>
                </div>
              </motion.div>

            </div>

            {/* Partners List (Aligned perfectly with bottom right) */}
            <div className="lg:col-span-7 flex flex-col justify-end">
              
              {/* "OUR PARTNERS" subtitle label */}
              <span className={`text-[10px] font-bold tracking-[0.2em] font-mono uppercase mb-5 block text-left lg:text-left pl-1 transition-colors ${
                theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                OUR PARTNERS
              </span>

              {/* Horizontal Partners Grid/Row */}
              <div className={`flex flex-wrap items-center gap-x-8 gap-y-5 border-l-0 lg:border-l py-1 transition-all ${
                theme === 'dark' 
                  ? 'text-neutral-400 lg:border-neutral-800 lg:pl-8' 
                  : 'text-neutral-600 lg:border-neutral-200 lg:pl-8'
              }`}>
                
                {/* Brand 1: BookStore */}
                <div className={`flex items-center gap-2 group cursor-pointer transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
                }`}>
                  <Globe className="w-4 h-4 stroke-[1.8] text-neutral-500 group-hover:text-current group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-semibold tracking-tight">BookStore</span>
                </div>

                <div className={`hidden sm:block text-sm ${theme === 'dark' ? 'text-neutral-800' : 'text-neutral-300'}`}>|</div>

                {/* Brand 2: zantic */}
                <div className={`flex items-center gap-2 group cursor-pointer transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
                }`}>
                  <Compass className="w-4 h-4 stroke-[1.8] text-neutral-500 group-hover:text-current group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold tracking-tight">zantic</span>
                </div>

                <div className={`hidden sm:block text-sm ${theme === 'dark' ? 'text-neutral-800' : 'text-neutral-300'}`}>|</div>

                {/* Brand 3: Crona */}
                <div className={`flex items-center gap-2 group cursor-pointer transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
                }`}>
                  <Layers className="w-4 h-4 stroke-[1.8] text-neutral-500 group-hover:text-current group-hover:-translate-y-0.5 transition-transform" />
                  <span className="text-sm font-semibold tracking-tight">Crona</span>
                </div>

                <div className={`hidden sm:block text-sm ${theme === 'dark' ? 'text-neutral-800' : 'text-neutral-300'}`}>|</div>

                {/* Brand 4: Mercury */}
                <div className={`flex items-center gap-2 group cursor-pointer transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
                }`}>
                  <Cpu className="w-4 h-4 stroke-[1.8] text-neutral-500 group-hover:text-current group-hover:rotate-45 transition-transform" />
                  <span className="text-sm font-semibold tracking-tight">Mercury</span>
                </div>

                <div className={`hidden sm:block text-sm ${theme === 'dark' ? 'text-neutral-800' : 'text-neutral-300'}`}>|</div>

                {/* Brand 5: Wagor */}
                <div className={`flex items-center gap-1.5 group cursor-pointer transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
                }`}>
                  <span className="text-neutral-500 group-hover:text-current transition-colors">^</span>
                  <span className="text-sm font-semibold tracking-tight">Wagor</span>
                </div>

              </div>

            </div>

          </div>

          {/* Divider Line */}
          <div className={`h-[1px] bg-gradient-to-r from-transparent to-transparent my-16 ${
            theme === 'dark' ? 'via-neutral-800/60' : 'via-neutral-300/60'
          }`} />

          {/* AWARDS & RECOGNITION SECTION */}
          <div className="mt-8">
            <div className="flex flex-col items-start mb-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff451d] font-mono uppercase mb-2">
                AWARDS & RECOGNITION
              </span>
              <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                Industry-proven trust and digital excellence.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Award 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 69, 29, 0.3)", boxShadow: "0 10px 30px rgba(255, 69, 29, 0.05)" }}
                className={`backdrop-blur-md rounded-2xl p-6 relative transition-all duration-300 group overflow-hidden border ${
                  theme === 'dark'
                    ? 'bg-[#050505]/60 border-neutral-800/80'
                    : 'bg-white/60 border-neutral-200/80 shadow-md shadow-black/5'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff451d]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff451d]/10 transition-colors duration-300" />
                <div className="mb-4 text-[#ff451d]">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-xl bg-[#ff451d]/10 flex items-center justify-center border border-[#ff451d]/20"
                  >
                    <Award className="w-5 h-5 text-[#ff451d]" />
                  </motion.div>
                </div>
                <h3 className={`text-base font-semibold mb-1 group-hover:text-[#ff451d] transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  Best Digital Agency
                </h3>
                <span className={`text-[10px] font-bold tracking-wider font-mono uppercase block mb-3 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  GLOBAL DESIGN AWARDS 2026
                </span>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Recognized for outstanding visual craft, precise animation architecture, and immersive human experiences.
                </p>
              </motion.div>

              {/* Award 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 69, 29, 0.3)", boxShadow: "0 10px 30px rgba(255, 69, 29, 0.05)" }}
                className={`backdrop-blur-md rounded-2xl p-6 relative transition-all duration-300 group overflow-hidden border ${
                  theme === 'dark'
                    ? 'bg-[#050505]/60 border-neutral-800/80'
                    : 'bg-white/60 border-neutral-200/80 shadow-md shadow-black/5'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff451d]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff451d]/10 transition-colors duration-300" />
                <div className="mb-4 text-[#ff451d]">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-xl bg-[#ff451d]/10 flex items-center justify-center border border-[#ff451d]/20"
                  >
                    <Trophy className="w-5 h-5 text-[#ff451d]" />
                  </motion.div>
                </div>
                <h3 className={`text-base font-semibold mb-1 group-hover:text-[#ff451d] transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  Innovation in Tech
                </h3>
                <span className={`text-[10px] font-bold tracking-wider font-mono uppercase block mb-3 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  TECH PIONEERS FORUM
                </span>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Awarded for pioneering modular design systems, dynamic content interactions, and web optimization practices.
                </p>
              </motion.div>

              {/* Award 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5, borderColor: "rgba(255, 69, 29, 0.3)", boxShadow: "0 10px 30px rgba(255, 69, 29, 0.05)" }}
                className={`backdrop-blur-md rounded-2xl p-6 relative transition-all duration-300 group overflow-hidden border ${
                  theme === 'dark'
                    ? 'bg-[#050505]/60 border-neutral-800/80'
                    : 'bg-white/60 border-neutral-200/80 shadow-md shadow-black/5'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff451d]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff451d]/10 transition-colors duration-300" />
                <div className="mb-4 text-[#ff451d]">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-xl bg-[#ff451d]/10 flex items-center justify-center border border-[#ff451d]/20"
                  >
                    <ShieldCheck className="w-5 h-5 text-[#ff451d]" />
                  </motion.div>
                </div>
                <h3 className={`text-base font-semibold mb-1 group-hover:text-[#ff451d] transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  Certified Quality
                </h3>
                <span className={`text-[10px] font-bold tracking-wider font-mono uppercase block mb-3 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  HUMAN-CENTERED STANDARDS
                </span>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Certified for building highly accessible, intuitive, and conversion-optimized software tailored for human use.
                </p>
              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* Team Section with Transparent Background */}
      <TeamSection theme={theme} onContactClick={() => setContactOpen(true)} />

      {/* Featured Projects Section */}
      <FeaturedProjects theme={theme} />

      {/* Technology Stack Section */}
      <TechStack theme={theme} />

      {/* Testimonials Section */}
      <Testimonials theme={theme} />

      {/* Interactive FAQ Accordion Section */}
      <FAQSection theme={theme} />

      {/* Newsletter Subscription CTA Section */}
      <Newsletter theme={theme} />

      {/* Sitemap Footer Section */}
      <SitemapFooter theme={theme} />

      {/* Modern Contact Form Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} theme={theme} />

      {/* Back to Top Button */}
      <BackToTop theme={theme} />

      {/* Floating Quick Feedback Drawer */}
      <QuickFeedbackDrawer theme={theme} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton theme={theme} phoneNumber="+92 329 4947812" />

      </motion.div>
    </div>
  );
}

