"use client";

import React from "react";

type NPSScoreCardProps = {
    score?: number; // fixed NPS score (0-100), defaults to 87
    totalReviews?: number;
    responseRate?: number; // percentage
    periodLabel?: string; // e.g., "Last 30 days"
};

const NPSScoreCard: React.FC<NPSScoreCardProps> = ({
    score = 87,
    totalReviews = 2847,
    responseRate = 94,
    periodLabel = "Last 30 days",
}) => {
    const safeScore = Math.max(0, Math.min(100, score));
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (safeScore / 100) * circumference;

    const getRating = (s: number) => {
        if (s >= 70)
            return {
                text: "Excellent",
                description: "Customers actively recommend your service.",
            } as const;
        if (s >= 50)
            return {
                text: "Good",
                description: "Strong satisfaction with room to improve.",
            } as const;
        if (s >= 30)
            return {
                text: "Average",
                description: "Mixed feedback that needs attention.",
            } as const;
        return {
            text: "Poor",
            description: "Critical issues require immediate action.",
        } as const;
    };

    const rating = getRating(safeScore);

    return (
        <div className="w-full max-w-5xl mx-auto mt-8 sm:mt-10 px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-4 sm:p-6 md:p-8 
    bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg 
    hover:shadow-blue-500/30 transition-all duration-500">

                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <h3 className="font-clash text-lg sm:text-xl md:text-2xl tracking-tight text-[blue]">
                        Net Promoter Score
                    </h3>
                    <span className="font-neu text-[11px] sm:text-xs md:text-sm text-black/60">
                        {periodLabel}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
                    {/* Score ring */}
                    <div className="flex items-center justify-center sm:justify-start">
                        <div className="relative">
                            <svg
                                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-44 lg:h-44 -rotate-90"
                                viewBox="0 0 100 100"
                                role="img"
                                aria-labelledby="npsTitle npsDesc"
                            >
                                <title id="npsTitle">Net Promoter Score</title>
                                <desc id="npsDesc">Circular progress ring showing NPS score percentage</desc>
                                {/* Track */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="rgba(0,0,0,0.08)"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                {/* Progress */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="#000CF8"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-none text-black">
                                    {safeScore}
                                </span>
                                <span className="font-neu text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#000CF8] mt-1">
                                    NPS
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <div className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#000CF8]" />
                                <span className="font-clash text-sm sm:text-base text-black/80">{rating.text}</span>
                            </div>
                            <p className="font-neu text-sm sm:text-base leading-relaxed text-black/80 mt-2">
                                {rating.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-6 sm:gap-8">
                            <div>
                                <div className="font-neu text-xs sm:text-sm text-black/60">Total reviews</div>
                                <div className="font-clash text-lg sm:text-xl text-black">
                                    {totalReviews.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="font-neu text-xs sm:text-sm text-black/60">Response rate</div>
                                <div className="font-clash text-lg sm:text-xl text-black">{responseRate}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NPSScoreCard;