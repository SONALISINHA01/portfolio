"use client";

import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import { GlobeAltIcon } from "./Icons";

export default function OpenSource() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

    return (
        <section id="opensource" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)" }} />

            <div className="max-w-6xl mx-auto">
                <div style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-pink-400 mb-3 block">Experience</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Open Source <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-base sm:text-lg mb-16">
                        Collaborating with global developers and contributing to meaningful projects.
                    </p>
                </div>

                {/* GSSOC Card */}
                <div
                    className="glass-card p-6 sm:p-8 md:p-10 max-w-3xl hover:scale-[1.01] hover:shadow-xl hover:shadow-pink-500/10"
                    style={getRevealStyle(isVisible, "fade-right", 200)}
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center shrink-0">
                            <GlobeAltIcon className="w-7 h-7 text-pink-400" />
                        </div>
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wider text-pink-400 mb-1 block">GirlScript Summer of Code 2025</span>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Research Paper Organizer</h3>
                            <p className="text-gray-500 text-sm">Open source contributor · GSSOC &apos;25</p>
                        </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6">
                        Contributed to a collaborative tool that helps researchers organize, tag, and search academic papers. Worked within a team following code review guidelines and Git best practices.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        {[
                            { label: "PR Merged", sub: "Pull Request Accepted", color: "text-pink-400" },
                            { label: "Code Review", sub: "Followed Team Guidelines", color: "text-purple-400" },
                            { label: "Git Workflow", sub: "Branch, Commit, PR Flow", color: "text-cyan-400" },
                        ].map((item, i) => (
                            <div
                                key={item.label}
                                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-pink-500/20"
                                style={getRevealStyle(isVisible, "scale-in", i * 100 + 400)}
                            >
                                <div className={`text-xl sm:text-2xl font-bold ${item.color} mb-1`}>{item.label}</div>
                                <p className="text-gray-500 text-xs">{item.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3" style={getRevealStyle(isVisible, "fade-up", 700)}>
                        <a href="https://github.com/SONALISINHA01/Research-Paper-Organizer/commit/bfa685039f8de62b5e3357b3b474542af62d8b82" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5" style={{ transitionProperty: "box-shadow, transform", transitionDuration: "0.3s" }}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View Pull Request
                        </a>
                        <a href="https://github.com/SONALISINHA01/Research-Paper-Organizer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5" style={{ transitionProperty: "background-color, color, transform", transitionDuration: "0.2s" }}>
                            View Repository →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
