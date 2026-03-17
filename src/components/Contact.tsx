"use client";

import { useEffect, useRef, useState } from "react";

const socials = [
    {
        name: "GitHub",
        url: "https://github.com/SONALISINHA01",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        url: "https://in.linkedin.com/in/sonali-sinha-244853299",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "LeetCode",
        url: "https://leetcode.com/u/kinglessworldsking/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835s.513 2.853 1.494 3.835l4.332 4.363c.981.981 2.338 1.495 3.836 1.495s2.854-.514 3.835-1.495l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.536-1.386-.554-1.9-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
            </svg>
        ),
    },
    {
        name: "Email",
        url: "mailto:sonalisinha0610@gmail.com",
        icon: (
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
    },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("sending");

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("https://formsubmit.co/ajax/sonalisinha0610@gmail.com", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData,
            });
            const data = await res.json();
            if (data.success === "true" || data.success === true) {
                setFormStatus("sent");
                form.reset();
                setTimeout(() => setFormStatus("idle"), 4000);
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 4000);
            }
        } catch {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)",
                }}
            />

            <div className="max-w-6xl mx-auto">
                <div
                    className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                        }`}
                >
                    <span className="text-sm font-medium tracking-widest uppercase text-pink-400 mb-3 block">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
                        Interested in discussing ML engineering, systems programming, or
                        potential opportunities? I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {/* Contact Form */}
                    <div
                        className={`glass-card p-6 sm:p-8 transition-all duration-700 delay-200 ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                            <input type="hidden" name="subject" value="New Portfolio Contact" />
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-400 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 text-sm"
                                    style={{ transitionProperty: "border-color, box-shadow", transitionDuration: "0.2s" }}
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-400 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 text-sm"
                                    style={{ transitionProperty: "border-color, box-shadow", transitionDuration: "0.2s" }}
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-400 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 text-sm resize-none"
                                    style={{ transitionProperty: "border-color, box-shadow", transitionDuration: "0.2s" }}
                                    placeholder="Tell me about an opportunity or just say hi..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={formStatus === "sending"}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                                style={{ transitionProperty: "box-shadow, transform, opacity", transitionDuration: "0.3s" }}
                            >
                                {formStatus === "idle" && "Send Message"}
                                {formStatus === "sending" && "Sending..."}
                                {formStatus === "sent" && "✓ Message Sent!"}
                                {formStatus === "error" && "✕ Failed — Try Again"}
                            </button>
                            {formStatus === "sent" && (
                                <p className="text-emerald-400 text-xs text-center">
                                    Thanks! I&apos;ll get back to you soon.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Info & Socials */}
                    <div
                        className={`flex flex-col gap-6 transition-all duration-700 delay-400 ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        {/* Quick links */}
                        <div className="glass-card p-6 sm:p-8 flex-1">
                            <h3 className="text-lg font-bold text-white mb-4">
                                Quick Links
                            </h3>
                            <div className="space-y-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.url}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 group"
                                        style={{ transitionProperty: "background-color", transitionDuration: "0.2s" }}
                                    >
                                        <span className="text-gray-500 group-hover:text-purple-400" style={{ transitionProperty: "color", transitionDuration: "0.2s" }}>
                                            {s.icon}
                                        </span>
                                        <span className="text-gray-400 group-hover:text-white text-sm font-medium" style={{ transitionProperty: "color", transitionDuration: "0.2s" }}>
                                            {s.name}
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-700 group-hover:text-gray-400 ml-auto group-hover:translate-x-1"
                                            style={{ transitionProperty: "color, transform", transitionDuration: "0.2s" }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Testing badge */}
                        <div className="glass-card p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-medium text-emerald-400">
                                    Quality Assurance
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                All projects tested with{" "}
                                <span className="text-white font-medium">85%+ coverage</span>{" "}
                                using <span className="text-cyan-400">Pytest</span>. CI/CD
                                pipelines ensure deployment readiness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto mt-16 md:mt-24 pt-8 border-t border-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                    <p>
                        © 2026 Sonali. Built with{" "}
                        <span className="text-purple-400">Next.js</span> &{" "}
                        <span className="text-cyan-400">Tailwind CSS</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
