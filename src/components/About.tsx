"use client";

import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import SkillTooltip from "./SkillTooltip";

const skills = [
    { name: "Python", category: "lang", tooltip: "Primary language for ML pipelines, data analysis, and backend services" },
    { name: "C/C++", category: "lang", tooltip: "Systems programming, memory management, and performance-critical code" },
    { name: "JavaScript", category: "lang", tooltip: "Frontend interactivity, Node.js APIs, and full-stack development" },
    { name: "TypeScript", category: "lang", tooltip: "Type-safe React/Next.js applications with compile-time error checking" },
    { name: "SQL", category: "lang", tooltip: "Relational data modeling, complex queries, and database optimization" },
    { name: "Flask", category: "framework", tooltip: "Lightweight Python web framework for ML model serving APIs" },
    { name: "FastAPI", category: "framework", tooltip: "Async Python APIs with automatic OpenAPI docs and validation" },
    { name: "React", category: "framework", tooltip: "Component-based UI with hooks, context, and state management" },
    { name: "Next.js", category: "framework", tooltip: "Full-stack React framework with SSR, SSG, and API routes" },
    { name: "XGBoost", category: "ml", tooltip: "Gradient-boosted trees for tabular prediction — 89% precision on attrition model" },
    { name: "Scikit-learn", category: "ml", tooltip: "Classical ML: classification, regression, pipelines, and model evaluation" },
    { name: "Pandas", category: "ml", tooltip: "Data wrangling, feature engineering, and exploratory data analysis" },
    { name: "NumPy", category: "ml", tooltip: "Vectorized numerical computing and array operations for ML" },
    { name: "SMOTE", category: "ml", tooltip: "Synthetic Minority Oversampling for handling imbalanced datasets" },
    { name: "Matplotlib", category: "ml", tooltip: "Data visualization, model performance charts, and EDA plots" },
    { name: "Streamlit", category: "ml", tooltip: "Interactive ML demo apps — used for the Employee Attrition predictor" },
    { name: "Multithreading", category: "systems", tooltip: "Concurrent programming with mutex locks and thread synchronization" },
    { name: "CPU Scheduling", category: "systems", tooltip: "OS-level process scheduling algorithms — built a real-time visualizer" },
    { name: "Git/GitHub", category: "tools", tooltip: "Version control, branching strategies, code reviews, and CI/CD" },
    { name: "Docker", category: "tools", tooltip: "Containerized deployments with Dockerfiles and compose workflows" },
    { name: "Linux", category: "tools", tooltip: "Command-line proficiency, shell scripting, and server administration" },
    { name: "VS Code", category: "tools", tooltip: "Primary IDE with extensions for Python, TypeScript, and Docker" },
];

const softSkills = [
    "Communication",
    "Team Collaboration",
    "Problem Solving",
    "Adaptability",
    "Leadership",
    "Ownership",
    "Time Management",
];

const categoryColors: Record<string, string> = {
    lang: "from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-300",
    framework: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 text-cyan-300",
    ml: "from-pink-500/20 to-pink-600/10 border-pink-500/20 text-pink-300",
    systems: "from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-300",
    tools: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-300",
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
                <div style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-purple-400 mb-3 block">
                        About Me
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Bridging <span className="gradient-text">ML & Engineering</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                    <div
                        className="md:col-span-2 glass-card glass-card--about p-6 sm:p-8"
                        style={getRevealStyle(isVisible, "fade-right", 150)}
                    >
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

                    <div
                        className="md:col-span-3"
                        style={getRevealStyle(isVisible, "fade-left", 300)}
                    >
                        <h3 className="text-lg font-semibold text-white mb-6">
                            Tech Arsenal
                        </h3>
                        <div className="flex flex-wrap gap-5">
                            {skills.map((skill, i) => {
                                const waveDelay = Math.round(Math.sin(i * 0.3) * 200 + i * 30);
                                return (
                                    <SkillTooltip key={skill.name} content={skill.tooltip}>
                                        <span
                                            className={`px-4 py-2 rounded-xl text-sm font-medium border bg-gradient-to-br backdrop-blur-sm cursor-default ${categoryColors[skill.category]}`}
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
                                                transitionProperty: "opacity, transform",
                                                transitionDuration: "0.5s",
                                                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                                transitionDelay: isVisible ? `${waveDelay + 400}ms` : "0ms",
                                            }}
                                        >
                                            {skill.name}
                                        </span>
                                    </SkillTooltip>
                                );
                            })}
                        </div>

                        <div
                            className="flex flex-wrap gap-4 mt-8 text-xs text-gray-400"
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
                        </div>

                        <div className="mt-10" style={getRevealStyle(isVisible, "fade-up", 1300)}>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 mb-4">
                                Soft Skills
                            </h4>
                            <div className="flex flex-wrap gap-4">
                                {softSkills.map((skill, i) => {
                                    const waveDelay = Math.round(Math.sin(i * 0.3) * 150 + i * 35);
                                    return (
                                        <span
                                            key={skill}
                                            className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border border-rose-400/25 bg-gradient-to-br from-rose-500/20 to-rose-600/10 text-rose-200"
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                                                transitionProperty: "opacity, transform",
                                                transitionDuration: "0.45s",
                                                transitionDelay: isVisible ? `${waveDelay + 1350}ms` : "0ms",
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
