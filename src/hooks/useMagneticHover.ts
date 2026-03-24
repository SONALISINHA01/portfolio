"use client";

import { useRef, useCallback, useEffect } from "react";

interface UseMagneticHoverOptions {
    intensity?: number;
}

export function useMagneticHover<T extends HTMLElement>(
    options: UseMagneticHoverOptions = {}
) {
    const { intensity = 0.3 } = options;
    const ref = useRef<T>(null);
    const rafId = useRef<number>(0);
    const isTouchDevice = useRef(false);

    useEffect(() => {
        isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isTouchDevice.current) return;
            const el = ref.current;
            if (!el) return;

            cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dx = (e.clientX - centerX) * intensity;
                const dy = (e.clientY - centerY) * intensity;
                const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -5 * intensity;
                const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 5 * intensity;

                el.style.transform = `translate(${dx}px, ${dy}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        },
        [intensity]
    );

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        cancelAnimationFrame(rafId.current);
        el.style.transform = "";
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el || isTouchDevice.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(rafId.current);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return ref;
}
