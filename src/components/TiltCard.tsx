"use client";

import { useRef, useState, useCallback, ReactNode } from "react";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    glareColor?: string;
    tiltAmount?: number;
}

export default function TiltCard({
    children,
    className = "",
    glareColor = "rgba(124, 58, 237, 0.15)",
    tiltAmount = 8,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * tiltAmount * 2;
            const rotateX = (0.5 - y) * tiltAmount * 2;

            setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
            setGlarePos({ x: x * 100, y: y * 100 });
        },
        [tiltAmount]
    );

    const handleMouseLeave = useCallback(() => {
        setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
        setIsHovering(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform,
                transitionProperty: "transform",
                transitionDuration: isHovering ? "0.1s" : "0.4s",
                transitionTimingFunction: isHovering ? "linear" : "ease-out",
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
        >
            {children}
            {/* Glare effect */}
            <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
                style={{
                    opacity: isHovering ? 1 : 0,
                    transitionProperty: "opacity",
                    transitionDuration: "0.3s",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor} 0%, transparent 60%)`,
                    }}
                />
            </div>
        </div>
    );
}
