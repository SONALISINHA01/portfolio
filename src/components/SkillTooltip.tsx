"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPopper, Instance } from "@popperjs/core";

interface SkillTooltipProps {
    children: React.ReactNode;
    content: string;
}

export default function SkillTooltip({ children, content }: SkillTooltipProps) {
    const [visible, setVisible] = useState(false);
    const referenceRef = useRef<HTMLSpanElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<Instance | null>(null);

    const initPopper = useCallback(() => {
        if (referenceRef.current && popperRef.current) {
            instanceRef.current = createPopper(referenceRef.current, popperRef.current, {
                placement: "top",
                modifiers: [
                    { name: "offset", options: { offset: [0, 8] } },
                    { name: "preventOverflow", options: { boundary: "viewport" } },
                    { name: "flip", options: { fallbackPlacements: ["bottom", "top-start"] } },
                ],
            });
        }
    }, []);

    useEffect(() => {
        initPopper();
        return () => instanceRef.current?.destroy();
    }, [initPopper]);

    useEffect(() => {
        if (visible) {
            instanceRef.current?.update();
        }
    }, [visible]);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <>
            <span
                ref={referenceRef}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                tabIndex={0}
                aria-describedby={visible ? "skill-tooltip" : undefined}
            >
                {children}
            </span>
            <div
                ref={popperRef}
                id="skill-tooltip"
                role="tooltip"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
                    pointerEvents: visible ? "auto" : "none",
                    zIndex: 50,
                }}
                className="px-3 py-2 rounded-lg text-xs text-gray-300 max-w-[220px] shadow-lg shadow-black/30"
            >
                <div
                    style={{
                        background: "rgba(15, 10, 26, 0.95)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "0.5rem",
                        padding: "0.5rem 0.75rem",
                    }}
                >
                    {content}
                </div>
                <div
                    data-popper-arrow
                    style={{
                        position: "absolute",
                        width: 8,
                        height: 8,
                    }}
                >
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            background: "rgba(15, 10, 26, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            transform: "rotate(45deg)",
                            position: "absolute",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
