import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export function MagneticButton({ children, className = "", onClick, id }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Center point of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from center to mouse cursor
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Limit maximum distance or use a gentle scale factor
    // Factor determines how closely the button follows the mouse
    const strength = 0.3; 
    
    // Set offset position
    setPosition({ x: distanceX * strength, y: distanceY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      id={id}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${className} transition-shadow duration-300`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
