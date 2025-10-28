'use client';

import React from 'react';

interface RightScrollStableVideoProps {
    videoSrc: string;
    posterSrc?: string;
    title?: string;
    description?: string;
}

const RightScrollVideo = ({
    videoSrc,
    posterSrc,
    title = 'Turn Data Into Revenue with DemandTech.',
    description = 'We combine cutting-edge technology with expert insights to identify and prioritize your highest-value prospects. By leveraging advanced data intelligence, intent signals, and precision targeting, we ensure your teams focus on the right opportunities at the right time. This strategic approach reduces wasted effort, shortens sales cycles, and increases conversion rates. With DemandTech, you gain a smarter, faster path to revenue growth while building stronger, long-term customer relationships.'
}: RightScrollStableVideoProps) => {
    return (
        <section className="relative flex flex-col md:flex-row items-center justify-between px-[5vw] py-20 gap-8">
            {/* Left Side Description */}
            <div className="w-full md:w-1/2 text-left">
                <h3 className="text-3xl md:text-5xl font-normal text-[blue]" style={{ fontFamily: 'Clash Display' }}>
                    {title}
                </h3>
                <p className="mt-4 text-[Neue Montreal] text-base md:text-lg text-black leading-relaxed">
                    {description}
                </p>
                {/* <div className="mt-6">
          <Button label="Get Started" href="/contact" />
        </div> */}
            </div>

            {/* Right Side Video */}
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={posterSrc}
                        className="w-full h-auto object-cover"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
    );
};

export default RightScrollVideo;
