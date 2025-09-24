'use client'

import { motion } from 'framer-motion'
import { Target, Users, Globe, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Who We Are
            </h1>
            <p className="text-xl md:text-2xl text-voryx-accent mb-8 font-light tracking-wide">
              EXPLORERS • SCIENTISTS • STORYTELLERS
            </p>
            <div className="h-1 w-24 bg-voryx-accent mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              VORYX exists at the intersection of exploration and understanding. We believe that 
              the most remote corners of our planet hold not just adventure, but answers to questions 
              about our world, our climate, and ourselves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-voryx-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 tracking-wide">Our Philosophy</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                True exploration goes beyond reaching a destination. It's about understanding 
                the delicate ecosystems, ancient cultures, and extreme conditions that shape 
                these remote landscapes.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Every VORYX expedition is designed as a collaborative effort between adventurers, 
                scientists, and local communities. We don't just visit these places—we contribute 
                to their understanding and preservation.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This is exploration with purpose. This is travel that transforms not just 
                the traveler, but our collective understanding of the world.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-voryx-accent/20 to-transparent border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-voryx-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold tracking-wide">Beyond Reach</h3>
                  <p className="text-gray-400 mt-2">Our guiding principle</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-wide">Core Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide every expedition, every decision, every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Purpose-Driven",
                description: "Every journey contributes to scientific understanding and cultural preservation."
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Collaborative",
                description: "Working with local communities, scientists, and fellow explorers as partners."
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Sustainable",
                description: "Minimizing impact while maximizing positive contribution to destinations."
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Excellence",
                description: "Uncompromising standards in safety, preparation, and experience quality."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 border border-white/10 hover:border-voryx-accent/30 transition-all duration-300"
              >
                <div className="text-voryx-accent mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-wide">The VORYX Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Expedition leaders, scientists, logistics experts, and cultural liaisons 
              who make impossible journeys possible.
            </p>
            <div className="bg-gradient-to-r from-voryx-accent/20 to-transparent border border-white/10 p-12">
              <p className="text-2xl font-light text-center italic">
                "We are not tourists. We are temporary residents of the world's most extraordinary places, 
                here to learn, document, and contribute to humanity's understanding of our planet."
              </p>
              <p className="text-voryx-accent mt-6 tracking-wide">— VORYX EXPEDITION CHARTER</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
