import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { PanInfo } from 'framer-motion';
import React from "react";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  imageUrl: string; // Agora cada item tem uma imagem
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, title: 'Text Animations', description: 'Cool text animations for your projects.', imageUrl: 'src/assets/hero-stage.jpg' },
  { id: 2, title: 'Animations', description: 'Smooth animations for your projects.', imageUrl: 'src/assets/hero-stage.jpg' },
  { id: 3, title: 'Components', description: 'Reusable components for your projects.', imageUrl: 'src/assets/hero-stage.jpg' },
  { id: 4, title: 'Backgrounds', description: 'Beautiful backgrounds and patterns for your projects.', imageUrl: 'src/assets/hero-stage.jpg' },
  { id: 5, title: 'Common UI', description: 'Common UI components are coming soon!', imageUrl: 'src/assets/hero-stage.jpg' }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: { left: -trackItemOffset * (carouselItems.length - 1), right: 0 }
      };

  return (
    <div
      ref={containerRef}
      className={`border border-white/10 w-full h-full overflow-hidden p-4 ${round ? 'rounded-full' : 'rounded-[24px]'}`}

    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
     
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });

          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col justify-end overflow-hidden cursor-grab active:cursor-grabbing ${
                round ? 'items-center' : 'items-start'
              }`}
              style={{
                width: itemWidth,
                height: '100%',
                rotateY: rotateY,
                borderRadius: round ? '50%' : '12px'
              }}
              transition={effectiveTransition}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                draggable={false}
                className=" top-0 left-0 w-full h-full object-cover"
              />
              <div className="relative z-10 p-5 bg-black/50 text-white">
                <div className="mb-1 font-black text-lg">{item.title}</div>
                <p className="text-sm">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Indicators */}
      <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index ? 'bg-white' : 'bg-white/40'
              }`}
              animate={{ scale: currentIndex % items.length === index ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
