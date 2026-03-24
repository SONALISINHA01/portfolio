"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TocSection {
    id: string;
    label: string;
}

const sections: TocSection[] = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "dsa", label: "DSA Stats" },
    { id: "opensource", label: "Open Source" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
];

export default function TableOfContents() {
    const [activeId, setActiveId] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);
    const tocRef = useRef<HTMLElement>(null);

    // Show ToC after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section via IntersectionObserver
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            const handleFallback = () => {
                const scrollY = window.scrollY + 200;
                for (let i = sections.length - 1; i >= 0; i--) {
                    const el = document.getElementById(sections[i].id);
                    if (el && el.offsetTop <= scrollY) {
                        setActiveId(sections[i].id);
                        return;
                    }
                }
            };
            window.addEventListener("scroll", handleFallback, { passive: true });
            handleFallback();
            return () => window.removeEventListener("scroll", handleFallback);
        }

        const observers: IntersectionObserver[] = [];
        const callback = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                    break;
                }
            }
        };

        for (const { id } of sections) {
            const el = document.getElementById(id);
            if (el) {
                const obs = new IntersectionObserver(callback, {
                    rootMargin: "-20% 0px -60% 0px",
                    threshold: 0,
                });
                obs.observe(el);
                observers.push(obs);
            }
        }

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent, id: string, index: number) => {
            let targetIndex = -1;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                targetIndex = (index + 1) % sections.length;
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                targetIndex = (index - 1 + sections.length) % sections.length;
            } else if (e.key === "Home") {
                e.preventDefault();
                targetIndex = 0;
            } else if (e.key === "End") {
                e.preventDefault();
                targetIndex = sections.length - 1;
            }
            if (targetIndex >= 0) {
                const btn = tocRef.current?.querySelector<HTMLElement>(
                    `[data-toc-index="${targetIndex}"]`
                );
                btn?.focus();
            }
        },
        []
    );

    // Calculate progress: how many sections have been scrolled past
    const activeIndex = sections.findIndex((s) => s.id === activeId);

    return (
        <nav
            ref={tocRef}
            aria-label="Table of contents"
            className="toc-sidebar"
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
            }}
        >
            <ul role="list" className="toc-list">
                {sections.map((section, index) => {
                    const isActive = activeId === section.id;
                    const isPast = index < activeIndex;
                    return (
                        <li key={section.id}>
                            <button
                                data-toc-index={index}
                                onClick={() => handleClick(section.id)}
                                onKeyDown={(e) => handleKeyDown(e, section.id, index)}
                                aria-label={`Navigate to ${section.label}`}
                                aria-current={isActive ? "true" : undefined}
                                className="toc-item"
                                title={section.label}
                            >
                                <span
                                    className={`toc-dot ${
                                        isActive
                                            ? "toc-dot--active"
                                            : isPast
                                            ? "toc-dot--past"
                                            : "toc-dot--future"
                                    }`}
                                />
                                <span
                                    className={`toc-label ${
                                        isActive ? "toc-label--active" : ""
                                    }`}
                                >
                                    {section.label}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            {/* Progress track line */}
            <div className="toc-track" aria-hidden="true">
                <div
                    className="toc-track-fill"
                    style={{
                        height: `${
                            activeIndex >= 0
                                ? (activeIndex / (sections.length - 1)) * 100
                                : 0
                        }%`,
                    }}
                />
            </div>
        </nav>
    );
}
