"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onLoad?: () => void;
}

export default function ImageWithSkeleton({
    src,
    alt,
    width,
    height,
    fill = false,
    sizes,
    priority = false,
    className = "",
    style,
    onLoad,
}: ImageWithSkeletonProps) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded && onLoad) onLoad();
    }, [loaded, onLoad]);

    return (
        <div className={`relative ${fill ? "w-full h-full" : ""}`} style={!fill ? { width, height } : undefined}>
            {/* Skeleton shimmer */}
            {!loaded && (
                <div
                    className="absolute inset-0 rounded-[inherit] overflow-hidden"
                    style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%)",
                        backgroundSize: "200% 100%",
                        animation: "skeleton-shimmer 1.5s ease-in-out infinite",
                    }}
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                fill={fill}
                sizes={sizes}
                priority={priority}
                className={`${className}`}
                style={{
                    ...style,
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.5s ease-out",
                }}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
