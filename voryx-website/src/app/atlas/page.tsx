'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: "SAINT ANTÖNIEN",
    subtitle: "Switzerland Alps",
    description: "Experience the pristine beauty of the Swiss Alps, where snow-capped peaks meet crystal-clear mountain air in perfect harmony.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=500&fit=crop",
    bgColor: "from-blue-900 to-gray-700"
  },
  {
    id: 2,
    title: "NAGANO PREFECTURE",
    subtitle: "Japan Alps",
    description: "Discover the majestic Japanese Alps, where ancient traditions blend seamlessly with breathtaking mountain landscapes.",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=500&fit=crop",
    bgColor: "from-indigo-800 to-blue-600"
  },
  {
    id: 3,
    title: "MARRAKECH MERZOUGA",
    subtitle: "Sahara Desert - Morocco",
    description: "Journey through golden dunes and experience the timeless beauty of the Sahara, where endless horizons meet starlit skies.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=500&fit=crop",
    bgColor: "from-orange-700 to-yellow-600"
  },
  {
    id: 4,
    title: "YOSEMITE NATIONAL PARK",
    subtitle: "Sierra Nevada - United States",
    description: "Explore iconic granite cliffs, ancient sequoias, and cascading waterfalls in one of America's most treasured natural wonders.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
    bgColor: "from-green-800 to-teal-600"
  },
  {
    id: 5,
    title: "LOS LANCES BEACH",
    subtitle: "Tarifa - Spain",
    description: "Feel the Atlantic breeze on pristine shores where Europe meets Africa, a paradise for wind and water sports enthusiasts.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop",
    bgColor: "from-cyan-700 to-blue-500"
  },
  {
    id: 6,
    title: "GÖREME VALLEY",
    subtitle: "Cappadocia - Turkey",
    description: "Marvel at otherworldly rock formations and ancient cave dwellings beneath a sky filled with colorful hot air balloons.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&h=900&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=500&fit=crop",
    bgColor: "from-purple-800 to-pink-600"
  }
];

type Destination = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cardImage: string;
  bgColor: string;
};

type ImageContentProps = {
  destination: Destination;
  isCard?: boolean;
};

