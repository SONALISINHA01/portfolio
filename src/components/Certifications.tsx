"use client";

import React from "react";
import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import { CpuChipIcon, BriefcaseIcon, CodeBracketIcon } from "./Icons";
import ImageWithSkeleton from "./ImageWithSkeleton";

type LearningItem = {
    title: string;
    org: string;
    date: string;
    description: string;
    link?: string;
    previewImage?: string;
    previewAlt?: string;
    icon: React.ReactNode;
    borderColor: string;
    badgeColor: string;
};

const certifications: LearningItem[] = [
    {
        title: "Machine Learning Made Easy: From Basics to AI Applications",
        org: "Centre for Professional Enhancement, Lovely Professional University",
        date: "Jun-Jul 2025",
        description: "Completed a focused skill-development program covering core machine learning concepts, model building, and practical AI application workflows.",
        link: "https://drive.google.com/file/d/1khdYp_IcIMXanxsUPJqGhzEfPqAAvK53/view",
        previewImage: "/certifications/machine-learning-certificate.jpg",
        previewAlt: "Machine learning certification from Lovely Professional University",
        icon: <CpuChipIcon className="w-6 h-6 text-purple-300" />,
        borderColor: "border-purple-500/20",
        badgeColor: "from-purple-500 to-fuchsia-500",
    },
    {
        title: "Computer Communications Specialization",
        org: "University of Colorado System",
        date: "Nov 2024",
        description: "Completed a Coursera specialization on networking fundamentals, including protocols, packet switching, peer-to-peer systems, and advanced TCP/IP topics.",
        link: "https://www.coursera.org/account/accomplishments/specialization/HEKZJTZ86CMP",
        previewImage: "/certifications/computer-communications-certificate.svg",
        previewAlt: "Computer Communications specialization certificate from Coursera",
        icon: <CodeBracketIcon className="w-6 h-6 text-cyan-300" />,
        borderColor: "border-cyan-500/20",
        badgeColor: "from-cyan-500 to-blue-500",
    },
    {
        title: "Legacy Responsive Web Design",
        org: "freeCodeCamp",
        date: "Nov 2023",
        description: "Earned developer certification by completing responsive web design projects emphasizing semantic HTML, accessible layouts, and modern CSS techniques.",
        link: "https://www.freecodecamp.org/certification/fccade6e742-b0fc-483f-829f-643a1d90f973/responsive-web-design",
        previewImage: "/certifications/web-design-certificate.svg",
        previewAlt: "Legacy Responsive Web Design certificate from freeCodeCamp",
        icon: <CodeBracketIcon className="w-6 h-6 text-emerald-300" />,
        borderColor: "border-emerald-500/20",
        badgeColor: "from-emerald-500 to-teal-500",
    },
];

const training: LearningItem[] = [
    {
        title: "Amazon ML Summer School",
        org: "Amazon",
        date: "Jul 2025 - Sep 2025",
        description: "Intensive training on supervised and unsupervised learning, deep learning fundamentals, and MLOps workflows.",
        icon: <CpuChipIcon className="w-6 h-6 text-amber-300" />,
        borderColor: "border-amber-500/20",
        badgeColor: "from-amber-500 to-orange-500",
    },
];

const extracurricular: LearningItem[] = [
    {
        title: "McKinsey Forward Program",
        org: "McKinsey & Company",
        date: "2024",
        description: "Structured program that sharpened communication, problem-framing, and professional decision-making skills.",
        icon: <BriefcaseIcon className="w-6 h-6 text-blue-300" />,
        borderColor: "border-blue-500/20",
        badgeColor: "from-blue-500 to-indigo-500",
    },
];

export default function Certifications() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    const sections = [
        { title: "Training", items: training },
        { title: "Certifications", items: certifications },
        { title: "Extracurricular", items: extracurricular },
    ];

    return (
        <section id="certifications" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-purple-400 mb-3 block">Learning</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Training & <span className="gradient-text">Certifications</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-base sm:text-lg mb-16">
                        Focused technical training, formal certifications, and growth experiences that shape my engineering approach.
                    </p>
                </div>

                <div className="space-y-12">
                    {sections.map((section, sectionIdx) => (
                        <div key={section.title} style={getRevealStyle(isVisible, "fade-up", sectionIdx * 120 + 120)}>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-5">{section.title}</h3>
                            <div className="grid gap-4">
                                {section.items.map((item, itemIdx) => (
                                    <div
                                        key={item.title}
                                        className={`glass-card glass-card--cert p-5 sm:p-6 border ${item.borderColor} hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300`}
                                        style={getRevealStyle(isVisible, "fade-left", sectionIdx * 160 + itemIdx * 100 + 200)}
                                    >
                                        <div className="flex items-start gap-3.5 sm:gap-4">
                                            <span className="shrink-0">{item.icon}</span>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                                                    <div>
                                                        <h4 className="text-base sm:text-lg font-bold text-white">{item.title}</h4>
                                                        <p className="text-sm text-gray-400">{item.org}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.badgeColor} text-white shrink-0`}>
                                                        {item.date}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                                {item.previewImage && (
                                                    <div className="mt-3 mb-0">
                                                        <div className="relative w-full max-w-[520px] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-slate-950/40">
                                                            <ImageWithSkeleton
                                                                src={item.previewImage}
                                                                alt={item.previewAlt || `${item.title} certificate preview`}
                                                                fill
                                                                className="object-contain p-1.5 sm:p-2"
                                                                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 520px, 520px"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 mt-3 text-sm text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
                                                    >
                                                        View Credential
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
