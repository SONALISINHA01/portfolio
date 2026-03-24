import React from "react";

type IconProps = {
    className?: string;
    "aria-hidden"?: boolean;
};

function SpriteIcon({ id, className = "w-6 h-6" }: IconProps & { id: string }) {
    return (
        <svg className={className} aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <use href={`#${id}`} />
        </svg>
    );
}

export const ChartBarIcon = (props: IconProps) => <SpriteIcon id="icon-chart-bar" {...props} />;
export const ScaleIcon = (props: IconProps) => <SpriteIcon id="icon-scale" {...props} />;
export const TrophyIcon = (props: IconProps) => <SpriteIcon id="icon-trophy" {...props} />;
export const RocketIcon = (props: IconProps) => <SpriteIcon id="icon-rocket" {...props} />;
export const ArrowPathIcon = (props: IconProps) => <SpriteIcon id="icon-arrow-path" {...props} />;
export const BoltIcon = (props: IconProps) => <SpriteIcon id="icon-bolt" {...props} />;
export const ComputerDesktopIcon = (props: IconProps) => <SpriteIcon id="icon-computer-desktop" {...props} />;
export const PresentationChartLineIcon = (props: IconProps) => <SpriteIcon id="icon-presentation-chart-line" {...props} />;
export const PuzzleIcon = (props: IconProps) => <SpriteIcon id="icon-puzzle" {...props} />;
export const StarIcon = (props: IconProps) => <SpriteIcon id="icon-star" {...props} />;
export const AcademicCapIcon = (props: IconProps) => <SpriteIcon id="icon-academic-cap" {...props} />;
export const CpuChipIcon = (props: IconProps) => <SpriteIcon id="icon-cpu-chip" {...props} />;
export const BriefcaseIcon = (props: IconProps) => <SpriteIcon id="icon-briefcase" {...props} />;
export const CodeBracketIcon = (props: IconProps) => <SpriteIcon id="icon-code-bracket" {...props} />;
export const BeakerIcon = (props: IconProps) => <SpriteIcon id="icon-beaker" {...props} />;
export const ServerStackIcon = (props: IconProps) => <SpriteIcon id="icon-server-stack" {...props} />;
export const GlobeAltIcon = (props: IconProps) => <SpriteIcon id="icon-globe-alt" {...props} />;

// FireIcon kept as inline (not used in sprite)
export const FireIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
    </svg>
);
