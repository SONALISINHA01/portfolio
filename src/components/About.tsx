"use client";

import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";

const skills = [
    { name: "Python", category: "lang" },
    { name: "C/C++", category: "lang" },
    { name: "JavaScript", category: "lang" },
    { name: "TypeScript", category: "lang" },
    { name: "SQL", category: "lang" },
    { name: "Flask", category: "framework" },
    { name: "FastAPI", category: "framework" },
    { name: "React", category: "framework" },
    { name: "Next.js", category: "framework" },
    { name: "XGBoost", category: "ml" },
    { name: "Scikit-learn", category: "ml" },
    { name: "Pandas", category: "ml" },
    { name: "NumPy", category: "ml" },
    { name: "SMOTE", category: "ml" },
    { name: "Matplotlib", category: "ml" },
    { name: "Streamlit", category: "ml" },
    { name: "Multithreading", category: "systems" },
    { name: "CPU Scheduling", category: "systems" },
    { name: "Git/GitHub", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "Linux", category: "tools" },
    { name: "VS Code", category: "tools" },
    { name: "Communication", category: "soft" },
    { name: "Team Collaboration", category: "soft" },
    { name: "Problem Solving", category: "soft" },
    { name: "Adaptability", category: "soft" },
    { name: "Leadership", category: "soft" },
];

const categoryColors: Record<string, string> = {
    lang: "from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-300",
    framework: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 text-cyan-300",
    ml: "from-pink-500/20 to-pink-600/10 border-pink-500/20 text-pink-300",
    systems: "from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-300",
    tools: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-300",
    soft: "from-rose-500/20 to-rose-600/10 border-rose-500/20 text-rose-300",
};

export default function About() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-4 sm:px-6"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-purple-400 mb-3 block">
                        About Me
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Bridging <span className="gradient-text">ML & Engineering</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                    {/* Bio */}
                    <div
                        className="md:col-span-2 glass-card p-6 sm:p-8"
                        style={getRevealStyle(isVisible, "fade-right", 150)}
                    >
                        <div className="mb-6">
                            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-lg shadow-purple-500/10">
                                <img
                                    src="/professional-photo.jpg"
                                    alt="Professional profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            I&apos;m Sonali, an engineer who loves building practical products
                            at the intersection of machine learning and software engineering.
                            I care about solutions that are not just accurate, but maintainable
                            and useful in the real world.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            With <span className="text-white font-medium">500+ DSA
                                problems</span> solved and hands-on ML pipeline experience,
                            I bring a problem-solving mindset to every build: thoughtful
                            architecture, clean code, and dependable delivery.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            My projects range from{" "}
                            <span className="text-cyan-400">XGBoost-based prediction systems</span>{" "}
                            to{" "}
                            <span className="text-purple-400">multithreaded OS simulators</span>,
                            and each one reflects how I think: structured, curious, and
                            focused on impact.
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div
                        className="md:col-span-3"
                        style={getRevealStyle(isVisible, "fade-left", 300)}
                    >
                        <h3 className="text-lg font-semibold text-white mb-6">
                            Tech Arsenal
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <span
                                    key={skill.name}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium border bg-gradient-to-br backdrop-blur-sm cursor-default ${categoryColors[skill.category]}`}
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
                                        transitionProperty: "opacity, transform",
                                        transitionDuration: "0.5s",
                                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                        transitionDelay: isVisible ? `${i * 40 + 400}ms` : "0ms",
                                    }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>

                        {/* Category legend */}
                        <div
                            className="flex flex-wrap gap-4 mt-8 text-xs text-gray-500"
                            style={getRevealStyle(isVisible, "fade-up", 1200)}
                        >
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-purple-500" />
                                Languages
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                Frameworks
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-pink-500" />
                                ML/Data
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                Systems
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Tools
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500" />
                                Soft Skills
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
