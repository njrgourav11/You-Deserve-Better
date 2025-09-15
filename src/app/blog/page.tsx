'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Search, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, doc, updateDoc, arrayUnion, arrayRemove, addDoc, serverTimestamp, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/useToast'
import HeartLoader from '@/components/HeartLoader'
import EmptyState from '@/components/EmptyState'
import Toast from '@/components/Toast'

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const { user } = useAuth()
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }))
      setBlogPosts(posts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: string, currentLikes: number, likedBy: string[] = []) => {
    if (!user) return
    
    const postRef = doc(db, 'blogs', postId)
    const isLiked = likedBy.includes(user.uid)
    
    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: currentLikes - 1,
          likedBy: arrayRemove(user.uid)
        })
      } else {
        await updateDoc(postRef, {
          likes: currentLikes + 1,
          likedBy: arrayUnion(user.uid)
        })
      }
      fetchBlogPosts()
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  const categories = ['All', 'Mental Health', 'Women Empowerment', 'Pharmaceutical Wellness']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Insights, tips, and stories to support your journey toward better mental health, 
              personal empowerment, and holistic wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <HeartLoader size="lg" text="Loading amazing blog posts..." />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => {
                console.log('Post image URL:', post.imageUrl ? post.imageUrl.substring(0, 50) + '...' : 'No image')
                return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* Always show gradient background first */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-sm opacity-80">{post.category}</p>
                      </div>
                    </div>
                    
                    {/* Show image on top if available */}
                    {post.imageUrl && post.imageUrl.trim() && post.imageUrl.startsWith('data:') && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onLoad={(e) => console.log('Image loaded successfully')}
                        onError={(e) => {
                          console.log('Image failed to load, showing fallback')
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 z-20"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {Math.ceil(post.content?.length / 1000) || 5} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {post.authorName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium">{post.authorName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.createdAt?.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLike(post.id, post.likes || 0, post.likedBy || [])}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          user && post.likedBy?.includes(user.uid)
                            ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20'
                            : 'text-gray-500 dark:text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                        }`}
                        disabled={!user}
                      >
                        <Heart className={`h-4 w-4 ${user && post.likedBy?.includes(user.uid) ? 'fill-current' : ''}`} />
                        <span>{post.likes || 0}</span>
                      </button>
                      <Link
                        href={`/blog/${post.id}`}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 font-medium flex items-center gap-2 text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )})}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            blogPosts.length === 0 ? (
              <EmptyState
                type="no-blogs"
                title="No Blog Posts Yet"
                description="Be the first to share your thoughts and experiences with our community. Your story could inspire and help others on their wellness journey."
                actionText={user ? "Write First Post" : "Sign In to Write"}
                actionHref={user ? "/blog/create" : "/login"}
              />
            ) : (
              <EmptyState
                type="no-search-results"
                title="No Results Found"
                description={`We couldn't find any articles matching "${searchTerm}" in the ${selectedCategory} category. Try adjusting your search terms or browse all categories.`}
                actionText="Clear Filters"
                onAction={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
              />
            )
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter for the latest insights on mental health, empowerment, and wellness.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={subscribing}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {subscribing ? (
                  <>
                    <HeartLoader size="sm" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
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
        showToast('error', 'This email is already subscribed to our newsletter')
        return
      }

      // Add to newsletter collection
      await addDoc(collection(db, 'newsletter'), {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active'
      })

      setEmail('')
      showToast('success', 'Successfully subscribed to our newsletter!')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      showToast('error', 'Failed to subscribe. Please try again.')
    } finally {
      setSubscribing(false)
    }
  }
}