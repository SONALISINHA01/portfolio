import React from "react";

interface SectionDividerProps {
    fromColor?: string;
    viaColor?: string;
    toColor?: string;
    opacity?: number;
    className?: string;
    variant?: "default" | "wide" | "narrow";
}

export default function SectionDivider({
    fromColor = "transparent",
    viaColor = "rgba(124, 58, 237, 0.2)",
    toColor = "transparent",
    opacity = 1,
    className = "",
    variant = "default",
}: SectionDividerProps) {
    const maxWidth = variant === "wide" ? "max-w-5xl" : variant === "narrow" ? "max-w-md" : "max-w-3xl";

    return (
        <div
            className={`section-divider relative w-full flex items-center justify-center pointer-events-none ${className}`}
            style={{ opacity }}
            aria-hidden="true"
        >
            <div
                className={`w-full ${maxWidth} mx-auto h-full`}
                style={{
                    background: `linear-gradient(90deg, ${fromColor}, ${viaColor}, ${toColor})`,
                    borderRadius: "9999px",
                    maskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            />
        </div>
    );
}
