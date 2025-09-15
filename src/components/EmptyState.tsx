'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, Search, FileText, Users } from 'lucide-react'

interface EmptyStateProps {
  type: 'no-blogs' | 'no-search-results' | 'no-comments'
  title: string
  description: string
  actionText?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({ 
  type, 
  title, 
  description, 
  actionText, 
  actionHref, 
  onAction 
}: EmptyStateProps) {
  const getSVG = () => {
    switch (type) {
      case 'no-blogs':
        return (
          <svg className="w-32 h-32 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        )
      case 'no-search-results':
        return (
          <svg className="w-32 h-32 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <path d="M16 8a8 8 0 0 0-8 8"/>
          </svg>
        )
      case 'no-comments':
        return (
          <svg className="w-32 h-32 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <path d="M8 9h8"/>
            <path d="M8 13h6"/>
          </svg>
        )
      default:
        return (
          <svg className="w-32 h-32 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        {getSVG()}
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 dark:text-gray-300 mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>
      
      {(actionText && (actionHref || onAction)) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {actionHref ? (
            <Link
              href={actionHref}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              {actionText}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              {actionText}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}