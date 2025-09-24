'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Thermometer } from 'lucide-react'

const routes = [
  {
    id: 1,
    title: "Antarctic Convergence",
    location: "Drake Passage, Antarctica",
    duration: "14 Days",
    difficulty: "Extreme",
    temperature: "-25°C to -5°C",
    coordinates: "60°S, 65°W",
    status: "Accepting Applications",
    description: "Navigate the world's most treacherous waters to reach the convergence zone where Antarctic waters meet the Southern Ocean.",
    highlights: ["Iceberg Navigation", "Marine Biology Research", "Weather Station Data Collection"]
  },
  {
    id: 2,
    title: "Sahara Deep Field",
    location: "Tanezrouft Basin, Algeria",
    duration: "10 Days",
    difficulty: "High",
    temperature: "15°C to 50°C",
    coordinates: "23°N, 5°E",
    status: "Planning Phase",
    description: "Cross the most isolated section of the Sahara Desert, conducting geological surveys and traditional navigation training.",
    highlights: ["Celestial Navigation", "Geological Sampling", "Survival Training"]
  },
  {
    id: 3,
    title: "Kamchatka Wilderness",
    location: "Valley of Geysers, Russia",
    duration: "12 Days",
    difficulty: "High",
    temperature: "-10°C to 20°C",
    coordinates: "54°N, 160°E",
    status: "Active",
    description: "Explore one of the world's largest geyser fields while documenting volcanic activity and wildlife patterns.",
    highlights: ["Geothermal Research", "Wildlife Photography", "Volcanic Monitoring"]
  }
]

// 统一的动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const routeCardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 }, // 降低触发阈值
  transition: { duration: 0.6, ease: "easeOut" }
}

export default function Routes() {
  return (
    <div className="page-content min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-8 pb-20">
        <div className="container">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide text-white">
              Current Expeditions
            </h1>
            <p className="text-xl text-white text-opacity-80 max-w-3xl mx-auto">
              Active and upcoming VORYX expeditions to the world's most remote and 
              challenging environments. Each route is meticulously planned with 
              scientific objectives and cultural immersion.
            </p>
          </motion.div>

          {/* Routes Grid */}
          <div className="space-y-8">
            {routes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} // 进一步降低阈值
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15, // 减少延迟
                  ease: "easeOut" 
                }}
                className="bg-voryx-gray bg-opacity-30 border border-white border-opacity-10 p-8 hover:border-voryx-accent hover:border-opacity-30 transition-all duration-300"
                style={{ willChange: 'transform, opacity' }} // 性能优化
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl font-bold tracking-wide text-white">{route.title}</h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded ${
                        route.status === 'Active' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                        route.status === 'Accepting Applications' ? 'bg-voryx-accent bg-opacity-20 text-voryx-accent' :
                        'bg-orange-500 bg-opacity-20 text-orange-400'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-white text-opacity-80 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{route.location}</span>
                    </div>
                    
                    <p className="text-lg text-white text-opacity-90 mb-6 leading-relaxed">
                      {route.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-voryx-accent">Expedition Highlights:</h4>
                      <ul className="list-disc list-inside text-white text-opacity-80 space-y-1">
                        {route.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats */}
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-black bg-opacity-40 border border-white border-opacity-10">
                        <Calendar className="w-6 h-6 text-voryx-accent mx-auto mb-2" />
                        <div className="text-sm text-white text-opacity-80">Duration</div>
                        <div className="font-semibold text-white">{route.duration}</div>
                      </div>
                      <div className="text-center p-4 bg-black bg-opacity-40 border border-white border-opacity-10">
                        <Users className="w-6 h-6 text-voryx-accent mx-auto mb-2" />
                        <div className="text-sm text-white text-opacity-80">Difficulty</div>
                        <div className="font-semibold text-white">{route.difficulty}</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-black bg-opacity-40 border border-white border-opacity-10">
                      <div className="flex items-center mb-2">
                        <Thermometer className="w-4 h-4 text-voryx-accent mr-2" />
                        <span className="text-sm text-white text-opacity-80">Temperature Range</span>
                      </div>
                      <div className="font-semibold text-white">{route.temperature}</div>
                    </div>
                    
                    <div className="p-4 bg-black bg-opacity-40 border border-white border-opacity-10">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-voryx-accent mr-2" />
                        <span className="text-sm text-white text-opacity-80">Coordinates</span>
                      </div>
                      <div className="font-mono text-sm text-white">{route.coordinates}</div>
                    </div>
                    
                    <button className="w-full bg-voryx-accent text-black font-bold py-3 hover:bg-white transition-colors duration-300">
                      LEARN MORE
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}