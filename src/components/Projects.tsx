"use client";

import React from "react";
import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import { ChartBarIcon, ScaleIcon, TrophyIcon, RocketIcon, ArrowPathIcon, BoltIcon, ComputerDesktopIcon, PresentationChartLineIcon } from "./Icons";
import TiltCard from "./TiltCard";
import ImageWithSkeleton from "./ImageWithSkeleton";

const projects = [
    {
        id: 1,
        title: "ML-Based Employee Attrition Analytics",
        hook: "Predicting Employee Turnover with 89% Precision",
        description:
            "A production-ready ML pipeline that predicts employee attrition risk using ensemble methods. Built with rigorous data engineering, class imbalance handling, and comprehensive model evaluation.",
        highlights: [
            {
                icon: <ChartBarIcon className="w-6 h-6 text-purple-400" />,
                title: "Data Engineering",
                text: "Processed 1,400+ employee records with thorough EDA, feature engineering, and statistical analysis.",
            },
            {
                icon: <ScaleIcon className="w-6 h-6 text-cyan-400" />,
                title: "SMOTE for Class Imbalance",
                text: "Implemented Synthetic Minority Oversampling to handle skewed attrition labels — critical for real-world business data.",
            },
            {
                icon: <TrophyIcon className="w-6 h-6 text-amber-400" />,
                title: "Model Comparison",
                text: "Benchmarked Random Forest, XGBoost, and Logistic Regression. XGBoost won on handling non-linear feature interactions.",
            },
            {
                icon: <RocketIcon className="w-6 h-6 text-pink-400" />,
                title: "Deployment Ready",
                text: "Dockerized with requirements.txt, API endpoints, and Streamlit interactive demo for live predictions.",
            },
        ],
        modelComparison: [
            { model: "Logistic Regression", accuracy: "81%", precision: "74%", recall: "69%", f1: "71%" },
            { model: "Random Forest", accuracy: "86%", precision: "83%", recall: "78%", f1: "80%" },
            { model: "XGBoost", accuracy: "89%", precision: "89%", recall: "84%", f1: "86%", winner: true },
        ],
        architecture: ["Data Source", "Preprocessing", "SMOTE", "Feature Engineering", "Model Training", "API Endpoint", "Frontend UI"],
        tags: ["Python", "XGBoost", "Scikit-learn", "SMOTE", "Streamlit", "Docker"],
        previewImage: "/projects/employee-attrition-preview.png",
        previewAlt: "Employee Attrition Predictor interface and explainability chart",
        github: "https://github.com/SONALISINHA01/Employee-Attrition",
        demo: "https://employee-attrition-69vr2kxea9pzhbaxeub2ks.streamlit.app/",
        color: "purple",
    },
    {
        id: 2,
        title: "Process Visualization Tool",
        hook: "Simulating OS CPU Scheduling with Multithreading",
        description:
            "A real-time systems programming project that visualizes CPU scheduling algorithms using multithreaded Python. Demonstrates deep understanding of OS internals, concurrency, and performance optimization.",
        highlights: [
            {
                icon: <ArrowPathIcon className="w-6 h-6 text-cyan-400" />,
                title: "Concurrency & Threading",
                text: "Managed race conditions and context switching using Python's threading module with proper mutex locks.",
            },
            {
                icon: <BoltIcon className="w-6 h-6 text-amber-400" />,
                title: "Performance Optimized",
                text: "1-second refresh interval with separate threads for computation vs. rendering to prevent UI freezing.",
            },
            {
                icon: <ComputerDesktopIcon className="w-6 h-6 text-purple-400" />,
                title: "Cross-Platform",
                text: "Compatible across Windows, macOS, and Linux with platform-specific process introspection.",
            },
            {
                icon: <PresentationChartLineIcon className="w-6 h-6 text-emerald-400" />,
                title: "Live Visualization",
                text: "Real-time Gantt charts and process state transitions displayed dynamically as scheduling executes.",
            },
        ],
        tags: ["Python", "Multithreading", "OS Concepts", "CPU Scheduling", "Tkinter"],
        previewImage: "/projects/process-visualiser-preview.png",
        previewAlt: "Process Visualiser Gantt chart timeline window",
        github: "https://github.com/Yamini-Soni/Process-Visualization-Tool",
        color: "cyan",
    },
    {
        id: 3,
        title: "Leetify",
        hook: "AI-powered coding profile analyzer for LeetCode, Codeforces, and GitHub",
        description:
            "A comprehensive analytics dashboard that aggregates competitive programming profiles. Features deep analysis including submission heatmaps, topic weakness radar charts, and percentile trackers with a premium UI.",
        highlights: [
            {
                icon: <ChartBarIcon className="w-6 h-6 text-purple-400" />,
                title: "Deep Analytics",
                text: "Visualizes submission heatmaps and topic weakness radar charts across multiple coding platforms.",
            },
            {
                icon: <BoltIcon className="w-6 h-6 text-cyan-400" />,
                title: "AI-Powered Insights",
                text: "Provides actionable insights into coding performance and identifies areas for improvement.",
            },
            {
                icon: <TrophyIcon className="w-6 h-6 text-amber-400" />,
                title: "Percentile Tracking",
                text: "Continuously monitors and tracks competitive programming percentiles globally.",
            },
            {
                icon: <ComputerDesktopIcon className="w-6 h-6 text-emerald-400" />,
                title: "Premium UI/UX",
                text: "Built with Next.js and animated SVG components for an immersive user experience.",
            },
        ],
        tags: ["Next.js", "TypeScript", "TailwindCSS", "Recharts"],
        previewImage: "/projects/leetify-placeholder.png",
        previewAlt: "Leetify Dashboard Preview",
        github: "https://github.com/SONALISINHA01/Leetify",
        color: "purple",
    },
];

