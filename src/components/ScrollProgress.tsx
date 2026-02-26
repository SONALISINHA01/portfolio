"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500"
                    style={{
                        width: `${scrollProgress}%`,
                        transitionProperty: "width",
                        transitionDuration: "0.1s",
                        transitionTimingFunction: "linear",
                    }}
                />
            </div>

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 hover:scale-110 active:scale-95"
                style={{
                    opacity: showBackToTop ? 1 : 0,
                    pointerEvents: showBackToTop ? "auto" : "none",
                    transform: showBackToTop
                        ? "translateY(0) scale(1)"
                        : "translateY(16px) scale(0.8)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "ease",
                }}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                    />
                </svg>
            </button>
        </>
    );
}
