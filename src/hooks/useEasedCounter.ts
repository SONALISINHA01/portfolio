"use client";

import { useEffect, useRef, useState } from "react";

type EasingFunction = (t: number) => number;

export const easings = {
    easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
    easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
    easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutCubic: (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

interface UseEasedCounterOptions {
    target: number;
    duration?: number;
    easing?: EasingFunction;
    decimals?: number;
    delay?: number;
    separator?: string;
    prefix?: string;
    suffix?: string;
}

interface UseEasedCounterReturn {
    ref: React.RefObject<HTMLSpanElement | null>;
    displayValue: string;
    isAnimating: boolean;
}

export function useEasedCounter({
    target,
    duration = 1500,
    easing = easings.easeOutQuart,
    decimals = 0,
    delay = 0,
    separator = ",",
    prefix = "",
    suffix = "",
}: UseEasedCounterOptions): UseEasedCounterReturn {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayValue, setDisplayValue] = useState(
        formatValue(0, decimals, separator, prefix, suffix)
    );
    const [isAnimating, setIsAnimating] = useState(false);
    const animFrameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function tick() {
            const now = performance.now();
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const currentValue = easedProgress * target;

            setDisplayValue(formatValue(currentValue, decimals, separator, prefix, suffix));

            if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(tick);
            } else {
                setDisplayValue(formatValue(target, decimals, separator, prefix, suffix));
                setIsAnimating(false);
            }
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimatedRef.current) {
                    hasAnimatedRef.current = true;

                    if (reducedMotion) {
                        setDisplayValue(formatValue(target, decimals, separator, prefix, suffix));
                        return;
                    }

                    setIsAnimating(true);

                    if (delay > 0) {
                        setTimeout(() => {
                            startTimeRef.current = performance.now();
                            animFrameRef.current = requestAnimationFrame(tick);
                        }, delay);
                    } else {
                        startTimeRef.current = performance.now();
                        animFrameRef.current = requestAnimationFrame(tick);
                    }

                    observer.unobserve(element);
                }
            },
            { threshold: 0, rootMargin: "0px 0px -25% 0px" }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [target, duration, easing, decimals, separator, prefix, suffix, delay]);

    return { ref, displayValue, isAnimating };
}

function formatValue(
    value: number,
    decimals: number,
    separator: string,
    prefix: string,
    suffix: string
): string {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split(".");
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const decimalPart = parts[1] ? `.${parts[1]}` : "";
    return `${prefix}${intPart}${decimalPart}${suffix}`;
}

/**
 * Framework-agnostic utility to animate a counter element.
 * Call this to initialize counters from data attributes or explicit values.
 * Returns a cleanup function to cancel the animation.
 */
export function initEasedCounter(
    element: HTMLElement,
    options: Omit<UseEasedCounterOptions, "ref">
): () => void {
    const {
        target,
        duration = 1500,
        easing = easings.easeOutQuart,
        decimals = 0,
        delay = 0,
        separator = ",",
        prefix = "",
        suffix = "",
    } = options;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
        element.textContent = formatValue(target, decimals, separator, prefix, suffix);
        return () => {};
    }

    let animFrame = 0;
    let startTime = 0;
    let disposed = false;

    function tick() {
        if (disposed) return;
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        const currentValue = easedProgress * target;
        element.textContent = formatValue(currentValue, decimals, separator, prefix, suffix);

        if (progress < 1) {
            animFrame = requestAnimationFrame(tick);
        } else {
            element.textContent = formatValue(target, decimals, separator, prefix, suffix);
        }
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                if (delay > 0) {
                    setTimeout(() => {
                        if (disposed) return;
                        startTime = performance.now();
                        animFrame = requestAnimationFrame(tick);
                    }, delay);
                } else {
                    startTime = performance.now();
                    animFrame = requestAnimationFrame(tick);
                }
                observer.unobserve(element);
            }
        },
        { threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );

    observer.observe(element);

    return () => {
        disposed = true;
        cancelAnimationFrame(animFrame);
        observer.disconnect();
    };
}
