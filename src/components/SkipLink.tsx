"use client";

import { useEffect, useRef } from "react";

export default function SkipLink() {
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const link = linkRef.current;
        if (!link) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Tab" && !e.shiftKey) {
                link.style.opacity = "1";
                link.style.pointerEvents = "auto";
                link.style.transform = "translateY(0)";
            }
        };

        const handleBlur = () => {
            link.style.opacity = "0";
            link.style.pointerEvents = "none";
            link.style.transform = "translateY(-100%)";
        };

        link.addEventListener("blur", handleBlur);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            link.removeEventListener("blur", handleBlur);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <a
            ref={linkRef}
            href="#main-content"
            className="fixed top-0 left-4 z-[100] px-4 py-2 rounded-b-lg bg-purple-600 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
            style={{
                opacity: 0,
                pointerEvents: "none",
                transform: "translateY(-100%)",
                transition: "opacity 0.2s, transform 0.2s",
            }}
        >
            Skip to content
        </a>
    );
}
