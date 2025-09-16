'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react'

const fadeUp = (reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
})

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    { icon: Mail, title: 'Email Us', details: 'hello@youdeservebetter.com', description: 'Send us an email anytime' },
    { icon: Phone, title: 'Call Us', details: '+1 (555) 123-4567', description: 'Mon-Fri from 8am to 5pm' },
    { icon: MapPin, title: 'Visit Us', details: '123 Wellness Street, Health City, HC 12345', description: 'Come say hello at our office' },
  ]

  const faqs = [
    { question: 'How can I get started with your services?', answer: 'You can begin by creating an account and scheduling a consultation with one of our specialists. We offer personalized assessments to determine the best approach for your needs.' },
    { question: 'Do you accept insurance?', answer: 'We work with most major insurance providers. Please contact us with your insurance information, and we can verify your coverage and benefits.' },
    { question: 'What makes your approach different?', answer: 'We combine evidence-based mental health practices with empowerment programs and holistic pharmaceutical wellness to provide comprehensive, personalized care.' },
    { question: 'How long does it typically take to see results?', answer: 'Results vary by individual and program type. Many clients report positive changes within the first few weeks, with more significant improvements over 3-6 months of consistent engagement.' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-16 relative overflow-hidden">
      {/* Animated subtle background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? {} : { x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -right-16 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-pink-300/25 to-purple-300/25 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? {} : { x: [0, -15, 10, 0], y: [0, 12, -12, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-16 -left-16 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-purple-300/25 to-pink-300/25 blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" animate="show">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We're here to support you on your wellness journey. Reach out to us with any questions, concerns, or to learn more about our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <motion.div key={info.title} variants={fadeUp(prefersReducedMotion ?? false)} whileHover={prefersReducedMotion ? {} : { y: -4 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg text-center border border-pink-100/40 dark:border-slate-800/60">
                  <div className="w-16 h-16 bg-pink-100/70 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                  <p className="text-pink-500 font-medium mb-2">{info.details}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{info.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    <span className="absolute inset-0 bg-white/20 translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700" />
                    Send Message
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-pink-100/40 dark:border-slate-800/60">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-pink-500" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Office Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between"><span>Monday - Friday</span><span>8:00 AM - 5:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>9:00 AM - 2:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-pink-100/40 dark:border-slate-800/60">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-pink-500" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Response Time</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our main number.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300">Find answers to common questions about our services and approach.</p>
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeUp(prefersReducedMotion ?? false)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-pink-100/40 dark:border-slate-800/60">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}