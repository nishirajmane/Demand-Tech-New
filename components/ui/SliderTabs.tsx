"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface Position {
    left: number;
    width: number;
    opacity: number;
}

interface TabProps {
    children: ReactNode;
    setPosition: (position: Position | ((prev: Position) => Position)) => void;
    href?: string;
    isActive?: boolean;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[];
    dropdownKey?: string;
}

interface DropdownItem {
    title: string;
    href: string;
}

interface CursorProps {
    position: Position;
}

interface DropdownMenuProps {
    items: DropdownItem[];
    isOpen: boolean;
}

export const SlideTabsExample: React.FC = () => {
    return (
        <div className="bg-transparent py-5 px-125 z-[10000]">
            <SlideTabs />
        </div>
    );
};

const SlideTabs: React.FC = () => {
    const [position, setPosition] = useState<Position>({
        left: 0,
        width: 0,
        opacity: 0,
    });
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<{ left: number; top: number } | null>(null);
    const pathname = usePathname();

    // Dropdown menu configurations
    const servicesDropdown: DropdownItem[] = [
        {
            title: "Demand Generation",
            href: "/services/demand-generation",
        },
        {
            title: "Marketing",
            href: "/services/marketing",
        }
    ];

    const aboutDropdown: DropdownItem[] = [
        {
            title: "Our Clients",
            href: "/about/clients",
        },
        {
            title: "Blogs",
            href: "/about/blogs",
        },
        {
            title: "Case Studies",
            href: "/about/case-studies",
        },
        {
            title: "Learning Resources",
            href: "/about/resources",
        }
    ];

    // const productsDropdown: DropdownItem[] = [
    //     {
    //         title: "Dialer Solution",
    //         href: "/products",
    //     },
    //     {
    //         title: "CRM Platform",
    //         href: "/products/crm",
    //     },
    //     {
    //         title: "HRMS Platform",
    //         href: "/products/hrms",
    //     },
    // ];

    // Set initial cursor position for active tab
    useEffect(() => {
        const timer = setTimeout(() => {
            const activeTab = document.querySelector(`[data-href="${pathname}"]`) as HTMLLIElement;
            if (activeTab) {
                const { width } = activeTab.getBoundingClientRect();
                setPosition({
                    left: activeTab.offsetLeft,
                    width,
                    opacity: 1,
                });
            } else {
                const firstTab = document.querySelector('[data-href]') as HTMLLIElement;
                if (firstTab) {
                    const { width } = firstTab.getBoundingClientRect();
                    setPosition({
                        left: firstTab.offsetLeft,
                        width,
                        opacity: 1,
                    });
                }
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    const handleMouseLeave = () => {
        // Only hide if not hovering over dropdown
        setTimeout(() => {
            if (!isDropdownHovered) {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
                setActiveDropdown(null);
            }
        }, 100);
    };

    const handleDropdownMouseEnter = () => {
        setIsDropdownHovered(true);
    };

    const handleDropdownMouseLeave = () => {
        setIsDropdownHovered(false);
        setActiveDropdown(null);
        setPosition((pv) => ({
            ...pv,
            opacity: 0,
        }));
    };

    return (
        <div className="relative z-[10000] overflow-visible">
            <motion.ul
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onMouseLeave={handleMouseLeave}
                className="relative mx-auto flex w-fit rounded-full px-1 py-2"
                style={{
                    background: 'rgba(10, 19, 103, 0.25)',
                    backdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0px',
                }}
            >
                <Tab
                    setPosition={setPosition}
                    setActiveDropdown={setActiveDropdown}
                    setDropdownPos={setDropdownPos}
                    href="/"
                    isActive={pathname === "/"}
                >
                    Home
                </Tab>

                <Tab
                    setPosition={setPosition}
                    setActiveDropdown={setActiveDropdown}
                    setDropdownPos={setDropdownPos}
                    href="/services"
                    isActive={pathname.startsWith("/services")}
                    hasDropdown={true}
                    dropdownItems={servicesDropdown}
                    dropdownKey="services"
                >
                    Services
                </Tab>

                <Tab
                    setPosition={setPosition}
                    setActiveDropdown={setActiveDropdown}
                    setDropdownPos={setDropdownPos}
                    href="/products"
                    isActive={pathname === "/products"}
                    hasDropdown={false}
                    // dropdownItems={productsDropdown}
                    dropdownKey="products"
                >
                    Products
                </Tab>

                <Tab
                    setPosition={setPosition}
                    setActiveDropdown={setActiveDropdown}
                    setDropdownPos={setDropdownPos}
                    href="/about"
                    isActive={pathname.startsWith("/about")}
                    hasDropdown={true}
                    dropdownItems={aboutDropdown}
                    dropdownKey="about"
                >
                    About
                </Tab>

                <Tab
                    setPosition={setPosition}
                    setActiveDropdown={setActiveDropdown}
                    setDropdownPos={setDropdownPos}
                    href="/pricing"
                    isActive={pathname === "/pricing"}
                >
                    Pricing
                </Tab>

                <Cursor position={position} />
            </motion.ul>

            {/* Portal-based dropdown to avoid clipping */}
            {typeof window !== 'undefined' && activeDropdown && dropdownPos && createPortal(
                (
                    <div
                        className="z-[10000]"
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                        style={{
                            position: 'fixed',
                            left: dropdownPos.left,
                            top: dropdownPos.top,
                            transform: 'translateX(-50%)',
                            pointerEvents: 'auto'
                        }}
                    >
                        <AnimatePresence>
                            {activeDropdown === 'services' && (
                                <DropdownMenu items={servicesDropdown} isOpen={true} />
                            )}
                            {/* {activeDropdown === 'products' && (
                                <DropdownMenu items={productsDropdown} isOpen={true} />
                            )} */}
                            {activeDropdown === 'about' && (
                                <DropdownMenu items={aboutDropdown} isOpen={true} />
                            )}
                        </AnimatePresence>
                    </div>
                ),
                document.body
            )}
        </div>
    );

    function Tab({ children, setPosition, setActiveDropdown, setDropdownPos, href, isActive = false, hasDropdown = false, dropdownItems, dropdownKey }: TabProps & { setActiveDropdown: (key: string | null) => void; setDropdownPos: (pos: { left: number; top: number } | null) => void; dropdownKey?: string }) {
        const ref = useRef<HTMLLIElement>(null);
        const router = useRouter();
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseEnter = () => {
            if (!ref?.current) return;

            const { width } = ref.current.getBoundingClientRect();

            setPosition({
                left: ref.current.offsetLeft,
                width,
                opacity: 1,
            });

            setIsHovered(true);

            if (hasDropdown && dropdownKey) {
                setActiveDropdown(dropdownKey);
                const rect = ref.current.getBoundingClientRect();
                // Position dropdown centered under the tab with 8px gap
                setDropdownPos({ left: rect.left + rect.width / 2, top: rect.bottom + 8 });
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };

        const handleClick = () => {
            if (href) {
                router.push(href);
            }
        };

        return (
            <li
                ref={ref}
                data-href={href}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                className={`relative z-10 block cursor-pointer transition-all duration-300 rounded-full ${isActive ? 'text-white font-clash font-medium nav-tab-active' : 'text-white'
                    }`}
                style={{
                    fontFamily: 'Clash Display, sans-serif',
                    fontWeight: isActive ? '500' : '400',
                    fontSize: '17px',
                    padding: '3.8px 24px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '90px',
                    backgroundColor: 'transparent'
                }}
            >
                <span className="flex items-center gap-1 font-clash">
                    {children}
                    {hasDropdown && (
                        <motion.svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                            className="ml-1"
                            animate={{ rotate: isHovered ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                    )}
                </span>
                {isActive && (
                    <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </li>
        );
    }
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
    return (
        <motion.li
            animate={{
                left: position.left,
                width: position.width,
                opacity: position.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            className="absolute z-0 rounded-full"
            style={{
                backgroundColor: '#1D00F8',
                height: '40px',
                top: '4px'
            }}
        />
    );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isOpen }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="z-[10000] rounded-2xl shadow-2xl overflow-visible border mt-1"
            style={{
                background: 'rgba(10, 19, 103, 0.25)',
                backdropFilter: 'blur(14px) saturate(140%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 60px rgba(199, 199, 199, 0.5)',
                minWidth: '280px',
                maxWidth: '400px'
            }}
        >
            <div className="p-5">
                <div className="grid gap-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                            <Link
                                href={item.href}
                                className="group block p-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium font-clash text-white group-hover:text-[#5B5BFF] transition-colors duration-200">
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Navigation Menu Component (for compatibility)
export const EnhancedNavigationMenu: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (href: string) => {
        window.dispatchEvent(new CustomEvent('start-page-transition'));
        setTimeout(() => {
            router.push(href);
        }, 100);
    };

    return (
        <nav className="flex items-center gap-6">
            <Link
                href="/"
                onClick={() => handleNavigation('/')}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
                Home
            </Link>

            <div className="relative group">
                <Link
                    href="/services"
                    onClick={() => handleNavigation('/services')}
                    className="text-white hover:text-blue-200 transition-colors duration-200 font-medium flex items-center gap-1"
                >
                    Services
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="group-hover:rotate-180 transition-transform duration-200">
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[10000]">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 min-w-[280px] p-4">
                        <Link href="/services/demand-generation" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Demand Generation</div>
                            <div className="text-sm text-gray-600 mt-1">Strategic demand generation campaigns</div>
                        </Link>
                        <Link href="/services/lead-generation" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Lead Generation</div>
                            <div className="text-sm text-gray-600 mt-1">Quality lead generation services</div>
                        </Link>
                        <Link href="/services/digital-marketing" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Digital Marketing</div>
                            <div className="text-sm text-gray-600 mt-1">Comprehensive digital marketing solutions</div>
                        </Link>
                    </div>
                </div>
            </div>

            <Link
                href="/products"
                onClick={() => handleNavigation('/products')}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
                Products
            </Link>

            <div className="relative group">
                <Link
                    href="/about"
                    onClick={() => handleNavigation('/about')}
                    className="text-white hover:text-blue-200 transition-colors duration-200 font-medium flex items-center gap-1"
                >
                    About
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="group-hover:rotate-180 transition-transform duration-200">
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 min-w-[280px] p-4">
                        <Link href="/about/overview" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Company Overview</div>
                            <div className="text-sm text-gray-600 mt-1">Learn about our mission and vision</div>
                        </Link>
                        <Link href="/about/team" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Our Team</div>
                            <div className="text-sm text-gray-600 mt-1">Meet our experienced professionals</div>
                        </Link>
                        <Link href="/about/clients" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Clients</div>
                            <div className="text-sm text-gray-600 mt-1">Our valued clients and partnerships</div>
                        </Link>
                        <Link href="/about/case-studies" className="block p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                            <div className="font-medium text-gray-900">Case Studies</div>
                            <div className="text-sm text-gray-600 mt-1">Success stories and results</div>
                        </Link>
                    </div>
                </div>
            </div>

            <Link
                href="/pricing"
                onClick={() => handleNavigation('/pricing')}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
                Pricing
            </Link>
        </nav>
    );
};