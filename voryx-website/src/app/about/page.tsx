'use client'

import { motion, easeOut } from 'framer-motion'

// 优化的动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut }
}

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easeOut }
}

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: easeOut }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function About() {
  return (
    <div className="page-content min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-8 pb-20">
        <div className="container text-center py-6">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide text-white">
              Who We Are
            </h1>
            <p className="text-xl md:text-2xl text-voryx-accent mb-8 font-light tracking-wide">
              EXPLORERS • SCIENTISTS • STORYTELLERS
            </p>
            <div className="h-1 w-24 bg-voryx-accent mx-auto mb-8"></div>
            <p className="text-lg text-white text-opacity-80 leading-relaxed max-w-3xl mx-auto">
              VORYX exists at the intersection of exploration and understanding. We believe that 
              the most remote corners of our planet hold not just adventure, but answers to questions 
              about our world, our climate, and ourselves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - 关键优化区域 */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div {...slideInLeft}>
              <h2 className="text-4xl font-bold mb-8 tracking-wide text-white">Our Philosophy</h2>
              <p className="text-lg text-white text-opacity-80 leading-relaxed mb-6">
                True exploration goes beyond reaching a destination. It&apos;s about understanding 
                the delicate ecosystems, ancient cultures, and extreme conditions that shape 
                these remote landscapes.
              </p>
              <p className="text-lg text-white text-opacity-80 leading-relaxed mb-6">
                Every VORYX expedition is designed as a collaborative effort between adventurers, 
                scientists, and local communities. We don&apos;t just visit these places—we contribute 
                to their understanding and preservation.
              </p>
              <p className="text-lg text-white text-opacity-80 leading-relaxed">
                This is exploration with purpose. This is travel that transforms not just 
                the traveler, but our collective understanding of the world.
              </p>
            </motion.div>
            <motion.div {...slideInRight}>
              <div className="">
                <img 
                  src="/images/video-poster.jpg" 
                  alt="Video Poster" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-wide text-white">Core Values</h2>
            <p className="text-xl text-white text-opacity-80 max-w-3xl mx-auto">
              The principles that guide every expedition, every decision, every relationship we build.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: "Purpose-Driven",
                description: "Every journey contributes to scientific understanding and cultural preservation."
              },
              {
                title: "Collaborative",
                description: "Working with local communities, scientists, and fellow explorers as partners."
              },
              {
                title: "Sustainable",
                description: "Minimizing impact while maximizing positive contribution to destinations."
              },
              {
                title: "Excellence",
                description: "Uncompromising standards in safety, preparation, and experience quality."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                style={{ willChange: "opacity, transform" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 border border-white border-opacity-10"
              >
                <div className="text-4xl text-voryx-accent mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-4 tracking-wide text-white">
                  {value.title}
                </h3>
                <p className="text-white text-opacity-80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-wide text-white">The VORYX Team</h2>
            <p className="text-xl text-white text-opacity-80 max-w-3xl mx-auto mb-12">
              Expedition leaders, scientists, logistics experts, and cultural liaisons 
              who make impossible journeys possible.
            </p>
            <div className="bg-voryx-accent bg-opacity-20 border border-white border-opacity-10 p-12 max-w-4xl mx-auto">
              <p className="text-2xl font-light text-center italic text-white">
                &quot;We are not tourists. We are temporary residents of the world&apos;s most extraordinary places, 
                here to learn, document, and contribute to humanity&apos;s understanding of our planet.&quot;
              </p>
              <p className="text-voryx-accent mt-6 tracking-wide">— VORYX EXPEDITION CHARTER</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}