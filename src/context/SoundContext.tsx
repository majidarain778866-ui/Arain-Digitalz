import React, { createContext, useContext, useState, useEffect } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
  playToggle: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem("sound_feedback_enabled");
    return saved ? saved === "true" : false; // Default to muted/off to respect user audio preferences initially
  });

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem("sound_feedback_enabled", String(enabled));
    if (enabled) {
      // Play a tiny confirmation chime when turning sounds on
      setTimeout(() => synthTone(600, "sine", 0.08, 0.04), 50);
      setTimeout(() => synthTone(800, "sine", 0.06, 0.05), 100);
    }
  };

  // Synthesize soft, elegant procedural sounds with Web Audio API
  const synthTone = (
    frequency: number,
    type: OscillatorType = "sine",
    duration = 0.1,
    gainValue = 0.05,
    exponentialDecay = true
  ) => {
    if (!soundEnabled) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Ultra-fast gentle attack to prevent transient pops
      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + 0.005);

      if (exponentialDecay) {
        gainNode.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + duration
        );
      } else {
        gainNode.gain.linearRampToValueAtTime(
          0.0001,
          ctx.currentTime + duration
        );
      }

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      // Clean up audio context
      setTimeout(() => {
        ctx.close();
      }, (duration + 0.1) * 1000);
    } catch (e) {
      // Ignore audio failures (e.g. browser autoplay restrictions)
    }
  };

  const playClick = () => {
    // Elegant low-velocity soft click (wooden/organic mechanical style)
    synthTone(440, "sine", 0.04, 0.06, true);
  };

  const playHover = () => {
    // High-frequency subtle soft tick
    synthTone(1200, "sine", 0.02, 0.012, true);
  };

  const playToggle = () => {
    // Subtle double slide
    synthTone(520, "sine", 0.06, 0.04, true);
    setTimeout(() => {
      synthTone(660, "sine", 0.05, 0.03, true);
    }, 40);
  };

  const playSuccess = () => {
    // Peaceful ascending clean chord
    synthTone(523.25, "sine", 0.15, 0.03, true); // C5
    setTimeout(() => {
      synthTone(659.25, "sine", 0.15, 0.03, true); // E5
    }, 60);
    setTimeout(() => {
      synthTone(783.99, "sine", 0.2, 0.03, true); // G5
    }, 120);
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        playClick,
        playHover,
        playSuccess,
        playToggle,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
