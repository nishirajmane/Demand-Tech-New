'use client';

import { useEffect, useMemo, useState } from 'react';
import ScrollExpandMedia from '@/components/ui/ScrollExpansion';

interface MediaAbout {
    overview: string;
    conclusion: string;
}

interface MediaContent {
    src: string;
    poster?: string;
    background: string;
    title: null;
    date: string;
    scrollToExpand: string;
    about: MediaAbout;
}

interface MediaContentCollection {
    [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
    video: {
        src: '/about-video.mp4', // Place your video file in public folder
        poster: '/about-thumbnail.png', // Place your video poster in public folder
        background: 'transparent', // Changed to transparent
        title: null,
        date: 'Since 2022',
        scrollToExpand: 'Scroll to Explore',
        about: {
            overview:
                'Revolutionizing B2B marketing since 2022. We\'re passionate marketers with expertise across diverse disciplines - performance specialists, content marketers, designers, and more, all dedicated to driving your business growth.',
            conclusion:
                'Our data-driven strategies and cutting-edge technology solutions help businesses across 15+ industries achieve unprecedented growth and success.',
        },
    },
    image: {
        src: '/about-hero-image.jpg', // Place your hero image in public folder
        background: 'transparent', // Changed to transparent
        title: null,
        date: 'Since 2019',
        scrollToExpand: 'Scroll to Explore',
        about: {
            overview:
                'Revolutionizing B2B marketing since 2019. We\'re passionate marketers with expertise across diverse disciplines - performance specialists, content marketers, designers, and more, all dedicated to driving your business growth.',
            conclusion:
                'Our data-driven strategies and cutting-edge technology solutions help businesses across 15+ industries achieve unprecedented growth and success.',
        },
    },
};

type VideoCardProps = {
    mediaType?: 'video' | 'image';
    videoSrc?: string;
    imageSrc?: string;
    posterSrc?: string;
    background?: string;
    title?: string | null;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
};

const VideoCard = ({
    mediaType: mediaTypeProp = 'video',
    videoSrc,
    imageSrc,
    posterSrc,
    background,
    title = null,
    date,
    scrollToExpand,
    textBlend,
}: VideoCardProps) => {
    // Respect reduced motion: prefer image mode if requested by user
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = () => setReducedMotion(mq.matches);
        handler();
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const mediaType: 'video' | 'image' = useMemo(() => {
        if (reducedMotion && mediaTypeProp === 'video') return 'image';
        return mediaTypeProp;
    }, [reducedMotion, mediaTypeProp]);

    const defaults = sampleMediaContent[mediaType];
    const currentMedia = {
        src: mediaType === 'video' ? (videoSrc || defaults.src) : (imageSrc || defaults.src),
        poster: posterSrc ?? (mediaType === 'video' ? defaults.poster : undefined),
        background: background ?? defaults.background,
        title: title ?? defaults.title,
        date: date ?? defaults.date,
        scrollToExpand: scrollToExpand ?? defaults.scrollToExpand,
        about: defaults.about,
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const resetEvent = new Event('resetSection');
        window.dispatchEvent(resetEvent);
    }, []);

    return (
        <ScrollExpandMedia
            mediaType={mediaType}
            mediaSrc={currentMedia.src}
            posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
            bgImageSrc={currentMedia.background}
            title={currentMedia.title ?? undefined}
            date={currentMedia.date}
            scrollToExpand={currentMedia.scrollToExpand}
            textBlend={textBlend}
        />
    );
};

export default VideoCard;
