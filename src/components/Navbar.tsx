"use client";

import { useState, useEffect, useCallback, useRef } from "react";

function useRipple() {
    const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const ripple = document.createElement("span");
        ripple.className = "btn-ripple";
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        el.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    }, []);
    return { createRipple };
}

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "DSA", href: "#dsa" },
    { label: "Experience", href: "#opensource" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [activeSection, setActiveSection] = useState<string>("");
    const toggleRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const { createRipple } = useRipple();

    // Magnetic hover for desktop CTA
    useEffect(() => {
        const el = ctaRef.current;
        if (!el) return;
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let rafId = 0;
        const intensity = 0.25;

        const handleMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * intensity;
                const dy = (e.clientY - cy) * intensity;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });
        };

        const handleLeave = () => {
            cancelAnimationFrame(rafId);
            el.style.transform = "";
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", handleLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Track active section via IntersectionObserver
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            // Fallback: track via scroll position
            const handleFallbackScroll = () => {
                const ids = navLinks.map((l) => l.href.replace("#", ""));
                const scrollY = window.scrollY + 120;
                for (let i = ids.length - 1; i >= 0; i--) {
                    const el = document.getElementById(ids[i]);
                    if (el && el.offsetTop <= scrollY) {
                        setActiveSection(`#${ids[i]}`);
                        return;
                    }
                }
            };
            window.addEventListener("scroll", handleFallbackScroll, { passive: true });
            handleFallbackScroll();
            return () => window.removeEventListener("scroll", handleFallbackScroll);
        }

        const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];

        const callback = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                    break;
                }
            }
        };

        for (const id of sectionIds) {
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

    const isActive = useCallback(
        (href: string) => activeSection === href,
        [activeSection]
    );

    // Scroll handler for glass effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Theme init
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        const initialTheme =
            savedTheme === "light" || savedTheme === "dark"
                ? savedTheme
                : systemPrefersLight
                    ? "light"
                    : "dark";

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    // Close mobile menu on outside click
    useEffect(() => {
        if (!mobileOpen) return;

        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                toggleRef.current &&
                !toggleRef.current.contains(target)
            ) {
                setMobileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [mobileOpen]);

    // Escape key to close mobile menu + return focus to toggle
    useEffect(() => {
        if (!mobileOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setMobileOpen(false);
                toggleRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen]);

    // Trap focus inside mobile menu when open
    useEffect(() => {
        if (!mobileOpen || !mobileMenuRef.current) return;

        const menu = mobileMenuRef.current;
        const focusable = menu.querySelectorAll<HTMLElement>(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl?.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleTab);
        firstEl?.focus();

        return () => document.removeEventListener("keydown", handleTab);
    }, [mobileOpen]);

    return (
        <nav
            aria-label="Main navigation"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "py-3"
                    : "py-5"
                }`}
        >
            <div
                className={`max-w-6xl mx-auto px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${scrolled
                        ? "glass-strong py-3 px-6 mx-4 shadow-lg shadow-purple-900/10"
                        : ""
                    }`}
            >
                {/* Logo */}
                <a
                    href="#"
                    className="navbar-logo"
                    aria-label="Sonali — Home"
                >
                    <span className="navbar-logo__text" aria-hidden="true">S</span>
                    <span className="navbar-logo__dot" aria-hidden="true">.</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:bg-white/5 ${
                                isActive(link.href)
                                    ? "text-white bg-white/10"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <button
                    onClick={toggleTheme}
                    className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-xl glass text-gray-300 hover:text-white hover:bg-white/10"
                    style={{ transitionProperty: "background-color, color, transform", transitionDuration: "0.25s" }}
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    title={theme === "dark" ? "Light mode" : "Dark mode"}
                >
                    {theme === "dark" ? (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1111.21 3c.5 0 .79.54.53.97A7 7 0 0019.03 13.26c.43-.26.97.03.97.53z" />
                        </svg>
                    )}
                </button>

                {/* CTA (Desktop) */}
                <span className="cta-magnetic hidden md:inline-flex">
                    <a
                        ref={ctaRef}
                        href="#contact"
                        onClick={createRipple}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    >
                        Let&apos;s Talk
                    </a>
                </span>

                {/* Mobile Menu Button */}
                <button
                    ref={toggleRef}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                >
                    <span
                        className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1" : ""
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                id="mobile-menu"
                role="navigation"
                aria-label="Mobile navigation"
                className={`md:hidden absolute top-full left-4 right-4 mt-2 glass-strong overflow-hidden transition-all duration-400 ${mobileOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0 pointer-events-none"
                    }`}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`block px-6 py-3 text-sm transition-all ${
                            isActive(link.href)
                                ? "text-white bg-white/5"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {link.label}
                    </a>
                ))}
                <div className="px-6 pt-3 pb-2 space-y-3">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl glass text-gray-300 hover:text-white hover:bg-white/10"
                    >
                        {theme === "dark" ? (
                            <>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                                </svg>
                                Light mode
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1111.21 3c.5 0 .79.54.53.97A7 7 0 0019.03 13.26c.43-.26.97.03.97.53z" />
                                </svg>
                                Dark mode
                            </>
                        )}
                    </button>
                    <a
                        href="#contact"
                        onClick={() => setMobileOpen(false)}
                        className="block text-center px-5 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-[0.98] transition-all duration-200"
                    >
                        Let&apos;s Talk
                    </a>
                </div>
            </div>
        </nav>
    );
}
