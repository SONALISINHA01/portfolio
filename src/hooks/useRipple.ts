import { MouseEvent as ReactMouseEvent, useCallback } from "react";

export function useRipple() {
    const createRipple = useCallback((e: ReactMouseEvent<HTMLElement>) => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement("span");
        ripple.className = "btn-ripple";
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;

        el.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    }, []);

    return { createRipple };
}
