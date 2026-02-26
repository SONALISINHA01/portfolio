"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

/**
 * Hook for scroll-triggered section visibility.
 * Returns a ref and isVisible boolean.
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
    const { threshold = 0.15, rootMargin = "0px", once = true } = options;
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && ref.current) observer.unobserve(ref.current);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isVisible };
}

/**
 * Hook for parallax scrolling effect.
 * Returns a ref and a y-offset that changes with scroll.
 */
export function useParallax(speed: number = 0.3) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Only compute when element is near or in viewport
            if (rect.top < windowHeight + 200 && rect.bottom > -200) {
                const center = rect.top + rect.height / 2;
                const fromCenter = center - windowHeight / 2;
                setOffset(fromCenter * speed);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return { ref, offset };
}

/**
 * Returns inline styles for scroll-reveal animations.
 */
export function getRevealStyle(
    isVisible: boolean,
    animation: AnimationType = "fade-up",
    delay: number = 0,
    duration: number = 0.7
): React.CSSProperties {
    const base: React.CSSProperties = {
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
    };

    const hidden: Partial<Record<AnimationType, React.CSSProperties>> = {
        "fade-up": { opacity: 0, transform: "translateY(40px)" },
        "fade-left": { opacity: 0, transform: "translateX(-40px)" },
        "fade-right": { opacity: 0, transform: "translateX(40px)" },
        "scale-in": { opacity: 0, transform: "scale(0.9)" },
        "blur-in": { opacity: 0, filter: "blur(10px)" },
    };

    const visible: React.CSSProperties = {
        opacity: 1,
        transform: "translateY(0) translateX(0) scale(1)",
        filter: "blur(0px)",
    };

    return {
        ...base,
        ...(isVisible ? visible : hidden[animation]),
    };
}

/**
 * Hook for tracking scroll progress within a section.
 * Returns 0-1 progress based on how far through the section the user has scrolled.
 */
export function useSectionProgress() {
    const ref = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    const handleScroll = useCallback(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const total = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        setProgress(Math.max(0, Math.min(1, scrolled / total)));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return { ref, progress };
}
