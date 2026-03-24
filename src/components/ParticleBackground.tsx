"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    baseOpacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface ParticleBackgroundProps {
    maxParticlesDesktop?: number;
    maxParticlesMobile?: number;
    connectionDistance?: number;
    parallaxStrength?: number;
    className?: string;
}

const PALETTE = [
    { r: 147, g: 197, b: 253 }, // blue-300
    { r: 103, g: 232, b: 249 }, // cyan-300
    { r: 167, g: 139, b: 250 }, // violet-400
    { r: 196, g: 181, b: 253 }, // purple-300
    { r: 134, g: 239, b: 172 }, // green-300
];

function getDevicePixelRatio(): number {
    if (typeof window === "undefined") return 1;
    return Math.min(window.devicePixelRatio || 1, 2);
}

function isMobile(): boolean {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
}

function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ParticleBackground({
    maxParticlesDesktop = 90,
    maxParticlesMobile = 45,
    connectionDistance = 130,
    parallaxStrength = 15,
    className = "",
}: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const reducedMotionRef = useRef(false);
    const [enabled, setEnabled] = useState(true);
    const [showToggle, setShowToggle] = useState(false);

    const initParticles = useCallback((width: number, height: number) => {
        const mobile = isMobile();
        const count = Math.min(
            mobile ? maxParticlesMobile : maxParticlesDesktop,
            mobile ? 45 : 90
        );
        const particles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: Math.random() * 1.2 + 0.8,
                opacity: 0,
                baseOpacity: Math.random() * 0.13 + 0.12,
                twinkleSpeed: Math.random() * 0.008 + 0.003,
                twinklePhase: Math.random() * Math.PI * 2,
                _color: color,
            } as Particle & { _color: { r: number; g: number; b: number } });
        }
        particlesRef.current = particles;
    }, [maxParticlesDesktop, maxParticlesMobile]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        reducedMotionRef.current = prefersReducedMotion();

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleMotionChange = (e: MediaQueryListEvent) => {
            reducedMotionRef.current = e.matches;
        };
        mediaQuery.addEventListener("change", handleMotionChange);

        let width = 0;
        let height = 0;
        const dpr = getDevicePixelRatio();

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (particlesRef.current.length === 0) {
                initParticles(width, height);
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };
        canvas.parentElement?.addEventListener("mousemove", handleMouseMove, { passive: true });
        canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

        const connectionDistSq = connectionDistance * connectionDistance;

        let lastTime = performance.now();

        const draw = (now: number) => {
            const dt = Math.min((now - lastTime) / 16.667, 3);
            lastTime = now;

            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const reduced = reducedMotionRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i] as Particle & { _color: { r: number; g: number; b: number } };

                if (!reduced) {
                    p.x += p.vx * dt;
                    p.y += p.vy * dt;

                    if (p.x < -10) p.x = width + 10;
                    if (p.x > width + 10) p.x = -10;
                    if (p.y < -10) p.y = height + 10;
                    if (p.y > height + 10) p.y = -10;
                }

                p.twinklePhase += p.twinkleSpeed * dt;
                const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
                p.opacity = p.baseOpacity * (0.6 + 0.4 * twinkle);

                let drawX = p.x;
                let drawY = p.y;

                if (mouse.active && !reduced) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 300;
                    if (distSq < maxDist * maxDist) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / maxDist) * parallaxStrength;
                        drawX += (dx / dist) * force;
                        drawY += (dy / dist) * force;
                    }
                }

                ctx.beginPath();
                ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p._color.r},${p._color.g},${p._color.b},${p.opacity})`;
                ctx.fill();

                if (!reduced) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j] as Particle & { _color: { r: number; g: number; b: number } };
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distSq = dx * dx + dy * dy;

                        if (distSq < connectionDistSq && distSq > 0) {
                            const dist = Math.sqrt(distSq);
                            const lineOpacity = Math.min(p.opacity, p2.opacity) * (1 - dist / connectionDistance) * 0.35;
                            if (lineOpacity > 0.01) {
                                const midColor = {
                                    r: (p._color.r + p2._color.r) >> 1,
                                    g: (p._color.g + p2._color.g) >> 1,
                                    b: (p._color.b + p2._color.b) >> 1,
                                };
                                ctx.beginPath();
                                ctx.moveTo(
                                    mouse.active ? p.x + (p.x - mouse.x) * 0.02 : p.x,
                                    mouse.active ? p.y + (p.y - mouse.y) * 0.02 : p.y
                                );
                                ctx.lineTo(
                                    mouse.active ? p2.x + (p2.x - mouse.x) * 0.02 : p2.x,
                                    mouse.active ? p2.y + (p2.y - mouse.y) * 0.02 : p2.y
                                );
                                ctx.strokeStyle = `rgba(${midColor.r},${midColor.g},${midColor.b},${lineOpacity})`;
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            if (enabled) {
                animationRef.current = requestAnimationFrame(draw);
            }
        };

        if (enabled && !reducedMotionRef.current) {
            animationRef.current = requestAnimationFrame(draw);
        } else if (enabled) {
            // Reduced motion: draw once statically
            lastTime = performance.now();
            draw(lastTime);
        }

        // Show toggle after a brief delay
        const toggleTimer = setTimeout(() => setShowToggle(true), 2000);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
            mediaQuery.removeEventListener("change", handleMotionChange);
            clearTimeout(toggleTimer);
        };
    }, [enabled, initParticles, connectionDistance, parallaxStrength]);

    if (!enabled) {
        return (
            <>
                <div className={`absolute inset-0 ${className}`}
                    style={{
                        background: "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.05) 0%, transparent 60%)",
                    }}
                />
                {showToggle && (
                    <button
                        onClick={() => setEnabled(true)}
                        className="absolute bottom-4 right-4 z-20 text-xs text-gray-600 hover:text-gray-400 px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5"
                        aria-label="Enable particle animation"
                    >
                        Enable particles
                    </button>
                )}
            </>
        );
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 ${className}`}
                aria-hidden="true"
            />
            {showToggle && (
                <button
                    onClick={() => setEnabled(false)}
                    className="absolute bottom-4 right-4 z-20 text-xs text-gray-600 hover:text-gray-400 px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5"
                    aria-label="Disable particle animation"
                >
                    Disable particles
                </button>
            )}
        </>
    );
}
