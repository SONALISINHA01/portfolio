"use client";

import { useState, useCallback } from "react";
import { useScrollReveal, getRevealStyle } from "@/hooks/useScrollAnimations";
import { siteConfig } from "@/lib/config";
import { GlobeAltIcon, CodeBracketIcon, AcademicCapIcon, BeakerIcon } from "./Icons";
import { useToast } from "./Toast";

interface FieldErrors {
    name?: string;
    email?: string;
    message?: string;
}

const socials = [
    {
        name: "GitHub",
        url: "https://github.com/SONALISINHA01",
        icon: <CodeBracketIcon className="w-5 h-5" />,
        glowClass: "social-link--github",
        iconColor: "text-gray-400 group-hover:text-purple-400",
    },
    {
        name: "LinkedIn",
        url: "https://in.linkedin.com/in/sonali-sinha-244853299",
        icon: <GlobeAltIcon className="w-5 h-5" />,
        glowClass: "social-link--linkedin",
        iconColor: "text-gray-400 group-hover:text-purple-400",
    },
    {
        name: "LeetCode",
        url: "https://leetcode.com/u/kinglessworldsking/",
        icon: <AcademicCapIcon className="w-5 h-5" />,
        glowClass: "social-link--leetcode",
        iconColor: "text-gray-400 group-hover:text-amber-400",
    },
    {
        name: "Email",
        url: `mailto:${siteConfig.contactEmail}`,
        icon: <BeakerIcon className="w-5 h-5" />,
        glowClass: "social-link--email",
        iconColor: "text-gray-400 group-hover:text-pink-400",
    },
];

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(formData: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    if (!name) {
        errors.name = "Name is required";
    } else if (name.length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (!email) {
        errors.email = "Email is required";
    } else if (!validateEmail(email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!message) {
        errors.message = "Message is required";
    } else if (message.length < 10) {
        errors.message = "Message must be at least 10 characters";
    }

    return errors;
}

export default function Contact() {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "error">("idle");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const { showToast } = useToast();

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const formData = new FormData();
        formData.set(name, value);
        const errors = validateForm(formData);
        setFieldErrors((prev) => ({ ...prev, [name]: errors[name as keyof FieldErrors] }));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const errors = validateForm(formData);
        setFieldErrors(errors);
        setTouched({ name: true, email: true, message: true });

        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            const el = form.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
            el?.focus();
            return;
        }

        setFormStatus("sending");

        try {
            const res = await fetch(siteConfig.formsubmitUrl, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData,
            });
            const data = await res.json();
            if (data.success === "true" || data.success === true) {
                setFormStatus("idle");
                form.reset();
                setFieldErrors({});
                setTouched({});
                showToast("Message sent! I'll get back to you soon.", "success");
            } else {
                setFormStatus("error");
                showToast("Something went wrong. Please try again.", "error");
                setTimeout(() => setFormStatus("idle"), 4000);
            }
        } catch {
            setFormStatus("error");
            showToast("Network error. Please try again.", "error");
            setTimeout(() => setFormStatus("idle"), 4000);
        }
    };

    const inputClasses = (fieldName: string) =>
        `w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-white placeholder-gray-600 focus:outline-none focus:ring-1 text-sm ${
            touched[fieldName] && fieldErrors[fieldName as keyof FieldErrors]
                ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25"
                : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/25"
        }`;

    return (
        <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="blob blob--pink blob--xs absolute -top-10 left-1/4 opacity-20" />
            </div>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16" style={getRevealStyle(isVisible, "fade-up", 0)}>
                    <span className="text-sm font-medium tracking-widest uppercase text-pink-400 mb-3 block">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
                        Interested in discussing ML engineering, systems programming, or
                        potential opportunities? I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    <div className="glass-card p-6 sm:p-8" style={getRevealStyle(isVisible, "fade-up", 200)}>
                        <form className="space-y-4 sm:space-y-5" noValidate onSubmit={handleSubmit}>
                            <input type="hidden" name="subject" value="New Portfolio Contact" />
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text" id="name" name="name" required autoComplete="name"
                                    aria-invalid={touched.name && !!fieldErrors.name}
                                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                                    className={inputClasses("name")}
                                    style={{ transitionProperty: "border-color, box-shadow", transitionDuration: "0.2s" }}
                                    placeholder="Your name"
                                    onBlur={handleBlur}
                                />
                                {touched.name && fieldErrors.name && (
                                    <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">{fieldErrors.name}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email" id="email" name="email" required autoComplete="email"
                                    aria-invalid={touched.email && !!fieldErrors.email}
                                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                                    className={inputClasses("email")}
                                    style={{ transitionProperty: "border-color, box-shadow", transitionDuration: "0.2s" }}
                                    placeholder="you@example.com"
                                    onBlur={handleBlur}
                                />
                                {touched.email && fieldErrors.email && (
                                    <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">{fieldErrors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message" name="message" rows={4} required
                                    aria-invalid={touched.message && !!fieldErrors.message}
                                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                                    className={`${inputClasses("message")} resize-none`}
                                    style={{ transitionProperty: "border-color, box-shadow", transitionDuration: "0.2s" }}
                                    placeholder="Tell me about an opportunity or just say hi..."
                                    onBlur={handleBlur}
                                />
                                {touched.message && fieldErrors.message && (
                                    <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">{fieldErrors.message}</p>
                                )}
                            </div>
                            <button
                                type="submit" disabled={formStatus === "sending"}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 relative overflow-hidden"
                                style={{ transitionProperty: "box-shadow, transform, opacity", transitionDuration: "0.3s" }}
                            >
                                {formStatus === "idle" && "Send Message"}
                                {formStatus === "sending" && "Sending..."}
                                {formStatus === "error" && "Failed — Try Again"}
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col gap-6" style={getRevealStyle(isVisible, "fade-up", 400)}>
                        <div className="glass-card p-6 sm:p-8 flex-1">
                            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.name} href={s.url}
                                        {...(s.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className={`social-link ${s.glowClass} flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 group transition-colors duration-200`}
                                    >
                                        <span className={`social-link__icon ${s.iconColor} transition-colors duration-200`}>{s.icon}</span>
                                        <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors duration-200">{s.name}</span>
                                        <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-400 ml-auto group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-medium text-emerald-400">Quality Assurance</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                All projects tested with <span className="text-white font-medium">85%+ coverage</span> using <span className="text-cyan-400">Pytest</span>. CI/CD pipelines ensure deployment readiness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-16 md:mt-24 pt-8 border-t border-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-600">
                    <p>© 2026 Sonali. Built with <span className="text-purple-400">Next.js</span> & <span className="text-cyan-400">Tailwind CSS</span></p>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/SONALISINHA01" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-200" aria-label="GitHub">
                            <CodeBracketIcon className="w-4 h-4" />
                        </a>
                        <a href="https://in.linkedin.com/in/sonali-sinha-244853299" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                            <GlobeAltIcon className="w-4 h-4" />
                        </a>
                        <a href="https://leetcode.com/u/kinglessworldsking/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-200" aria-label="LeetCode">
                            <AcademicCapIcon className="w-4 h-4" />
                        </a>
                        <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-500 hover:text-white transition-colors duration-200" aria-label="Email">
                            <BeakerIcon className="w-4 h-4" />
                        </a>
                        <span className="w-px h-4 bg-white/10" />
                        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200" aria-label="Back to top">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
