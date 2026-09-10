"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties, type PointerEvent } from "react";
import { ArrowRight } from "lucide-react";

const DEFAULT_HREF = "#";
const ANIMATION_DURATION_MS = 450;

export interface ArrowFillButtonOwnProps {
  btnText?: string;
  href?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  hoverFillBgColor?: string;
  hoverFillTextColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;
  animationDuration?: number;
}

export type ArrowFillButtonProps = ArrowFillButtonOwnProps & Omit<ComponentPropsWithoutRef<'a'>, keyof ArrowFillButtonOwnProps>;

export function ArrowFillButton({
  btnText = "Hover Me",
  href = DEFAULT_HREF,
  className = "",

  bgColor = "#1c1109",
  textColor = "#ffffff",

  fillBgColor = "#c88242",
  fillTextColor = "#ffffff",

  hoverFillBgColor = "#c88242",
  hoverFillTextColor = "#ffffff",

  arrowColor,
  hoverArrowColor,

  ...props
}: ArrowFillButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const releaseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerDown?.(event);
    if (event.pointerType !== "mouse") {
      setIsPressed(true);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerUp?.(event);
    if (event.pointerType !== "mouse") {
      if (releaseTimeoutRef.current) window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = window.setTimeout(() => {
        setIsPressed(false);
      }, ANIMATION_DURATION_MS);
    }
  };

  const isActive = isHovered || isPressed;

  return (
    <a
      href={href}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setIsPressed(false)}
      className={`group relative inline-flex items-center justify-between overflow-hidden rounded-full cursor-pointer select-none transition-all duration-300 pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 shadow-sm hover:shadow-md ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        "--btn-bg": bgColor,
        "--btn-text": textColor,
        "--btn-fill-bg": fillBgColor,
        "--btn-fill-text": fillTextColor,
        "--btn-fill-bg-hover": hoverFillBgColor,
        "--btn-fill-text-hover": hoverFillTextColor,
      } as CSSProperties}
    >
      {/* Animated expanding background fill */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] origin-right pointer-events-none ${
          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
        style={{ backgroundColor: hoverFillBgColor }}
      />

      {/* Button Text Label */}
      <span
        className={`relative z-10 font-bold whitespace-nowrap mr-2.5 sm:mr-3 transition-colors duration-300 leading-none`}
        style={{ color: isActive ? hoverFillTextColor : textColor }}
      >
        {btnText}
      </span>

      {/* Circle Icon Badge with Animated Dual Arrow */}
      <span
        className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-xs transition-colors duration-300"
        style={{
          backgroundColor: isActive ? textColor : fillBgColor,
          color: isActive ? bgColor : (arrowColor || fillTextColor),
        }}
      >
        {/* Entering Arrow from Left on Hover */}
        <ArrowRight
          className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] ${
            isActive
              ? "translate-x-0 opacity-100 scale-100"
              : "-translate-x-5 opacity-0 scale-50"
          }`}
          strokeWidth={2.4}
        />

        {/* Exiting Arrow to Right on Hover */}
        <ArrowRight
          className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] ${
            isActive
              ? "translate-x-5 opacity-0 scale-50"
              : "translate-x-0 opacity-100 scale-100"
          }`}
          strokeWidth={2.4}
        />
      </span>
    </a>
  );
}

export default ArrowFillButton;
