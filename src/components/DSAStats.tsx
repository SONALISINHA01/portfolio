"use client";

import React from "react";
import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import { useEasedCounter } from "@/hooks/useEasedCounter";
import { PuzzleIcon, StarIcon, TrophyIcon, AcademicCapIcon } from "./Icons";

const stats = [
    { label: "Problems Solved", value: 550, suffix: "+", icon: <PuzzleIcon className="w-8 h-8 text-purple-400" />, color: "from-purple-500 to-purple-600", glow: "shadow-purple-500/20" },
    { label: "HackerRank Rating", value: 4, suffix: "★", icon: <StarIcon className="w-8 h-8 text-amber-400" />, color: "from-amber-500 to-yellow-500", glow: "shadow-amber-500/20" },
    { label: "Contests Participated", value: 40, suffix: "+", icon: <TrophyIcon className="w-8 h-8 text-cyan-400" />, color: "from-cyan-500 to-blue-500", glow: "shadow-cyan-500/20" },
    { label: "Data Structures Mastered", value: 15, suffix: "+", icon: <AcademicCapIcon className="w-8 h-8 text-emerald-400" />, color: "from-emerald-500 to-green-500", glow: "shadow-emerald-500/20" },
];

const platforms = [
    { name: "LeetCode", problems: "300+", highlight: "Arrays, Trees, DP, Graphs", color: "text-amber-400", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/5" },
    { name: "HackerRank", problems: "50+", highlight: "4★ Badge · Problem Solving", color: "text-emerald-400", borderColor: "border-emerald-500/20", bgColor: "bg-emerald-500/5" },
    { name: "Codeforces", problems: "200+", highlight: "Competitive Programming", color: "text-blue-400", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/5" },
];

const topics = [
    "Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack & Queue",
    "Binary Search", "Linked Lists", "Trees & BST", "Graphs & BFS/DFS",
    "Dynamic Programming", "Bit Manipulation", "Greedy Algorithms", "Backtracking",
];

function AnimatedCounter({ target, suffix, delay = 0 }: { target: number; suffix: string; delay?: number }) {
    const { ref, displayValue } = useEasedCounter({ target, duration: 1600, delay });
    return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function DSAStats() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="dsa" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="blob blob--purple blob--xs absolute bottom-10 left-10 opacity-15" />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="mb-16" style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-amber-400 mb-3 block">DSA & Problem Solving</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Coding <span className="gradient-text">Consistency</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl text-base sm:text-lg">
                        Solving problems daily to sharpen algorithmic thinking and ace those FAANG interviews.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`glass-card glass-card--dsa p-6 text-center hover:shadow-lg ${stat.glow}`}
                            style={getRevealStyle(isVisible, "scale-in", i * 100 + 200)}
                        >
                            <span className="mb-3 block flex justify-center">{stat.icon}</span>
                            <div className={`text-3xl sm:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={i * 150 + 200} />
                            </div>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Progress towards goal */}
                <div className="mb-12 max-w-md mx-auto" style={getRevealStyle(isVisible, "fade-up", 700)}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress to 600 problems</span>
                        <span className="text-sm font-semibold text-white">550 / 600</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/[0.06] border border-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                            style={{
                                width: isVisible ? "91.7%" : "0%",
                                transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
                            }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 text-right">92% complete</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div style={getRevealStyle(isVisible, "fade-right", 500)}>
                        <h3 className="text-lg font-semibold text-white mb-4">Platforms</h3>
                        <div className="space-y-4">
                            {platforms.map((p, i) => (
                                <div
                                    key={p.name}
                                    className={`p-5 rounded-xl border ${p.borderColor} ${p.bgColor} hover:border-opacity-50`}
                                    style={getRevealStyle(isVisible, "fade-right", i * 100 + 600)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className={`font-bold text-lg ${p.color}`}>{p.name}</h4>
                                        <span className="text-white font-semibold text-lg">{p.problems}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">{p.highlight}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={getRevealStyle(isVisible, "fade-left", 500)}>
                        <h3 className="text-lg font-semibold text-white mb-4">Topics Mastered</h3>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                            {topics.map((topic, i) => (
                                <div
                                    key={topic}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-colors duration-200"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? "translateX(0)" : "translateX(-16px)",
                                        transitionProperty: "opacity, transform, border-color",
                                        transitionDuration: "0.5s",
                                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                        transitionDelay: isVisible ? `${i * 50 + 700}ms` : "0ms",
                                    }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shrink-0" />
                                    <span className="text-gray-400 text-sm">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
