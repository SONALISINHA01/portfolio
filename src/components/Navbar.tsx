"use client";

import { useState, useEffect } from "react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "DSA", href: "#dsa" },
    { label: "Open Source", href: "#opensource" },
    { label: "Certifications", href: "#certifications" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
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
                    className="text-xl font-bold gradient-text tracking-tight"
                >
                    S.
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/5"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Resume Button (Desktop) */}
                <a
                    href="#contact"
                    className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                    Let&apos;s Talk
                </a>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                    aria-label="Toggle menu"
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
                className={`md:hidden absolute top-full left-4 right-4 mt-2 glass-strong overflow-hidden transition-all duration-400 ${mobileOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
                    }`}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-6 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        {link.label}
                    </a>
                ))}
                <div className="px-6 pt-2 pb-2">
                    <a
                        href="#contact"
                        onClick={() => setMobileOpen(false)}
                        className="block text-center px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    >
                        Let&apos;s Talk
                    </a>
                </div>
            </div>
        </nav>
    );
}
