'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Target, Users, Award, ArrowRight, Mail } from 'lucide-react'

const fadeUp = (reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
})

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

export default function About() {
  const prefersReducedMotion = useReducedMotion()

  const values = [
    { icon: Heart, title: 'Compassion', description: 'We approach every individual with empathy and understanding.' },
    { icon: Target, title: 'Excellence', description: 'We strive for the highest standards in everything we do.' },
    { icon: Users, title: 'Community', description: 'We believe in the power of connection and support.' },
    { icon: Award, title: 'Innovation', description: 'We continuously evolve to meet changing needs.' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-16 relative overflow-hidden">
      {/* Soft animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? {} : { x: [0, 25, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-16 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-pink-300/25 to-purple-300/25 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? {} : { x: [0, -20, 10, 0], y: [0, 12, -12, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-16 -right-16 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-purple-300/25 to-pink-300/25 blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" animate="show">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              About <span className="gradient-text">You Deserve Better</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We are dedicated to transforming lives through comprehensive mental health support, women empowerment initiatives, and
              innovative pharmaceutical wellness solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At You Deserve Better, we believe that everyone deserves access to quality mental health care, empowerment
                opportunities, and holistic wellness solutions. Our mission is to break down barriers and create a world where
                mental health is prioritized, women are empowered to reach their full potential, and pharmaceutical wellness is
                accessible to all.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We combine evidence-based practices with compassionate care to deliver personalized solutions that address the unique
                needs of each individual we serve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-400/30"
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                  <Mail className="h-5 w-5" />
                  Get In Touch
                </Link>
                <Link
                  href="/blog"
                  className="border-2 border-pink-500/70 text-pink-600 dark:text-pink-300 px-6 py-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 font-medium flex items-center gap-2 justify-center focus:outline-none focus:ring-4 focus:ring-pink-400/30"
                >
                  <ArrowRight className="h-5 w-5" />
                  Read Our Blog
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp(prefersReducedMotion ?? false)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40"
            >
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Lives Transformed</span>
                    <span className="text-2xl font-bold text-pink-500">10,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Women Empowered</span>
                    <span className="text-2xl font-bold text-pink-500">5,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Programs Delivered</span>
                    <span className="text-2xl font-bold text-pink-500">200+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These values guide everything we do and shape how we interact with our community.
            </p>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div key={value.title} variants={fadeUp(prefersReducedMotion ?? false)} className="group relative text-center rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30">
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg relative z-10">
                    <div className="w-16 h-16 bg-pink-100/70 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-md" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Meet the passionate individuals driving our mission forward.</p>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Sarah Williams', role: 'Chief Executive Officer', bio: 'Leading mental health advocate with 15+ years of experience in healthcare innovation.' },
              { name: 'Maria Rodriguez', role: 'Director of Women Empowerment', bio: 'Passionate about creating opportunities and breaking barriers for women worldwide.' },
              { name: 'Dr. James Chen', role: 'Head of Pharmaceutical Wellness', bio: 'Expert in integrative medicine with a focus on holistic pharmaceutical solutions.' },
            ].map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp(prefersReducedMotion ?? false)}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg text-center border border-pink-100/40 dark:border-slate-800/60"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{member.name.split(' ').map((n) => n[0]).join('')}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-pink-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}