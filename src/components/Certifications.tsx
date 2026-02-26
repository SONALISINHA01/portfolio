"use client";

import React from "react";
import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import { CpuChipIcon, BriefcaseIcon, CodeBracketIcon } from "./Icons";

const certifications = [
    {
        title: "Amazon ML Summer School",
        issuer: "Amazon · 2024",
        description: "Intensive program covering fundamentals of ML including supervised/unsupervised learning, deep learning, and MLOps.",
        highlight: "Implemented Backpropagation from scratch — understanding gradient flow and weight updates at the mathematical level.",
        icon: <CpuChipIcon className="w-7 h-7 text-amber-400" />,
        color: "from-amber-500 to-orange-500",
        borderColor: "border-amber-500/20",
    },
    {
        title: "McKinsey Forward Program",
        issuer: "McKinsey & Company · 2024",
        description: "Professional development program focusing on problem-solving frameworks, structured thinking, and business communication.",
        highlight: "Developed structured problem-solving and stakeholder communication skills — essential for L4/L5 levels at FAANG.",
        icon: <BriefcaseIcon className="w-7 h-7 text-blue-400" />,
        color: "from-blue-500 to-indigo-500",
        borderColor: "border-blue-500/20",
    },
    {
        title: "Python for Data Science",
        issuer: "NPTEL/IIT · 2023",
        description: "Comprehensive course covering Python fundamentals, data manipulation with Pandas, and statistical analysis.",
        highlight: "Built a strong foundation in Pythonic data processing and numerical computing.",
        icon: <CodeBracketIcon className="w-7 h-7 text-emerald-400" />,
        color: "from-emerald-500 to-teal-500",
        borderColor: "border-emerald-500/20",
    },
];

export default function Certifications() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="certifications" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)" }} />

            <div className="max-w-6xl mx-auto">
                <div style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-purple-400 mb-3 block">Learning</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Certifications & <span className="gradient-text">Growth</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-base sm:text-lg mb-16">
                        Continuous learning from industry leaders and top institutions.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative max-w-3xl">
                    <div className="timeline-line" />

                    <div className="space-y-12">
                        {certifications.map((cert, i) => (
                            <div
                                key={cert.title}
                                className="relative pl-14 sm:pl-16"
                                style={getRevealStyle(isVisible, "fade-left", i * 200 + 200)}
                            >
                                <div className="timeline-dot" style={{ top: "1.5rem" }} />

                                <div className={`glass-card p-6 sm:p-8 border ${cert.borderColor}`}>
                                    <div className="flex items-start gap-4 mb-4">
                                        <span>{cert.icon}</span>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-white">{cert.title}</h3>
                                                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${cert.color} text-white shrink-0`}>
                                                    Certified
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{cert.description}</p>

                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <p className="text-sm">
                                            <span className="text-purple-400 font-medium">Key takeaway: </span>
                                            <span className="text-gray-400">{cert.highlight}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
