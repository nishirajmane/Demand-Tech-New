"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";
import Button from "@/components/ui/Button";
import CountUp from "react-countup";
import Element2 from "../preloader/Element2";

export default function RuixenStats() {
  const data = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 90 },
    { month: "Mar", value: 140 },
    { month: "Apr", value: 200 },
    { month: "May", value: 240 },
    { month: "Jun", value: 300 },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
      {/* Left: Text & CTA */}

      <div className="flex flex-col justify-center gap-2 sm:gap-6">
        <div className="mt-[-100px] z-[999] ml-[-360px] align-center">
          <Element2 />
        </div>
        <div className="mt-[-0px] z-[999] align-center">
          <div className="text-base font-clash font-regular sm:text-xl lg:text-3xl font-normal text-[blue] leading-relaxed">
            Data-Driven Growth with  <span className="text-primary">DemandTech</span>{" "}
            <span className="block mt-2 text-black text-sm sm:text-base lg:text-xl font-clash font-regular"> Turn complex data into clear insights with our advanced analytics platform—helping you make faster, smarter, and more confident business decisions.</span>
          </div>
          <div className="mt-15">
            <Button label="Get Started" href="/about" />
          </div>
        </div>
      </div>

      {/* Right: Chart + Stats */}
      <div className="relative w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ruixenBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#ruixenBlue)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Overlay Hero Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-3">
          <h3 className="text-5xl sm:text-6xl lg:text-[84px] font-medium text-[blue] drop-shadow-md leading-none">
            <CountUp end={145} duration={2.5} />M
          </h3>
          <p className="text-[blue] text-sm sm:text-base lg:text-xl font-normal">Global Data Base</p>
        </div>

        {/* Side Stats */}
        <div className="hidden md:flex absolute right-4 top-4 rounded-xl shadow-md p-4 flex-col gap-4 bg-white/90 backdrop-blur-sm">
          {[
            { value: "143M+", label: "Business Leaders" },
            { value: "260k", label: "Leads Delivered" },
            { value: "25%", label: "Lead to Opportunity" },
            { value: "50+", label: "Countries" },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-lg lg:text-xl font-normal text-[blue]">{stat.value}</p>
              <p className="text-xs lg:text-sm font-normal text-[blue]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mobile Stats Bar */}
        <div className="md:hidden absolute inset-x-3 bottom-3 rounded-xl shadow-md p-3 bg-white/90 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              { value: "143M+", label: "Business Leaders" },
              { value: "260k", label: "Leads Delivered" },
              { value: "25%", label: "Lead to Opportunity" },
              { value: "50+", label: "Countries" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-base font-medium text-[blue]">{stat.value}</span>
                <span className="text-[11px] text-[blue] opacity-80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
