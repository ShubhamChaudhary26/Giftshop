// components/CandleCareGuide.jsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Flame, Scissors, Clock, ThermometerSun, Shield, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"
import { integralCF } from "@/styles/fonts"

const tips = [
  {
    icon: Flame,
    title: 'First Burn',
    description: 'Burn for 2-3 hours to create an even wax pool',
    detail: 'This prevents tunneling and ensures maximum scent throw',
  },
  {
    icon: Scissors,
    title: 'Trim the Wick',
    description: 'Trim to ¼ inch before each lighting',
    detail: 'Keeps the flame controlled and prevents soot',
  },
  {
    icon: Clock,
    title: 'Burn Time',
    description: 'Never burn for more than 4 hours',
    detail: 'Allow candle to cool for 2 hours before relighting',
  },
  {
    icon: ThermometerSun,
    title: 'Cool Place',
    description: 'Store in a cool, dry location',
    detail: 'Away from direct sunlight to preserve scent',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Never leave burning candles unattended',
    detail: 'Keep away from drafts, pets, and children',
  },
  {
    icon: Sparkles,
    title: 'Clean Burning',
    description: 'Keep wax pool free of debris',
    detail: 'Remove any wick trimmings or matches',
  }
]

export default function CandleCareGuide() {
  // ✅ TypeScript Error Fix
  const [activeTip, setActiveTip] = useState<number | null>(null)

  return (
    <section className="py-1  bg-white">
      
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={cn([
            integralCF.className,
            "text-[32px] md:text-5xl mb-4 capitalize font-bold"
          ])}>
            Candle Care Guide
          </h2>
          <p className="text-black/60 text-sm md:text-lg">Make your candles last longer with proper care</p>
        </motion.div>

        {/* Grid - Fixed Height Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            const isActive = activeTip === index
            
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveTip(index)}
                onMouseLeave={() => setActiveTip(null)}
                className={cn([
                  "relative bg-white rounded-2xl p-6 md:p-8 border cursor-pointer transition-all duration-300 h-full overflow-hidden group",
                  isActive 
                    ? "border-black/30 shadow-xl bg-gray-50" 
                    : "border-black/10 hover:border-black/20"
                ])}
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={isActive ? { x: '200%' } : { x: '-100%' }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut'
                  }}
                />

                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 "
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />

                <div className="relative z-10">
                  {/* Icon - Black & White */}
                  <div className="relative mb-4 md:mb-5 w-fit">
                    <motion.div
                      className={cn([
                        "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center relative transition-all duration-300",
                        isActive ? "bg-black" : "bg-gray-100"
                      ])}
                      animate={isActive ? { 
                        rotate: [0, -5, 5, 0],
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={cn([
                        "w-6 h-6 md:w-7 md:h-7 transition-colors duration-300",
                        isActive ? "text-white" : "text-black"
                      ])} />
                      
                      {/* Glow ring on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-black/20 blur-lg -z-10"
                        animate={{
                          opacity: isActive ? 0.5 : 0,
                          scale: isActive ? 1.4 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Title with underline */}
                  <div className="mb-2 md:mb-3 relative">
                    <h3 className={cn([
                      integralCF.className,
                      "text-lg md:text-xl font-bold transition-colors duration-300",
                      isActive ? "text-black" : "text-gray-900"
                    ])}>
                      {tip.title}
                    </h3>
                    
                    {/* Animated underline */}
                    <motion.div
                      className="h-0.5 mt-1.5"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Description */}
                  <motion.p 
                    className={cn([
                      "text-sm md:text-base leading-relaxed mb-3 transition-colors duration-300",
                      isActive ? "text-black/70" : "text-black/60"
                    ])}
                  >
                    {tip.description}
                  </motion.p>

                  {/* Expandable Detail */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 12 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="p-3 md:p-4 rounded-lg bg-white border border-black/10"
                      initial={{ y: -10 }}
                      animate={{ y: isActive ? 0 : -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs md:text-sm text-black/60 leading-relaxed">
                        💡 {tip.detail}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Hover indicator with arrow animation */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : 1,
                      height: isActive ? 0 : 'auto',
                      marginTop: isActive ? 0 : 12
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs md:text-sm text-black/40 font-medium flex items-center gap-1">
                      Hover to learn more 
                      <motion.span 
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        →
                      </motion.span>
                    </p>
                  </motion.div>
                </div>

                {/* Corner indicator dots */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {[0, 1, 2].map((dotIndex) => (
                    <motion.div
                      key={dotIndex}
                      className="w-1 h-1 rounded-full bg-black/30"
                      animate={{
                        scale: isActive ? [1, 1.5, 1] : 1,
                        opacity: isActive ? [0.3, 0.8, 0.3] : 0.3
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dotIndex * 0.15
                      }}
                    />
                  ))}
                </div>

                {/* Bottom corner accent */}
                <motion.div
                  className="absolute bottom-4 left-4 w-8 h-0.5 "
                  animate={{
                    scaleX: isActive ? 1.5 : 1,
                    opacity: isActive ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>

      

      </div>
    </section>
  )
}