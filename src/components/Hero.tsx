"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import TiltCard from "./TiltCard";
import ParticleBackground from "./ParticleBackground";
import ImageWithSkeleton from "./ImageWithSkeleton";

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

function useMagneticHover(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let rafId = 0;
        const intensity = 0.3;

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
    }, [ref]);
}

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
    const viewProjectsRef = useRef<HTMLAnchorElement>(null);
    const downloadResumeRef = useRef<HTMLAnchorElement>(null);
    const { createRipple } = useRipple();
    useMagneticHover(viewProjectsRef);
    useMagneticHover(downloadResumeRef);

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

    // Parallax scroll tracking — throttled via rAF to avoid jank
    useEffect(() => {
        let rafId = 0;
        const handleScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const parallax = (speed: number) => scrollY * speed;

    // Hero fade: start fading at 300px, finish at 1400px — gives ample click time
    const heroOpacity = Math.max(0, 1 - (scrollY - 300) / 1100);
    // Only disable pointer events once fully invisible to preserve clickability
    const heroPointerEvents = heroOpacity < 0.05 ? "none" : "auto";

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
                    opacity: heroOpacity,
                    pointerEvents: heroPointerEvents,
                    transform: `translateY(${parallax(-0.12)}px)`,
                    willChange: "opacity, transform",
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
                    <span className="text-gray-400">500+ DSA problems solved</span> ·{" "}
                    <span className="text-gray-400">Systems mindset</span> ·{" "}
                    <span className="text-gray-400">ML in production</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-row items-center justify-center gap-4">
                    <span className="cta-magnetic">
                        <a
                            ref={viewProjectsRef}
                            href="#projects"
                            onClick={createRipple}
                            className="gradient-border group w-full sm:w-auto relative overflow-hidden"
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
                    </span>
                    <span className="cta-magnetic">
                        <a
                            ref={downloadResumeRef}
                            href="/resume.pdf"
                            download="Sonali_Sinha_Resume.pdf"
                            onClick={createRipple}
                            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl glass text-gray-300 font-semibold text-sm sm:text-base hover:bg-white/10 text-center relative overflow-hidden"
                            style={{ transitionProperty: "background-color, transform", transitionDuration: "0.3s" }}
                        >
                            Download Resume
                        </a>
                    </span>
                </div>

            </div>
        </section>
    );
}
