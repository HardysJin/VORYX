'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowRight } from "lucide-react"

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

const ImageContent = ({ destination, isCard = false }) => (
  <div className="absolute inset-0">
    {/* 背景渐变 */}
    <div className={`absolute inset-0 bg-gradient-to-br ${destination.bgColor}`} />
    
    {/* 图片层 */}
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
          console.error('Image failed to load:', e.target.src);
          e.target.style.display = 'none';
        }}
      />
    </div>
    
    {/* 前景渐变覆盖层 */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />
  </div>
);

export default function Atlas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandingId, setExpandingId] = useState(null);

  const currentDestination = destinations[currentIndex];
  const visibleCards = destinations.slice(currentIndex + 1, currentIndex + 5);

  const handleTransition = (newIndex, cardId) => {
    if (expandingId) return;
    
    setExpandingId(cardId);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 700);
    
    setTimeout(() => {
      setExpandingId(null);
    }, 900);
  };

  const handleCardClick = (clickedIndex, cardId) => {
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

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={`bg-${currentDestination.id}`}
          initial={false}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <ImageContent destination={currentDestination} />
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
              layout: { duration: 0.85, ease: [0.43, 0.13, 0.23, 0.96] },
              x: { duration: 0.85, ease: [0.43, 0.13, 0.23, 0.96] },
              opacity: { duration: 0.2 }
            }}
            style={{
              inset: 0,
              x: '-20vw'
            }}
          >
            <ImageContent destination={destinations.find(d => d.id === expandingId)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full px-12 px-8 pt-8 mt-12">
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`content-${currentDestination.id}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                <div className="w-16 h-1 bg-white mb-4" />
                <p className="text-white text-sm mb-4 tracking-wide">{currentDestination.subtitle}</p>
                <h1 className="text-white text-7xl font-bold mb-6 leading-tight tracking-tight">
                  {currentDestination.title}
                </h1>
                <p className="text-white/80 text-base mb-8 max-w-md leading-relaxed">
                  {currentDestination.description}
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-black text-base mb-8 hover:bg-blue-700 transition">
                  Learn More
                  <ArrowRight size={18} />
                </button>

              </motion.div>
            </AnimatePresence>

            {/* Right Cards */}
            <div className="flex gap-6 pr-24">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((dest, idx) => {
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
                      onClick={() => handleCardClick(currentIndex + idx + 1, dest.id)}
                      className="relative w-64 h-80 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                      whileHover={!isExpanding ? { scale: 1.05, y: -10 } : {}}
                    >
                      <ImageContent destination={dest} isCard={true} />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                        <p className="text-xs mb-2 opacity-80">{dest.subtitle}</p>
                        <h3 className="text-xl font-bold leading-tight">{dest.title}</h3>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-6 z-20">
        <button 
          onClick={handlePrev}
          disabled={expandingId !== null}
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-black hover:bg-white/10 transition disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext}
          disabled={expandingId !== null}
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-black hover:bg-white/10 transition disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 right-12 z-20">
        <div className="text-white text-5xl font-bold">
          {String(currentIndex + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-white/20 rounded-full overflow-hidden z-20">
        <motion.div 
          className="h-full bg-orange-500"
          animate={{ width: `${((currentIndex + 1) / destinations.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}