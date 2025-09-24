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

export default function Routes() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Current Expeditions
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-voryx-gray/30 border border-white/10 p-8 hover:border-voryx-accent/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl font-bold tracking-wide">{route.title}</h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded ${
                        route.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        route.status === 'Accepting Applications' ? 'bg-voryx-accent/20 text-voryx-accent' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{route.location}</span>
                    </div>
                    
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {route.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-voryx-accent">Expedition Highlights:</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {route.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-black/40 border border-white/10">
                        <Calendar className="w-6 h-6 text-voryx-accent mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Duration</div>
                        <div className="font-semibold">{route.duration}</div>
                      </div>
                      <div className="text-center p-4 bg-black/40 border border-white/10">
                        <Users className="w-6 h-6 text-voryx-accent mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Difficulty</div>
                        <div className="font-semibold">{route.difficulty}</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-black/40 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Thermometer className="w-4 h-4 text-voryx-accent mr-2" />
                        <span className="text-sm text-gray-400">Temperature Range</span>
                      </div>
                      <div className="font-semibold">{route.temperature}</div>
                    </div>
                    
                    <div className="p-4 bg-black/40 border border-white/10">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-voryx-accent mr-2" />
                        <span className="text-sm text-gray-400">Coordinates</span>
                      </div>
                      <div className="font-mono text-sm">{route.coordinates}</div>
                    </div>
                    
                    <button className="w-full bg-voryx-accent text-black font-bold py-3 hover:bg-white transition-colors duration-300">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
