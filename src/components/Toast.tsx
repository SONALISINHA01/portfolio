"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    useEffect,
    ReactNode,
} from "react";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface ToastContextValue {
    showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextValue>({
    showToast: () => {},
});

export function useToast() {
    return useContext(ToastContext);
}

function ToastItem({
    toast,
    onDismiss,
}: {
    toast: Toast;
    onDismiss: (id: string) => void;
}) {
    const [state, setState] = useState<"entering" | "visible" | "exiting">(
        "entering"
    );

    useEffect(() => {
        const showTimer = setTimeout(() => setState("visible"), 30);
        const dismissTimer = setTimeout(() => {
            setState("exiting");
            setTimeout(() => onDismiss(toast.id), 300);
        }, 4000);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(dismissTimer);
        };
    }, [toast.id, onDismiss]);

    const handleDismiss = useCallback(() => {
        setState("exiting");
        setTimeout(() => onDismiss(toast.id), 300);
    }, [toast.id, onDismiss]);

    const colorMap = {
        success: "border-emerald-500/40 bg-emerald-500/10",
        error: "border-red-500/40 bg-red-500/10",
        info: "border-purple-500/40 bg-purple-500/10",
    };

    const iconMap = {
        success: (
            <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        error: (
            <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        info: (
            <svg className="w-4 h-4 text-purple-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    };

    return (
        <div
            role="status"
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl
                shadow-lg shadow-black/20 text-sm text-white min-w-[280px] max-w-[420px]
                transition-all duration-300
                ${colorMap[toast.type]}
                ${
                    state === "entering"
                        ? "translate-y-3 opacity-0"
                        : state === "exiting"
                        ? "translate-y-3 opacity-0"
                        : "translate-y-0 opacity-100"
                }
            `}
        >
            {iconMap[toast.type]}
            <span className="flex-1">{toast.message}</span>
            <button
                onClick={handleDismiss}
                className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-150"
                aria-label="Dismiss notification"
            >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const idCounter = useRef(0);

    const showToast = useCallback(
        (message: string, type: Toast["type"] = "info") => {
            const id = `toast-${++idCounter.current}`;
            setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
        },
        []
    );

    const dismissToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                aria-live="polite"
                aria-atomic="true"
                className="fixed bottom-6 right-6 z-[80] flex flex-col gap-3 pointer-events-none"
            >
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} onDismiss={dismissToast} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
