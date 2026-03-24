"use client";

import { useEffect, useState, useRef } from "react";

export default function PageLoader() {
    const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            // Defer to avoid synchronous setState in effect body
            const id = requestAnimationFrame(() => setPhase("done"));
            return () => cancelAnimationFrame(id);
        }

        const fadeTimer = setTimeout(() => setPhase("fading"), 1200);
        const doneTimer = setTimeout(() => setPhase("done"), 1700);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    useEffect(() => {
        if (phase === "done" && overlayRef.current) {
            const raf = requestAnimationFrame(() => {
                overlayRef.current?.remove();
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [phase]);

    if (phase === "done") return null;

    return (
        <div
            ref={overlayRef}
            className={`page-loader ${phase === "fading" ? "page-loader--fading" : ""}`}
            role="status"
            aria-label="Loading page"
        >
            <div className="page-loader__content">
                <div className="page-loader__logo">
                    <span className="page-loader__letter">S</span>
                    <span className="page-loader__dot">.</span>
                </div>
                <div className="page-loader__ring" aria-hidden="true" />
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
