"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealSectionProps {
    children: ReactNode;
    gradientColor?: string;
    className?: string;
}

export default function ScrollRevealSection({
    children,
    gradientColor = "rgba(124, 58, 237, 0.08)",
    className = "",
}: ScrollRevealSectionProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            // Defer to avoid synchronous setState in effect body
            const id = requestAnimationFrame(() => setIsVisible(true));
            return () => cancelAnimationFrame(id);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`scroll-reveal-section ${
                isVisible ? "scroll-reveal-section--visible" : ""
            } ${className}`}
            data-reveal-section
        >
            <div
                className="scroll-reveal-gradient"
                style={{
                    background: `linear-gradient(180deg, ${gradientColor} 0%, transparent 100%)`,
                    opacity: isVisible ? 0 : 1,
                }}
                aria-hidden="true"
            />
            <div className="scroll-reveal-content">{children}</div>
        </div>
    );
}
