import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  theme: "dark" | "light";
}

export function CustomCursor({ theme }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "click">("default");

  // Track position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (desktops)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    setIsVisible(true);

    // Add CSS globally to hide standard cursor on desktop
    const style = document.createElement("style");
    style.innerHTML = `
      @media (pointer: fine) {
        a, button, [role="button"], input, textarea, select, .cursor-pointer {
          cursor: none !important;
        }
        body, html, * {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      if (isInteractive) {
        setCursorType("hover");
      }
    };

    const onMouseOut = () => {
      setCursorType("default");
    };

    const onMouseDown = () => {
      setCursorType("click");
    };

    const onMouseUp = () => {
      setCursorType("hover");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hide custom cursor when mouse leaves the viewport
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      setIsVisible(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // Sizes based on hover state
  const outerSize = cursorType === "hover" ? 44 : cursorType === "click" ? 30 : 22;
  const innerSize = cursorType === "hover" ? 6 : cursorType === "click" ? 4 : 6;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Glow / Circle ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: outerSize,
          height: outerSize,
        }}
        animate={{
          borderColor: cursorType === "click" 
            ? "#ff451d" 
            : theme === "dark" 
              ? "rgba(255, 255, 255, 0.45)" 
              : "rgba(0, 0, 0, 0.45)",
          backgroundColor: cursorType === "hover"
            ? "rgba(255, 69, 29, 0.08)"
            : cursorType === "click"
              ? "rgba(255, 69, 29, 0.2)"
              : "rgba(255, 69, 29, 0)",
          borderWidth: cursorType === "click" ? 2 : 1,
        }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        className="rounded-full border border-solid pointer-events-none absolute"
      />

      {/* Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: innerSize,
          height: innerSize,
        }}
        animate={{
          scale: cursorType === "click" ? 0.7 : 1,
          backgroundColor: cursorType === "hover" || cursorType === "click" 
            ? "#ff451d" 
            : theme === "dark" 
              ? "#ffffff" 
              : "#000000"
        }}
        transition={{ type: "tween", duration: 0.1 }}
        className="rounded-full pointer-events-none absolute"
      />
    </div>
  );
}
