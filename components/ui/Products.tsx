"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Monitor, LayoutDashboard, Users } from "lucide-react"; // ✅ Lucide icons  
import ButtonProduct from "@/components/ui/ButtonProduct";

// Avoid SSR hydration issues by loading react-countup on the client.
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

/** Hook: respects user's motion preferences */ 
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined" || !("matchMedia" in window)) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
        setReduced(mq.matches);
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);
    return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
    const value = (raw ?? "").toString().trim();
    const m = value.match(
        /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
    );
    if (!m) {
        return { prefix: "", end: 0, suffix: value, decimals: 0 };
    }
    const [, prefix, num, suffix] = m;
    const normalized = num.replace(/,/g, "");
    const end = parseFloat(normalized);
    const decimals = (normalized.split(".")[1]?.length ?? 0);
    return {
        prefix: prefix ?? "",
        end: isNaN(end) ? 0 : end,
        suffix: suffix ?? "",
        decimals,
    };
}

/** Small component: one animated metric */
function MetricStat({
    value,
    label,
    sub,
    duration = 1.6,
}: {
    value: string;
    label: string;
    sub?: string;
    duration?: number;
}) {
    const reduceMotion = usePrefersReducedMotion();
    const { prefix, end, suffix, decimals } = parseMetricValue(value);
    const hasLettersOrSlash = /[A-Za-z\/]/.test(value);
    const shouldAnimate = !reduceMotion && !hasLettersOrSlash;

    return (
        <div className="flex flex-col gap-2 text-left p-6">
            <p
                className="text-2xl font-medium font-clash text-black sm:text-4xl"
                aria-label={`${label} ${value}`}
            >
                {shouldAnimate ? (
                    <>
                        {prefix}
                        <CountUp
                            end={end}
                            decimals={decimals}
                            duration={duration}
                            separator=","
                            enableScrollSpy
                            scrollSpyOnce
                        />
                        {suffix}
                    </>
                ) : (
                    <span>{value}</span>
                )}
            </p>
            <p className="font-medium text-[blue] text-left font-neu">
                {label}
            </p>
            {sub ? (
                <p className="text-black text-left font-neu ">{sub}</p>
            ) : null}
        </div>
    );
}

