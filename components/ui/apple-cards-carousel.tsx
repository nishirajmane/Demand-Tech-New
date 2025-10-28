"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useOutsideClick } from "../../hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  // ✅ FIXED: No forced scroll on close
  const handleCardClose = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-6 pl-4",
              "mx-auto max-w-7xl"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[20%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-hidden">
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 h-full w-full bg-black/80"
            />

            {/* Scrollable Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 max-w-5xl 
                   max-h-[85vh] overflow-y-auto overscroll-contain flex flex-col
                   rounded-3xl bg-white/90 backdrop-blur-xl 
                   shadow-2xl p-6 md:p-10"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain", // ✅ Prevent background scroll chaining
              }}
              onWheel={(e) => e.stopPropagation()} // ✅ Stop wheel from reaching body
              onTouchMove={(e) => e.stopPropagation()} // ✅ Stop touch scroll bubbling
            >
              {/* Close Button */}
              <div
                className="sticky top-0 right-0 ml-auto flex h-8 w-8 items-center 
                     justify-center rounded-full bg-black text-white z-50"
                onClick={handleClose}
              >
                ✕
              </div>

              {/* Category */}
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-xl font-normal text-[#898989] font-clash"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {card.category}
              </motion.p>

              {/* Title */}
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-2 text-3xl md:text-5xl font-normal text-[#574BEF] dark:text-[#574BEF] font-clash"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {card.title}
              </motion.p>

              {/* Content */}
              <div className="py-6 text-lg leading-relaxed text-[#000000] font-neu">
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Preview Card */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex flex-col items-start justify-start 
                   overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900
                   min-w-[16rem] sm:min-w-[18rem] md:min-w-[20rem] lg:min-w-[22rem]
                   aspect-[3/4] max-w-xs sm:max-w-sm lg:max-w-md"
      >
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full 
                        bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        {/* Text on Card */}
        <div className="relative z-40 p-6">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-clash text-xs sm:text-sm md:text-base font-medium text-white"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-clash text-lg sm:text-xl md:text-2xl font-semibold [text-wrap:balance] text-white"
          >
            {card.title}
          </motion.p>
        </div>

        {/* Background Image */}
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};
