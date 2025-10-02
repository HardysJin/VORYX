'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

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
  const [shrinkingId, setShrinkingId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetCardPosition, setTargetCardPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<number | null>(null);
  
  const bgTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  const currentDestination = destinations[currentIndex];
  const backgroundDestination = destinations[backgroundIndex];
  
  useEffect(() => {
    return () => {
      if (bgTimerRef.current) clearTimeout(bgTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);
  
  const getVisibleCards = () => {
    const cardCount = isMobile ? 2 : isTablet ? 3 : 3;
    const cards = [];
    for (let i = 1; i <= cardCount; i++) {
      const index = (currentIndex + i) % destinations.length;
      cards.push({
        ...destinations[index],
        originalIndex: index
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const handleTransitionZoomOut = (newIndex: number, cardId: number) => {
    if (isTransitioning) return;
    
    if (bgTimerRef.current) clearTimeout(bgTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    
    setIsTransitioning(true);
    setExpandingId(cardId);
    setShrinkingId(null);
    setCurrentIndex(newIndex);
    
    bgTimerRef.current = setTimeout(() => {
      setBackgroundIndex(newIndex);
      setExpandingId(null);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 850);
  };

  const handleTransitionZoomIn = (newIndex: number) => {
    if (isTransitioning) return;
    
    if (bgTimerRef.current) clearTimeout(bgTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    
    // 获取当前第一张可见卡片的位置（在状态更新前）
    const firstCardIndex = (currentIndex + 1) % destinations.length;
    const firstCardId = destinations[firstCardIndex].id;
    const targetCard = cardRefs.current.get(firstCardId);
    
    if (!targetCard) {
      console.warn('Target card not found, falling back to zoom out');
      handleTransitionZoomOut(newIndex, destinations[newIndex].id);
      return;
    }
    
    const rect = targetCard.getBoundingClientRect();
    setTargetCardPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    });
    
    setIsTransitioning(true);
    setShrinkingId(backgroundDestination.id);
    setExpandingId(null);
    
    // 立即更新currentIndex和backgroundIndex
    setCurrentIndex(newIndex);
    setBackgroundIndex(newIndex); // 立即切换背景
    
    // 隐藏新的第一张预览卡片（点击后出现的第一张）
    const newFirstCardIndex = (newIndex + 1) % destinations.length;
    const newFirstCardId = destinations[newFirstCardIndex].id;
    setHiddenCardId(newFirstCardId);
    
    // zoom in 动画完成后清除动画层并显示卡片
    bgTimerRef.current = setTimeout(() => {
      setShrinkingId(null);
      setTargetCardPosition(null);
      setHiddenCardId(null); // 显示卡片
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 850);
  };

  const handleCardClick = (clickedIndex: number, cardId: number) => {
    handleTransitionZoomOut(clickedIndex, cardId);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % destinations.length;
    handleTransitionZoomOut(nextIndex, destinations[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + destinations.length) % destinations.length;
    handleTransitionZoomIn(prevIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <style jsx>{`
        .atlas-centered-container {
          position: relative;
          max-width: 1920px;
          margin: 0 auto;
          width: 100%;
          padding: 0 clamp(1rem, 5vw, 4rem);
        }

        .atlas-nav-btn {
          width: clamp(36px, 5vw, 48px);
          height: clamp(36px, 5vw, 48px);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        
        .atlas-nav-btn:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1);
        }
        
        .atlas-nav-btn:not(:disabled):active {
          transform: scale(0.95);
        }
        
        .atlas-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .atlas-title {
          font-size: clamp(1.75rem, 7vw, 5rem);
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .atlas-subtitle {
          font-size: clamp(0.7rem, 1.2vw, 0.875rem);
          letter-spacing: 0.1em;
        }

        .atlas-description {
          font-size: clamp(0.85rem, 1.5vw, 1.125rem);
          line-height: 1.6;
        }

        .atlas-button {
          padding: clamp(0.5rem, 1.2vw, 0.875rem) clamp(1rem, 2.5vw, 1.75rem);
          font-size: clamp(0.8rem, 1.3vw, 1rem);
        }

        .atlas-card {
          width: 192px !important;
          height: 256px !important;
          border-radius: 16px !important;
          background-color: #1a1a1a;
          flex-shrink: 0 !important;
        }
        
        @media (max-width: 768px) {
          .atlas-card {
            width: 140px !important;
            height: 190px !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .atlas-card {
            width: 160px !important;
            height: 220px !important;
          }
        }

        @media (max-width: 768px) {
          .atlas-centered-container {
            padding: 0;
            max-width: 100%;
          }

          .atlas-content-wrapper {
            flex-direction: column !important;
            height: 100%;
          }

          .atlas-left-content {
            position: relative !important;
            width: 100% !important;
            padding: 1.5rem 1.25rem !important;
            max-height: 50vh;
            overflow-y: auto;
            z-index: 20;
          }

          .atlas-right-cards {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            padding: 0.75rem !important;
            padding-bottom: 2rem !important;
            display: flex;
            justify-content: center;
            z-index: 20;
          }

          .atlas-title {
            font-size: clamp(1.5rem, 8vw, 2.5rem) !important;
          }

          .atlas-description {
            font-size: 0.9rem !important;
            margin-bottom: 1rem !important;
          }

          .atlas-nav-btn {
            width: 36px !important;
            height: 36px !important;
            z-index: 25;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .atlas-centered-container {
            padding: 0 2rem;
          }

          .atlas-left-content {
            position: absolute !important;
            left: 0;
            top: 0;
            bottom: 0;
            width: 45% !important;
            padding: 2rem 0 !important;
            display: flex;
            align-items: center;
            z-index: 20;
          }

          .atlas-right-cards {
            position: absolute !important;
            right: 0;
            top: 0;
            bottom: 0;
            width: 55% !important;
            padding: 1.5rem 0 !important;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 0 !important;
            z-index: 20;
          }
        }

        @media (min-width: 1025px) {
          .atlas-centered-container {
            padding: 0 clamp(2rem, 5vw, 4rem);
          }

          .atlas-left-content {
            position: absolute;
            left: 0;
            top: 20%;
            bottom: auto;
            width: 50%;
            display: flex;
            align-items: flex-start;
            padding: 0;
            z-index: 20;
          }

          .atlas-right-cards {
            position: absolute;
            right: 0;
            top: auto;
            bottom: 20%;
            width: 50%;
            min-width: 600px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 0;
            z-index: 20;
          }
        }

        .text-voryx-accent { color: #d4af37; }
        .bg-voryx-accent { background-color: #d4af37; }
        .hover\\:bg-voryx-accent:hover { background-color: #d4af37; }
        
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .atlas-left-content {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .atlas-left-content::-webkit-scrollbar {
          width: 4px;
        }

        .atlas-left-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .atlas-left-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
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

      {/* Zoom Out - Expanding card overlay */}
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
              layout: { type: "spring", stiffness: 320, damping: 60, mass: 1 },
              x: { type: "spring", stiffness: 320, damping: 60, mass: 1 },
              opacity: { duration: 0.3 }
            }}
            style={{
              inset: 0,
              x: '-20vw',
              boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7), 0 30px 50px -15px rgba(0, 0, 0, 0.6)'
            }}
          >
            <ImageContent destination={destinations.find(d => d.id === expandingId) ?? currentDestination} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom In - Shrinking background overlay */}
      <AnimatePresence mode="wait">
        {shrinkingId && targetCardPosition && (
          <motion.div
            key={`shrinking-${shrinkingId}`}
            initial={{ 
              position: 'absolute',
              inset: 0,
              zIndex: 50
            }}
            animate={{
              left: targetCardPosition.x,
              top: targetCardPosition.y,
              width: targetCardPosition.width,
              height: targetCardPosition.height,
              borderRadius: '16px'
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 280, 
              damping: 50, 
              mass: 1.2,
              opacity: { duration: 0.2, delay: 0.6 }
            }}
            style={{
              position: 'absolute',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            <ImageContent destination={destinations.find(d => d.id === shrinkingId) ?? backgroundDestination} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className="atlas-content-wrapper" 
        style={
          isMobile ? {
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
            paddingTop: '64px'
          } : {
            position: 'absolute',
            inset: 0,
            zIndex: 40
          }
        }
      >
        <div 
          className="atlas-centered-container"
          style={
            isMobile ? { 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            } : {
              position: 'absolute',
              inset: 0,
              maxWidth: '1920px',
              margin: '0 auto',
              width: '100%',
              padding: '0 clamp(1rem, 5vw, 4rem)'
            }
          }
        >
          <div className="w-full h-full relative" style={isMobile ? { height: 'auto', flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } : {}}>
            {/* Left Content */}
            <div 
              className="atlas-left-content"
              style={
                isMobile ? {
                  position: 'relative',
                  width: '100%',
                  padding: '1rem 0.5rem',
                  paddingBottom: '0.5rem',
                  zIndex: 40
                } : {
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  width: isTablet ? '45%' : '50%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '0',
                  zIndex: 40
                }
              }
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`content-${currentDestination.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl w-full"
                >
                  <div className="w-16 h-0.5 bg-white mb-3" />
                  <p className="atlas-subtitle text-white mb-3 tracking-wide uppercase">
                    {currentDestination.subtitle}
                  </p>
                  <h1 className="atlas-title text-white font-bold mb-4 tracking-tight text-shadow-lg">
                    {currentDestination.title}
                  </h1>
                  <p className="atlas-description text-white/90 mb-6 leading-relaxed">
                    {currentDestination.description}
                  </p>
                  <button className="atlas-button inline-flex items-center gap-2 rounded-lg bg-voryx-accent text-black font-bold hover:bg-white transition-all duration-300">
                    Learn More
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Cards with Navigation */}
            <div 
              className="atlas-right-cards"
              style={
                isMobile ? {
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  paddingBottom: '2rem',
                  zIndex: 40
                } : {
                  position: 'absolute',
                  right: 0,
                  bottom: '20%',
                  width: isTablet ? '55%' : '50%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  padding: '0',
                  zIndex: 40
                }
              }
            >
              <div 
                className="atlas-cards-container"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  position: 'relative',
                  zIndex: 40
                }}
              >
                {/* Left Navigation Button */}
                <button 
                  onClick={handlePrev}
                  disabled={isTransitioning}
                  className="atlas-nav-btn"
                  style={{ 
                    position: 'relative', 
                    zIndex: 45,
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                    opacity: isTransitioning ? 0.4 : 1
                  }}
                >
                  <ChevronLeft style={{ width: isMobile ? '16px' : '20px', height: isMobile ? '16px' : '20px' }} strokeWidth={2.5} />
                </button>

                {/* Cards Container */}
                <div 
                  style={{ 
                    display: 'flex',
                    gap: '1rem',
                    position: 'relative',
                    zIndex: 40
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {visibleCards.map((dest, idx) => {
                      const isExpanding = expandingId === dest.id;
                      const isHidden = hiddenCardId === dest.id;
                      
                      return (
                        <motion.div
                          key={dest.id}
                          layoutId={`shared-${dest.id}`}
                          ref={(el: HTMLDivElement | null) => {
                            if (el) {
                              cardRefs.current.set(dest.id, el);
                            } else {
                              cardRefs.current.delete(dest.id);
                            }
                          }}
                          initial={{ opacity: 0, scale: 0.8, x: 100 }}
                          animate={{ 
                            opacity: (isExpanding || isHidden) ? 0 : 1, 
                            scale: 1, 
                            x: 0 
                          }}
                          exit={{ opacity: 0, scale: 0.8, x: -50 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: idx * 0.1,
                            opacity: { duration: isHidden ? 0 : 0.2 }
                          }}
                          onClick={() => !isTransitioning && handleCardClick(dest.originalIndex, dest.id)}
                          style={{ 
                            position: 'relative',
                            width: isMobile ? '140px' : '192px',
                            height: isMobile ? '190px' : '256px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            cursor: isTransitioning ? 'not-allowed' : 'pointer',
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            flexShrink: 0,
                            zIndex: 40
                          }}
                          whileHover={!isExpanding && !isTransitioning ? { scale: 1.05, y: -10 } : {}}
                        >
                          <ImageContent destination={dest} isCard={true} />
                          <div 
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: '12px',
                              color: 'white',
                              zIndex: 45
                            }}
                          >
                            <p style={{ 
                              fontSize: '0.75rem',
                              marginBottom: '4px',
                              opacity: 0.8
                            }}>
                              {dest.subtitle}
                            </p>
                            <h3 style={{ 
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              lineHeight: 1.25
                            }}>
                              {dest.title}
                            </h3>
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
                  style={{ 
                    position: 'relative', 
                    zIndex: 45,
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                    opacity: isTransitioning ? 0.4 : 1
                  }}
                >
                  <ChevronRight style={{ width: isMobile ? '16px' : '20px', height: isMobile ? '16px' : '20px' }} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}