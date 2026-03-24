"use client";

import { useEffect, useState, useRef } from "react";
import TiltCard from "./TiltCard";
import ParticleBackground from "./ParticleBackground";
import ImageWithSkeleton from "./ImageWithSkeleton";

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
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28"
        >
            {/* Particle constellation background */}
            <ParticleBackground
                maxParticlesDesktop={90}
                maxParticlesMobile={45}
                connectionDistance={130}
                parallaxStrength={15}
            />

            {/* Blob Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="blob blob--purple blob--lg absolute -top-20 -left-20 animate-float"
                    style={{ transform: `translateY(${parallax(-0.15)}px)` }}
                />
                <div
                    className="blob blob--cyan blob--md absolute top-1/3 right-10 animate-float-delay"
                    style={{ transform: `translateY(${parallax(-0.25)}px)` }}
                />
                <div
                    className="blob blob--pink blob--sm absolute bottom-20 left-1/3 animate-float-slow"
                    style={{ transform: `translateY(${parallax(-0.1)}px)` }}
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

                {/* Profile photo with mouse microinteraction */}
                <div className="mb-6 sm:mb-8 flex justify-center" style={{ perspective: "1000px" }}>
                    <TiltCard
                        className="relative rounded-full"
                        glareColor="rgba(6, 182, 212, 0.18)"
                        tiltAmount={10}
                    >
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 p-[3px] rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-[0_14px_40px_rgba(6,182,212,0.18)]">
                            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl pointer-events-none" />

                            <div
                                className="absolute -inset-2 rounded-full border border-cyan-300/30"
                                style={{ animation: "spin 9s linear infinite" }}
                            >
                                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
                            </div>

                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                                <ImageWithSkeleton
                                    src="/professional-photo.jpg"
                                    alt="Sonali Sinha — ML Engineer headshot"
                                    fill
                                    sizes="144px"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </TiltCard>
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
                        <span className="inline-block w-0.5 h-7 bg-purple-400 ml-1 cursor-blink" />
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                    I enjoy turning ambitious ideas into reliable products - from ML experiments to clean, production-ready systems people can trust.
                    <br className="hidden sm:block" />
                    <span className="text-gray-400">550+ DSA problems solved</span> ·{" "}
                    <span className="text-gray-400">Systems mindset</span> ·{" "}
                    <span className="text-gray-400">ML in production</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#projects"
                        className="gradient-border group w-full sm:w-auto"
                    >
                        <div className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-white font-semibold text-sm sm:text-base">
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
                        </div>
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

            </div>
        </section>
    );
}
