"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    sectionName?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(`Error in ${this.props.sectionName || "component"}:`, error, errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <section className="relative py-24 md:py-32 px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="glass-card p-8 sm:p-12 max-w-lg mx-auto">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Something went wrong
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {this.props.sectionName
                                    ? `The ${this.props.sectionName} section failed to load.`
                                    : "This section failed to load."}
                            </p>
                            <button
                                onClick={() => this.setState({ hasError: false, error: null })}
                                className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </section>
            );
        }

        return this.props.children;
    }
}
