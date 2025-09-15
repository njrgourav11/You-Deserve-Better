'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Brain, Users, Pill, ArrowRight, Star, CheckCircle, TrendingUp, Award, Clock } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCounter } from '@/hooks/useCounter'

function AnimatedStats() {
  const users = useCounter(15000, 2500)
  const stories = useCounter(2500, 2000)
  const satisfaction = useCounter(98, 1800)
  
  return (
    <>
      {/* Top left stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute -top-16 -left-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-pink-100 dark:border-pink-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute -top-16 -right-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-purple-100 dark:border-purple-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-16 -right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-pink-100 dark:border-pink-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
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
  const features = [
    {
      icon: Brain,
      title: 'Mental Health Focus',
      description: 'Comprehensive mental wellness programs designed to support your journey to better mental health.'
    },
    {
      icon: Users,
      title: 'Women Empowerment',
      description: 'Specialized programs and resources dedicated to empowering women in all aspects of life.'
    },
    {
      icon: Pill,
      title: 'Pharmaceutical Wellness',
      description: 'Evidence-based pharmaceutical solutions integrated with holistic wellness approaches.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Mental Health Advocate',
      content: 'This platform transformed my approach to mental wellness. The resources are incredible.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Entrepreneur',
      content: 'The women empowerment programs gave me the confidence to start my own business.',
      rating: 5
    },
    {
      name: 'Dr. Emily Chen',
      role: 'Healthcare Professional',
      content: 'The integration of pharmaceutical and holistic approaches is revolutionary.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-100/30 to-purple-100/30 dark:from-pink-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 dark:from-purple-900/5 dark:to-pink-900/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full text-sm font-medium text-pink-700 dark:text-pink-300"
                >
                  ✨ Transform Your Life Today
                </motion.div>
                <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  You Deserve{' '}
                  <span className="gradient-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Better</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  Empowering your journey to mental wellness, personal growth, and holistic health through innovative solutions and compassionate care.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 font-semibold hover:scale-105 text-lg backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center lg:justify-end relative"
            >
              {/* Professional video frame */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative group"
              >
                {/* Outer glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-pink-200/20 via-white/40 to-purple-200/20 dark:from-pink-800/20 dark:via-slate-700/40 dark:to-purple-800/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                
                {/* Main frame */}
                <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-6 rounded-[2.5rem] shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  {/* Inner border */}
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 p-4 rounded-[2rem] shadow-inner">
                    {/* Video container */}
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-slate-800">
                      <video
                        className="w-80 h-80 object-cover transition-all duration-500 group-hover:scale-105"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src="/Logo_Animation_You_Deserve_Better.mp4" type="video/mp4" />
                      </video>
                      
                      {/* Subtle overlay for white video */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/10 via-transparent to-purple-50/10 dark:from-pink-900/5 dark:to-purple-900/5 pointer-events-none"></div>
                    </div>
                    
                    {/* Professional corner accents */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-3 border-t-3 border-pink-300 dark:border-pink-600 rounded-tl-xl opacity-60"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-r-3 border-t-3 border-purple-300 dark:border-purple-600 rounded-tr-xl opacity-60"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-l-3 border-b-3 border-purple-300 dark:border-purple-600 rounded-bl-xl opacity-60"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-3 border-b-3 border-pink-300 dark:border-pink-600 rounded-br-xl opacity-60"></div>
                  </div>
                  
                  {/* Elegant floating elements */}
                  <motion.div
                    animate={{ y: [-3, 3, -3], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-pink-300 to-pink-400 dark:from-pink-500 dark:to-pink-600 rounded-full shadow-lg opacity-80"
                  ></motion.div>
                  
                  <motion.div
                    animate={{ y: [3, -3, 3], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-br from-purple-300 to-purple-400 dark:from-purple-500 dark:to-purple-600 rounded-full shadow-lg opacity-70"
                  ></motion.div>
                </div>
                
                {/* Animated Stats */}
                <AnimatedStats />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal" ref={useScrollReveal()}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Focus Areas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We specialize in three key areas to provide comprehensive support for your wellness journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal" ref={useScrollReveal()}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Community Says
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real stories from people who have transformed their lives with our support.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Join thousands of others who have chosen to prioritize their mental health and personal growth.
            </p>
            <Link
              href="/login"
              className="bg-white text-pink-500 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-2 font-bold shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Get Started Today
              <CheckCircle className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