export default function Products() {
    const caseStudies = [
        {
            id: 1,
            quote:
                "Empower your workforce with a modern HRMS that automates payroll, attendance, recruitment, and performance management—all in one place.",
            name: "Aarav Mehta",
            role: "Frontend Engineer",
            title: "HRMS",
            image:
                "hrmsdash.png",
            icon: Monitor,
            metrics: [
                { value: "24/7", label: "Mobile Access", sub: "Employees and managers stay connected anywhere." },
                { value: "60%", label: "Cut Employee Onboarding Time", sub: "Digital onboarding streamlines documentation and approvals." },
            ],
        },
        {
            id: 2,
            quote:
                "Demand Tech’s cloud-based dialer empowers teams with automation and intelligence for smarter calling.",
            bullets: [
                "Auto-dialing, call recording, and agent-assist prompts",
                "Real-time analytics with live dashboards and quality scorecards",
                "Native CRM integration for seamless, closed-loop workflows",
                "Improves lead conversion and customer engagement",
                "Drives sales productivity; scalable for fast-growing teams",
                "Streamlines communication for sustainable growth",
            ],
            name: "Sophia Patel",
            role: "Operations Manager",
            title: "Automated Dialer",
            image:
                "Application Dialler.webp",
            icon: LayoutDashboard,
            metrics: [
                { value: "30 s", label: "First-Call Connect", sub: "Accelerated call sequencing reduces delays and improves buyer experience." },
                { value: "30 days", label: "Call Recording Retention", sub: "Securely store and access all call recordings with 30-day retention for compliance and quality monitoring." },
            ],
        },
        // {
        //     id: 3,
        //     quote:
        //         "The collaborative features in Ruixen UI changed the way our team communicates. Everything is more transparent, and onboarding is seamless.",
        //     name: "David Liu",
        //     role: "Team Lead",
        //     title: "CRM",
        //     image:
        //         "",
        //     icon: Users,
        //     metrics: [
        //         { value: "2x", label: "Faster Onboarding", sub: "For new hires" },
        //         { value: "88%", label: "Collaboration Boost", sub: "Teamwide adoption" },
        //     ],
        // },
    ];

    return (
        <section
            className="py-10 rounded-[20px] bg-white/30 backdrop-blur-[10px] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.5),_inset_0_-1px_0_rgba(255,255,255,0.1)] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:opacity-60 before:pointer-events-none before:-z-10 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30 after:opacity-30 after:pointer-events-none after:-z-10"
            aria-labelledby="case-studies-heading"
        >
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-[blue] flex flex-col gap-4 text-center max-w-6xl mx-auto">
                    <div
                        id="case-studies-heading"
                        className="text-5xl font-clash font-normal md:text-5xl sm:text-3xl text-[blue]"
                    >
                        Products by DemandTech
                    </div>
                    <p className="text-black font-clash text-xl">
                        From design systems to operations—DemandTech powers teams with speed,
                        clarity, and consistency.
                    </p>
                </div>

                {/* Cases */}
                <div className="mt-20 flex flex-col gap-4">
                    {caseStudies.map((study, idx) => {
                        const reversed = idx % 2 === 1;
                        const isSecond = idx === 1;
                        return (
                            <div
                                key={study.id}
                                className={[
                                    "grid items-center pb-12",
                                    isSecond
                                        ? "gap-8 xl:gap-12 lg:grid-cols-[0.9fr_0.1fr_3.1fr]"
                                        : "gap-12 xl:gap-24 lg:grid-cols-3",
                                ].join(" ")}
                            >
                                {/* Left: Image + Quote */}
                                <div
                                    className={[
                                        "flex flex-col sm:flex-row gap-10 lg:col-span-2 text-left",
                                        // Apply border on content only when it's not the second block
                                        !isSecond && !reversed ? "lg:border-r border-[blue] lg:pr-12 xl:pr-16" : "",
                                        !isSecond && reversed ? "lg:order-2 lg:border-xl border-[blue] lg:pl-12 xl:pl-20 lg:pr-0" : reversed ? "lg:order-2" : "",
                                    ].join(" ")}
                                >
                                    <Image
                                        src={study.image ? (study.image.startsWith('/') ? study.image : `/${study.image}`) : '/placeholder.png'}
                                        alt={`${study.name} portrait`}
                                        width={600}
                                        height={724}
                                        className={[
                                            // Ensure full image visibility for the Dialer Solution (second block)
                                            isSecond
                                                ? "h-[360px] md:h-[420px] lg:h-[480px] w-auto rounded-2xl object-contain overflow-hidden hover:scale-105 transition-all duration-300 shrink-0"
                                                : "aspect-[29/35] h-auto w-full rounded-2xl object-cover overflow-hidden hover:scale-105 transition-all duration-300 shrink-0",
                                            isSecond ? "max-w-none md:w-[22rem] lg:w-[26rem] xl:w-[30rem] md:min-w-[22rem] lg:min-w-[26rem] xl:min-w-[30rem]" : "max-w-60 min-w-[15rem]",
                                        ].join(" ")}
                                        priority={false}
                                    />
                                    <figure className="flex flex-col justify-between gap-8 text-left flex-1">
                                        <blockquote className="text-lg sm:text-xl text-black leading-relaxed text-left">
                                            <h3 className="text-lg sm:text-xl lg:text-xl font-normal text-[blue] leading-relaxed text-left">
                                                {study.title} {" "}
                                                {study.quote ? (
                                                    <span className="block text-black font-normal font-neu text-sm sm:text-base lg:text-lg mt-2">
                                                        {study.quote}
                                                    </span>
                                                ) : null}
                                                {Array.isArray((study as any).bullets) && (study as any).bullets.length > 0 ? (
                                                    <ul className="mt-4 space-y-2 text-black font-neu text-sm sm:text-base lg:text-lg list-disc list-inside">
                                                        {(study as any).bullets.map((item: string, i: number) => (
                                                            <li key={i} className="leading-snug">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </h3>
                                        </blockquote>
                                        <figcaption className="flex items-center gap-6 mt-4 text-left">
                                            <div className="flex flex-col gap-2">
                                                <ButtonProduct text="Book a demo" href="/contact" />
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

                                {/* Right: Metrics */}
                                <div
                                    className={[
                                        "grid grid-cols-1 gap-10 self-center text-left text-[blue]",
                                        reversed ? "lg:order-1" : "",
                                        // For second block, move the vertical separator to the left (on metrics column) and reduce padding so border is closer to content
                                        isSecond ? "lg:border-r border-[blue] pr-4 xl:pr-6" : "",
                                    ].join(" ")}
                                >
                                    {study.metrics.map((metric, i) => (
                                        <MetricStat
                                            key={`${study.id}-${i}`}
                                            value={metric.value}
                                            label={metric.label}
                                            sub={metric.sub}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}