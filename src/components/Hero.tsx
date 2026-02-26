"use client";

import { useEffect, useState, useRef } from "react";

const roles = [
    "Machine Learning Engineer",
    "Systems Programmer",
    "Full-Stack Developer",
    "Problem Solver",
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Typing animation
    useEffect(() => {
        const currentRole = roles[roleIndex];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (displayText.length < currentRole.length) {
                        setDisplayText(currentRole.slice(0, displayText.length + 1));
                    } else {
                        setTimeout(() => setIsDeleting(true), 1500);
                    }
                } else {
                    if (displayText.length > 0) {
                        setDisplayText(currentRole.slice(0, displayText.length - 1));
                    } else {
                        setIsDeleting(false);
                        setRoleIndex((prev) => (prev + 1) % roles.length);
                    }
                }
            },
            isDeleting ? 40 : 80
        );
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    // Parallax scroll tracking
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const parallax = (speed: number) => scrollY * speed;

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
        >
            {/* Background Orbs - parallax on scroll */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-40 sm:w-72 h-40 sm:h-72 rounded-full animate-float"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                        filter: "blur(40px)",
                        transform: `translateY(${parallax(-0.15)}px)`,
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-56 sm:w-96 h-56 sm:h-96 rounded-full animate-float-delay"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
                        filter: "blur(50px)",
                        transform: `translateY(${parallax(-0.25)}px)`,
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full animate-float-slow"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
                        filter: "blur(45px)",
                        transform: `translateY(${parallax(-0.1)}px)`,
                    }}
                />
                {/* Grid overlay - moves slightly with scroll */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                        transform: `translateY(${parallax(-0.05)}px)`,
                    }}
                />
            </div>

            {/* Content - fades and moves up as user scrolls past */}
            <div
                className="relative z-10 text-center px-2 sm:px-6 max-w-4xl mx-auto"
                style={{
                    opacity: Math.max(0, 1 - scrollY / 600),
                    transform: `translateY(${parallax(0.2)}px)`,
                }}
            >
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 mb-8">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Opportunities
                </div>

                {/* Name */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
                    <span className="text-white">Hi, I&apos;m </span>
                    <span className="gradient-text">Sonali</span>
                </h1>

                {/* Typing animation */}
                <div className="h-10 sm:h-12 flex items-center justify-center mb-6 sm:mb-8">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light">
                        {displayText}
                        <span className="inline-block w-0.5 h-7 bg-purple-400 ml-1 animate-pulse" />
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                    Building production-grade ML systems & solving complex engineering problems.
                    <br className="hidden sm:block" />
                    <span className="text-gray-400">500+ DSA problems</span> ·{" "}
                    <span className="text-gray-400">Systems Programming</span> ·{" "}
                    <span className="text-gray-400">ML Engineering</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#projects"
                        className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                        style={{ transitionProperty: "box-shadow, transform", transitionDuration: "0.3s" }}
                    >
                        View Projects
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1"
                            style={{ transitionProperty: "transform", transitionDuration: "0.2s" }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                    <a
                        href="/resume.pdf"
                        download="Sonali_Sinha_Resume.pdf"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl glass text-gray-300 font-semibold text-sm sm:text-base hover:bg-white/10 text-center"
                        style={{ transitionProperty: "background-color, transform", transitionDuration: "0.3s" }}
                    >
                        Download Resume
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-5 h-8 rounded-full border border-gray-700 flex justify-center pt-1.5">
                        <div className="w-1 h-2 rounded-full bg-gray-500 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
