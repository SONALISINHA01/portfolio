"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: position.x,
                top: position.y,
                width: "500px",
                height: "500px",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, rgba(6,182,212,0.03) 30%, transparent 70%)",
                opacity: isVisible ? 1 : 0,
                transitionProperty: "opacity",
                transitionDuration: "0.3s",
            }}
        />
    );
}