export default function Projects() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.05 });

    return (
        <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="blob blob--cyan blob--xs absolute -top-10 right-20 opacity-20" />
            </div>

            <div className="max-w-6xl mx-auto">
                <div style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-cyan-400 mb-3 block">
                        Featured Work
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Engineering <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-base sm:text-lg mb-12 md:mb-20">
                        Production-grade systems with real engineering decisions — not just notebook experiments.
                    </p>
                </div>

                <div className="space-y-12 md:space-y-24">
                    {projects.map((project, idx) => (
                        <div
                            key={project.id}
                            style={getRevealStyle(isVisible, idx % 2 === 0 ? "fade-right" : "fade-left", idx * 200 + 200)}
                        >
                            <TiltCard className="relative" glareColor={project.color === "purple" ? "rgba(124, 58, 237, 0.12)" : "rgba(6, 182, 212, 0.12)"}>
                                <div className="glass-card glass-card--projects p-5 sm:p-8 md:p-10">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                                        <div>
                                            <span className={`text-sm font-medium ${project.color === "purple" ? "text-purple-400" : "text-cyan-400"}`}>
                                                Project {project.id}
                                            </span>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 mb-2">
                                                {project.title}
                                            </h3>
                                            <p className={`text-lg font-medium ${project.color === "purple" ? "text-purple-300" : "text-cyan-300"}`}>
                                                &ldquo;{project.hook}&rdquo;
                                            </p>
                                        </div>
                                        <div className="flex gap-3 shrink-0">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl glass text-sm text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2 transition-colors duration-200">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                Code
                                            </a>
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2 transition-shadow duration-300 ${project.color === "purple"
                                                        ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-lg hover:shadow-purple-500/25"
                                                        : "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25"
                                                        }`}
                                                >
                                                    Live Demo
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">{project.description}</p>

                                    {project.previewImage && (
                                        <div className="mb-8" style={getRevealStyle(isVisible, "fade-up", idx * 200 + 320)}>
                                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 group">
                                                <ImageWithSkeleton
                                                    src={project.previewImage}
                                                    alt={project.previewAlt}
                                                    width={1200}
                                                    height={520}
                                                    className="w-full h-auto max-h-[520px] object-contain bg-slate-950/60 group-hover:scale-[1.01] transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none">
                                                    <span className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border ${project.color === "purple" ? "text-purple-200 border-purple-300/30 bg-purple-500/20" : "text-cyan-100 border-cyan-300/30 bg-cyan-500/20"}`}>
                                                        {project.id === 1 ? "Live ML App Preview" : "Scheduler Visualization Preview"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {project.highlights.map((h, hIdx) => (
                                            <div
                                                key={h.title}
                                                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] group transition-colors duration-200"
                                                style={getRevealStyle(isVisible, "scale-in", idx * 200 + hIdx * 100 + 400)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="shrink-0">{h.icon}</span>
                                                    <div>
                                                        <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors duration-200">
                                                            {h.title}
                                                        </h4>
                                                        <p className="text-gray-400 text-sm leading-relaxed">{h.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {project.architecture && (
                                        <div className="mb-8" style={getRevealStyle(isVisible, "fade-up", idx * 200 + 800)}>
                                            <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">System Architecture</h4>
                                            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-2">
                                                <div className="flex items-center gap-2 min-w-max p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                                    {project.architecture.map((step, i) => (
                                                        <div key={step} className="flex items-center gap-2">
                                                            <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500/15 to-transparent border border-purple-500/20 text-purple-300 text-sm font-medium whitespace-nowrap">
                                                                {step}
                                                            </div>
                                                            {i < project.architecture!.length - 1 && (
                                                                <svg className="w-5 h-5 text-purple-500/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {project.modelComparison && (
                                        <div className="mb-8" style={getRevealStyle(isVisible, "fade-up", idx * 200 + 900)}>
                                            <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Model Comparison</h4>
                                            <div className="hidden sm:block overflow-x-auto rounded-xl border border-white/5">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-white/5">
                                                            <th className="text-left px-5 py-3 text-gray-400 font-medium">Model</th>
                                                            <th className="text-center px-5 py-3 text-gray-400 font-medium">Accuracy</th>
                                                            <th className="text-center px-5 py-3 text-gray-400 font-medium">Precision</th>
                                                            <th className="text-center px-5 py-3 text-gray-400 font-medium">Recall</th>
                                                            <th className="text-center px-5 py-3 text-gray-400 font-medium">F1 Score</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {project.modelComparison.map((m) => (
                                                            <tr key={m.model} className={`border-b border-white/5 ${m.winner ? "bg-purple-500/10" : "hover:bg-white/[0.02]"}`}>
                                                                <td className="px-5 py-3 text-white font-medium flex items-center gap-2">
                                                                    {m.winner && <span className="text-yellow-400">🏆</span>}
                                                                    {m.model}
                                                                </td>
                                                                <td className="text-center px-5 py-3 text-gray-300">{m.accuracy}</td>
                                                                <td className="text-center px-5 py-3 text-gray-300">{m.precision}</td>
                                                                <td className="text-center px-5 py-3 text-gray-300">{m.recall}</td>
                                                                <td className="text-center px-5 py-3 text-gray-300">{m.f1}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="sm:hidden space-y-3">
                                                {project.modelComparison.map((m) => (
                                                    <div key={m.model} className={`p-4 rounded-xl border border-white/5 ${m.winner ? "bg-purple-500/10 border-purple-500/20" : "bg-white/[0.02]"}`}>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            {m.winner && <span className="text-yellow-400">🏆</span>}
                                                            <span className="text-white font-medium text-sm">{m.model}</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                                            <div><span className="text-gray-400">Accuracy</span><div className="text-gray-300 font-medium">{m.accuracy}</div></div>
                                                            <div><span className="text-gray-400">Precision</span><div className="text-gray-300 font-medium">{m.precision}</div></div>
                                                            <div><span className="text-gray-400">Recall</span><div className="text-gray-300 font-medium">{m.recall}</div></div>
                                                            <div><span className="text-gray-400">F1</span><div className="text-gray-300 font-medium">{m.f1}</div></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
