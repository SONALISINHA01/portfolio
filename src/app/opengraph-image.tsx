import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Portfolio of Sonali — ML Engineer & Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#050208",
                    fontFamily: "Inter",
                    position: "relative",
                }}
            >
                {/* Background orbs */}
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        left: "20%",
                        width: 350,
                        height: 350,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "15%",
                        right: "20%",
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.14), transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%)",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Avatar ring */}
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            background:
                                "linear-gradient(135deg, #06b6d4, #7c3aed, #ec4899)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 4,
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                background: "#0f0a1a",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 40,
                                color: "white",
                                fontWeight: 700,
                            }}
                        >
                            S
                        </div>
                    </div>

                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 800,
                            color: "white",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Sonali
                    </div>

                    <div
                        style={{
                            fontSize: 24,
                            color: "#9ca3af",
                            fontWeight: 400,
                        }}
                    >
                        ML Engineer & Software Developer
                    </div>

                    {/* Tags */}
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            marginTop: 20,
                        }}
                    >
                        {["500+ DSA", "ML in Production", "Systems"].map(
                            (tag) => (
                                <div
                                    key={tag}
                                    style={{
                                        padding: "8px 22px",
                                        borderRadius: 999,
                                        background: "rgba(124,58,237,0.15)",
                                        border: "1px solid rgba(124,58,237,0.25)",
                                        color: "#c4b5fd",
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}
                                >
                                    {tag}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