const ImageContent = ({ destination, isCard = false }: ImageContentProps) => (
  <div className="absolute inset-0">
    <div className={`absolute inset-0 bg-gradient-to-br ${destination.bgColor}`} />
    <div className="absolute inset-0">
      <img 
        src={isCard ? destination.cardImage : destination.image}
        alt={destination.title}
        className="w-full h-full object-cover opacity-70"
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center',
          minWidth: '100%',
          minHeight: '100%'
        }}
        onError={(e) => {
          console.error('Image failed to load:', (e.target as HTMLImageElement).src);
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />
  </div>
);

export default function Atlas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [expandingId, setExpandingId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const bgTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentDestination = destinations[currentIndex];
  const backgroundDestination = destinations[backgroundIndex];
  
  useEffect(() => {
    return () => {
      if (bgTimerRef.current) clearTimeout(bgTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);
  
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 1; i <= 4; i++) {
      const index = (currentIndex + i) % destinations.length;
      cards.push({
        ...destinations[index],
        originalIndex: index
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const handleTransition = (newIndex: number, cardId: number) => {
    // 如果正在过渡中，忽略点击
    if (isTransitioning) return;
    
    // 清除之前的定时器
    if (bgTimerRef.current) clearTimeout(bgTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    
    // 设置过渡状态
    setIsTransitioning(true);
    setExpandingId(cardId);
    setCurrentIndex(newIndex);
    
    // zoom out 动画完成后立即更新背景
    bgTimerRef.current = setTimeout(() => {
      setBackgroundIndex(newIndex);
      setExpandingId(null);
      
      // 背景更新后再等待一小段时间让背景切换完成，然后解锁
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 850);
  };

  const handleCardClick = (clickedIndex: number, cardId: number) => {
    handleTransition(clickedIndex, cardId);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % destinations.length;
    handleTransition(nextIndex, destinations[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + destinations.length) % destinations.length;
    handleTransition(prevIndex, destinations[prevIndex].id);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <style jsx>{`
        /* Navigation Buttons - Responsive */
        .atlas-nav-btn {
          width: clamp(40px, 6vw, 48px);
          height: clamp(40px, 6vw, 48px);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        
        .atlas-nav-btn:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        
        .atlas-nav-btn:not(:disabled):active {
          transform: scale(0.95);
        }
        
        .atlas-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .card-disabled {
          pointer-events: none;
          opacity: 0.6;
        }

        /* Responsive Typography */
        .atlas-title {
          font-size: clamp(2rem, 8vw, 5rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
        }

        .atlas-subtitle {
          font-size: clamp(0.75rem, 1.5vw, 0.875rem);
          letter-spacing: 0.1em;
        }

        .atlas-description {
          font-size: clamp(0.875rem, 1.8vw, 1.125rem);
          line-height: 1.6;
        }

        .atlas-button {
          padding: clamp(0.625rem, 1.5vw, 0.875rem) clamp(1.25rem, 3vw, 1.75rem);
          font-size: clamp(0.875rem, 1.5vw, 1rem);
        }

        .atlas-card-title {
          font-size: clamp(0.75rem, 1.2vw, 1rem);
        }

        .atlas-card-subtitle {
          font-size: clamp(0.625rem, 1vw, 0.75rem);
        }

        /* Responsive Layout */
        .atlas-content-wrapper {
          display: flex;
          flex-direction: column;
          padding-top: clamp(3rem, 12vh, 6rem);
        }

        .atlas-left-content {
          padding: clamp(1.5rem, 4vw, 3rem);
        }

        .atlas-right-cards {
          padding: clamp(1rem, 3vw, 3rem);
          padding-top: clamp(8rem, 15vh, 16rem);
        }

        .atlas-divider {
          width: clamp(3rem, 8vw, 4rem);
          height: 2px;
        }

        /* Card Sizing - Responsive */
        .atlas-card {
          width: clamp(140px, 18vw, 192px);
          height: clamp(180px, 24vw, 256px);
          border-radius: clamp(12px, 2vw, 16px);
        }

        .atlas-card-gap {
          gap: clamp(0.75rem, 2vw, 1rem);
        }

        /* Mobile Landscape Optimization */
        @media (max-width: 896px) and (orientation: landscape) {
          .atlas-content-wrapper {
            padding-top: 2rem;
          }

          .atlas-right-cards {
            padding-top: 4rem;
          }

          .atlas-title {
            font-size: clamp(1.5rem, 6vw, 3rem);
          }
        }

        /* Mobile Portrait */
        @media (max-width: 640px) and (orientation: portrait) {
          .atlas-content-wrapper {
            flex-direction: column;
          }

          .atlas-left-content {
            width: 100%;
            padding: 2rem 1.5rem;
          }

          .atlas-right-cards {
            width: 100%;
            padding: 1rem 1rem 2rem;
            padding-top: 2rem;
          }

          .atlas-title {
            font-size: clamp(2rem, 10vw, 3rem);
          }

          .atlas-card {
            width: clamp(120px, 28vw, 160px);
            height: clamp(160px, 36vw, 220px);
          }
        }

        /* Tablet Portrait */
        @media (min-width: 641px) and (max-width: 1024px) and (orientation: portrait) {
          .atlas-content-wrapper {
            flex-direction: column;
          }

          .atlas-left-content {
            width: 100%;
            padding: 3rem 2rem;
          }

          .atlas-right-cards {
            width: 100%;
            padding: 2rem;
            padding-top: 4rem;
          }
        }

        /* Desktop */
        @media (min-width: 1025px) {
          .atlas-content-wrapper {
            flex-direction: row;
          }

          .atlas-left-content {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 50%;
            display: flex;
            align-items: center;
          }

          .atlas-right-cards {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
        }

        /* Large Desktop */
        @media (min-width: 1920px) {
          .atlas-title {
            font-size: 5.5rem;
          }

          .atlas-description {
            font-size: 1.25rem;
          }

          .atlas-card {
            width: 220px;
            height: 280px;
          }
        }

        /* Color Definitions */
        .text-voryx-accent { color: #d4af37; }
        .bg-voryx-accent { background-color: #d4af37; }
        .hover\\:bg-voryx-accent:hover { background-color: #d4af37; }
        
        /* Text Shadow for Better Readability */
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={`bg-${backgroundDestination.id}`}
          initial={false}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <ImageContent destination={backgroundDestination} />
        </motion.div>
      </div>

      {/* Expanding card overlay */}
      <AnimatePresence mode="wait">
        {expandingId && (
          <motion.div
            key={`expanding-${expandingId}`}
            layoutId={`shared-${expandingId}`}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-[5]"
            transition={{ 
              layout: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
              x: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
              opacity: { duration: 0.3 }
            }}
            style={{
              inset: 0,
              x: '-20vw'
            }}
          >
            <ImageContent destination={destinations.find(d => d.id === expandingId) ?? currentDestination} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center z-10 pt-24">
        <div className="w-full h-full relative">
          {/* Left Content */}
          <div className="atlas-left-content">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`content-${currentDestination.id}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full"
              >
                <div className="atlas-divider bg-white mb-4" />
                <p className="atlas-subtitle text-white mb-4 tracking-wide uppercase">
                  {currentDestination.subtitle}
                </p>
                <h1 className="atlas-title text-white font-bold mb-6 tracking-tight text-shadow-lg">
                  {currentDestination.title}
                </h1>
                <p className="atlas-description text-white/90 mb-8 leading-relaxed">
                  {currentDestination.description}
                </p>
                <button className="atlas-button inline-flex items-center gap-2 rounded-lg bg-voryx-accent text-black font-bold hover:bg-white transition-all duration-300">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Cards with Navigation */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-start pl-8 pt-64 px-12">
            <div className="relative flex items-center gap-4">
              {/* Left Navigation Button */}
              <button 
                onClick={handlePrev}
                disabled={isTransitioning}
                className="atlas-nav-btn"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2} />
              </button>

              {/* Cards Container */}
              <div className="flex gap-4">
                <AnimatePresence mode="popLayout">
                  {visibleCards.slice(0, 3).map((dest, idx) => {
                    const isExpanding = expandingId === dest.id;
                    
                    return (
                      <motion.div
                        key={dest.id}
                        layoutId={`shared-${dest.id}`}
                        initial={{ opacity: 0, scale: 0.8, x: 100 }}
                        animate={{ 
                          opacity: isExpanding ? 0 : 1, 
                          scale: 1, 
                          x: 0 
                        }}
                        exit={{ opacity: 0, scale: 0.8, x: -50 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: idx * 0.1,
                          opacity: { duration: 0.2 }
                        }}
                        onClick={() => !isTransitioning && handleCardClick(dest.originalIndex, dest.id)}
                        className={`relative w-48 h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl flex-shrink-0 ${
                          isTransitioning ? 'card-disabled' : ''
                        }`}
                        whileHover={!isExpanding && !isTransitioning ? { scale: 1.05, y: -10 } : {}}
                      >
                        <ImageContent destination={dest} isCard={true} />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                          <p className="text-xs mb-1 opacity-80">{dest.subtitle}</p>
                          <h3 className="text-base font-bold leading-tight">{dest.title}</h3>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Right Navigation Button */}
              <button 
                onClick={handleNext}
                disabled={isTransitioning}
                className="atlas-nav-btn"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}