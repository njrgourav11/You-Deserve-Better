'use client'

import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useState } from 'react'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/Toast'
import HeartLoader from '@/components/HeartLoader'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/about#mission' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '#' }
    ],
    services: [
      { name: 'Mental Health', href: '/blog?category=Mental Health' },
      { name: 'Women Empowerment', href: '/blog?category=Women Empowerment' },
      { name: 'Pharmaceutical Wellness', href: '/blog?category=Pharmaceutical Wellness' },
      { name: 'Consultation', href: '/contact' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Resources', href: '#' },
      { name: 'Support', href: '/contact' },
      { name: 'FAQ', href: '/contact#faq' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                You Deserve Better
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Empowering lives through mental health support, women empowerment, and holistic wellness solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 text-pink-500" />
                <span className="text-sm">hello@youdeservebetter.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 text-pink-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span className="text-sm">123 Wellness Street, Health City</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Stay updated:</span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  disabled={subscribing}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {subscribing ? (
                    <>
                      <HeartLoader size="sm" />
                      <span>...</span>
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {currentYear} You Deserve Better. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Made with <Heart className="h-4 w-4 text-pink-500 inline mx-1" /> for your wellness journey
            </p>
          </div>
        </div>
      </div>
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </footer>
  )

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast('error', 'Please enter a valid email address')
      return
    }

    setSubscribing(true)
    try {
      // Check if email already exists
      const q = query(collection(db, 'newsletter'), where('email', '==', email.toLowerCase()))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        showToast('error', 'This email is already subscribed')
        return
      }

      // Add to newsletter collection
      await addDoc(collection(db, 'newsletter'), {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active',
        source: 'footer'
      })

      setEmail('')
      showToast('success', 'Successfully subscribed!')
    } catch (error) {
      console.error('Error subscribing:', error)
      showToast('error', 'Failed to subscribe. Please try again.')
    } finally {
      setSubscribing(false)
    }
  }
}