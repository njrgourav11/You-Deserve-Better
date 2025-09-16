"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Brain, Users, Pill, ArrowRight, Star, CheckCircle, TrendingUp, Award } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { useCounter } from "@/hooks/useCounter"

// Motion variants for cleaner, consistent animations
const fadeUp = (reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
})

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

function AnimatedStats() {
  const users = useCounter(15000, 2500)
  const stories = useCounter(2500, 2000)
  const satisfaction = useCounter(98, 1800)
  
  return (
    <>
      {/* Top left stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileHover={{ scale: 1.03 }}
        className="absolute -top-16 -left-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-pink-100/80 dark:border-pink-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{users.toLocaleString()}+</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Happy Users</div>
          </div>
        </div>
      </motion.div>
      
      {/* Top right stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        whileHover={{ scale: 1.03 }}
        className="absolute -top-16 -right-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-purple-100/80 dark:border-purple-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stories.toLocaleString()}+</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Success Stories</div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        whileHover={{ scale: 1.03 }}
        className="absolute -bottom-16 -right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-pink-100/80 dark:border-pink-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{satisfaction}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  // Parallax for the media frame
  const frameY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -60])

  const features = [
    {
      icon: Brain,
      title: "Mental Health Focus",
      description: "Comprehensive mental wellness programs designed to support your journey to better mental health.",
    },
    { icon: Users, title: "Women Empowerment", description: "Specialized programs and resources dedicated to empowering women in all aspects of life." },
    { icon: Pill, title: "Pharmaceutical Wellness", description: "Evidence-based pharmaceutical solutions integrated with holistic wellness approaches." },
  ]

  const testimonials = [
    { name: "Sarah Johnson", role: "Mental Health Advocate", content: "This platform transformed my approach to mental wellness. The resources are incredible.", rating: 5 },
    { name: "Maria Rodriguez", role: "Entrepreneur", content: "The women empowerment programs gave me the confidence to start my own business.", rating: 5 },
    { name: "Dr. Emily Chen", role: "Healthcare Professional", content: "The integration of pharmaceutical and holistic approaches is revolutionary.", rating: 5 },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/60 via-white to-purple-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900" />

          {/* Animated soft blobs */}
          <motion.div
            aria-hidden
            animate={prefersReducedMotion ? {} : { x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={prefersReducedMotion ? {} : { x: [0, -15, 10, 0], y: [0, 12, -12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-16 -left-10 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-purple-300/25 to-pink-300/25 blur-3xl"
          />

          {/* Subtle radial highlight */}
          <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.35),transparent_55%)] dark:[background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8">
              <div className="space-y-6">
                <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" animate="show" transition={{ delay: 0.15 }} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full text-sm font-medium text-pink-700 dark:text-pink-300 shadow-sm">
                  ✨ Transform Your Life Today
                </motion.div>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                  You Deserve{" "}
                  <span className="gradient-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Better</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  Empowering your journey to mental wellness, personal growth, and holistic health through innovative solutions and compassionate care.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.03] text-lg focus:outline-none focus:ring-4 focus:ring-pink-400/40">
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="relative border-2 border-pink-500/70 text-pink-600 dark:text-pink-300 px-8 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 font-semibold hover:scale-[1.02] text-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-pink-400/30">
                  Learn More
                </Link>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} className="flex justify-center lg:justify-end relative">
              {/* Professional video frame */}
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative group" style={{ y: frameY }}>
                {/* Outer glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-pink-200/30 via-white/30 to-purple-200/30 dark:from-pink-800/20 dark:via-slate-700/40 dark:to-purple-800/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
                
                {/* Main frame */}
                <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-6 rounded-[2.5rem] shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  {/* Inner border */}
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 p-4 rounded-[2rem] shadow-inner">
                    {/* Video container */}
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-slate-800">
                      <video className="w-80 h-80 object-cover transition-all duration-500 group-hover:scale-105" autoPlay loop muted playsInline>
                        <source src="/Logo_Animation_You_Deserve_Better.mp4" type="video/mp4" />
                      </video>
                      
                      {/* Subtle overlay for white video */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/10 via-transparent to-purple-50/10 dark:from-pink-900/5 dark:to-purple-900/5 pointer-events-none" />
                    </div>
                    
                    {/* Professional corner accents (fixed Tailwind widths) */}
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-tl-xl opacity-60 border-l-[3px] border-t-[3px] border-pink-300 dark:border-pink-600" />
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-tr-xl opacity-60 border-r-[3px] border-t-[3px] border-purple-300 dark:border-purple-600" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 rounded-bl-xl opacity-60 border-l-[3px] border-b-[3px] border-purple-300 dark:border-purple-600" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-br-xl opacity-60 border-r-[3px] border-b-[3px] border-pink-300 dark:border-pink-600" />
                  </div>
                  
                  {/* Elegant floating elements */}
                  <motion.div animate={prefersReducedMotion ? {} : { y: [-3, 3, -3], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-pink-300 to-pink-400 dark:from-pink-500 dark:to-pink-600 rounded-full shadow-lg opacity-80" />
                  
                  <motion.div animate={prefersReducedMotion ? {} : { y: [3, -3, 3], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-br from-purple-300 to-purple-400 dark:from-purple-500 dark:to-purple-600 rounded-full shadow-lg opacity-70" />
                </div>
                
                {/* Animated Stats */}
                <AnimatedStats />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal" ref={useScrollReveal()}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Focus Areas</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">We specialize in three key areas to provide comprehensive support for your wellness journey.</p>
          </div>
          
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.title} variants={fadeUp(prefersReducedMotion ?? false)} className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 hover:from-pink-500/50 hover:via-purple-500/50 hover:to-pink-500/50 transition-colors">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg relative z-10">
                    <div className="w-12 h-12 bg-pink-100/70 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-md" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal" ref={useScrollReveal()}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Real stories from people who have transformed their lives with our support.</p>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.name} variants={fadeUp(prefersReducedMotion ?? false)} whileHover={prefersReducedMotion ? {} : { y: -4 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-pink-100/40 dark:border-slate-800/60">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 to-purple-600" />
        <div className="absolute inset-0 -z-10 opacity-30 [background:radial-gradient(ellipse_at_center,white,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">Join thousands of others who have chosen to prioritize their mental health and personal growth.</p>
            <Link href="/login" className="relative inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-white/40">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/0 via-white/30 to-purple-500/0 opacity-0 hover:opacity-100 transition-opacity" />
              Get Started Today
              <CheckCircle className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}