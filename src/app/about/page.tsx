'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Target, Users, Award, ArrowRight, Mail, Phone } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every individual with empathy and understanding.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of connection and support.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We continuously evolve to meet changing needs.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="gradient-text">You Deserve Better</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We are dedicated to transforming lives through comprehensive mental health support, 
              women empowerment initiatives, and innovative pharmaceutical wellness solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At You Deserve Better, we believe that everyone deserves access to quality mental health care, 
                empowerment opportunities, and holistic wellness solutions. Our mission is to break down barriers 
                and create a world where mental health is prioritized, women are empowered to reach their full 
                potential, and pharmaceutical wellness is accessible to all.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We combine evidence-based practices with compassionate care to deliver personalized solutions 
                that address the unique needs of each individual we serve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
                >
                  <Mail className="h-5 w-5" />
                  Get In Touch
                </Link>
                <Link
                  href="/blog"
                  className="border-2 border-pink-500 text-pink-500 px-6 py-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
                >
                  <ArrowRight className="h-5 w-5" />
                  Read Our Blog
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Impact
              </h3>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These values guide everything we do and shape how we interact with our community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Leadership Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the passionate individuals driving our mission forward.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Williams',
                role: 'Chief Executive Officer',
                bio: 'Leading mental health advocate with 15+ years of experience in healthcare innovation.'
              },
              {
                name: 'Maria Rodriguez',
                role: 'Director of Women Empowerment',
                bio: 'Passionate about creating opportunities and breaking barriers for women worldwide.'
              },
              {
                name: 'Dr. James Chen',
                role: 'Head of Pharmaceutical Wellness',
                bio: 'Expert in integrative medicine with a focus on holistic pharmaceutical solutions.'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-pink-500 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}