"use client";

import { useEffect, useRef, useState } from "react";
import { ScaleIcon, ArrowPathIcon, ServerStackIcon } from "./Icons";
import React from "react";

const articles = [
    {
        title: "How I Handled Class Imbalance in Employee Data using SMOTE",
        excerpt:
            "A deep dive into why class imbalance breaks standard ML models, the mathematics behind Synthetic Minority Oversampling, and practical implementation tips for production datasets.",
        tags: ["Machine Learning", "SMOTE", "Data Engineering"],
        readTime: "8 min read",
        icon: <ScaleIcon className="w-7 h-7 text-purple-400" />,
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/15",
    },
    {
        title: "Multithreading in Python: Lessons from Building a CPU Scheduler",
        excerpt:
            "How I managed race conditions, implemented mutex locks, and separated computation from UI rendering threads — practical concurrency lessons from a real project.",
        tags: ["Systems Programming", "Python", "Concurrency"],
        readTime: "10 min read",
        icon: <ArrowPathIcon className="w-7 h-7 text-cyan-400" />,
        color: "from-cyan-500/20 to-blue-500/20",
        borderColor: "border-cyan-500/15",
    },
    {
        title: "From Notebook to Production: Deploying ML Models with FastAPI & Docker",
        excerpt:
            "The bridge between data science experiments and production engineering — containerization, API design, and monitoring for ML systems.",
        tags: ["MLOps", "FastAPI", "Docker"],
        readTime: "12 min read",
        icon: <ServerStackIcon className="w-7 h-7 text-emerald-400" />,
        color: "from-emerald-500/20 to-teal-500/20",
        borderColor: "border-emerald-500/15",
    },
];

export default function Blog() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <section id="blog" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
                }}
            />

            <div className="max-w-6xl mx-auto">
                <div
                    className={`mb-16 transition-all duration-700 ${isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                        }`}
                >
                    <span className="text-sm font-medium tracking-widest uppercase text-cyan-400 mb-3 block">
                        Writing
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Technical{" "}
                        <span className="gradient-text">Blog</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-lg">
                        Sharing knowledge through detailed technical writeups — proving
                        communication skills alongside code.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <article
                            key={article.title}
                            className={`glass-card p-6 sm:p-8 group cursor-pointer transition-all duration-700 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 150 + 200}ms` }}
                        >
                            {/* Icon & Read time */}
                            <div className="flex items-center justify-between mb-5">
                                <span>{article.icon}</span>
                                <span className="text-xs text-gray-500 font-medium">
                                    {article.readTime}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-snug">
                                {article.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {article.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/5"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Read more */}
                            <div className="flex items-center gap-2 text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                                Read Article
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
