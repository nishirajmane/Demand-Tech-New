"use client";

import type { CSSProperties, HTMLAttributes, ReactNode, ElementType, ComponentType } from 'react';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

interface CardRotation {
    x: number;
    y: number;
}

const CardContext = createContext<CardRotation>({ x: 0, y: 0 });

interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function CardContainer({
    className = '',
    children,
    style,
    ...rest
}: CardContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState<CardRotation>({ x: 0, y: 0 });

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const element = containerRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width; // 0 to 1
        const py = (event.clientY - rect.top) / rect.height; // 0 to 1
        const rotateY = (px - 0.5) * 20; // -10deg to 10deg
        const rotateX = (0.5 - py) * 20; // -10deg to 10deg

        setRotation({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotation({ x: 0, y: 0 });
    }, []);

    const combinedStyle: CSSProperties = {
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...style,
    };

    return (
        <CardContext.Provider value={rotation}>
            <div
                ref={containerRef}
                className={className}
                style={combinedStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                {...rest}
            >
                {children}
            </div>
        </CardContext.Provider>
    );
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function CardBody({
    className = '',
    children,
    style,
    ...rest
}: CardBodyProps) {
    const rotation = useContext(CardContext);

    const combinedStyle: CSSProperties = {
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 150ms ease-out',
        willChange: 'transform',
        ...style,
    };

    return (
        <div className={className} style={combinedStyle} {...rest}>
            {children}
        </div>
    );
}

interface CardItemProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    className?: string;
    translateZ?: number | string;
    children?: ReactNode;
}

export function CardItem({
    as: Component = 'div',
    className = '',
    children,
    translateZ,
    style,
    ...rest
}: CardItemProps) {
    const tz = typeof translateZ === 'number' ? `${translateZ}px` : translateZ || '0px';

    const combinedStyle: CSSProperties = {
        transform: `translateZ(${tz})`,
        transformStyle: 'preserve-3d',
        ...style,
    };

    // Ensure the polymorphic component accepts children in its props
    const Comp = Component as ComponentType<any>;

    return (
        <Comp
            className={className}
            style={combinedStyle}
            {...rest}
        >
            {children}
        </Comp>
    );
}
