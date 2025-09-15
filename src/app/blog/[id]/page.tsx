'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle, Send } from 'lucide-react'
import { useState, useEffect, use } from 'react'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/Toast'
import HeartLoader from '@/components/HeartLoader'
import EmptyState from '@/components/EmptyState'

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const { user } = useAuth()
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    fetchPost()
  }, [resolvedParams.id])

  const fetchPost = async () => {
    try {
      const docRef = doc(db, 'blogs', resolvedParams.id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setPost({
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate()
        })
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!user || !post) return
    
    const postRef = doc(db, 'blogs', post.id)
    const isLiked = post.likedBy?.includes(user.uid)
    
    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: (post.likes || 0) - 1,
          likedBy: arrayRemove(user.uid)
        })
      } else {
        await updateDoc(postRef, {
          likes: (post.likes || 0) + 1,
          likedBy: arrayUnion(user.uid)
        })
      }
      fetchPost()
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !post || !comment.trim()) return

    setSubmittingComment(true)
    try {
      const postRef = doc(db, 'blogs', post.id)
      await updateDoc(postRef, {
        comments: arrayUnion({
          id: Date.now().toString(),
          text: comment,
          authorName: user.email?.split('@')[0] || 'Anonymous',
          authorId: user.uid,
          createdAt: new Date()
        })
      })
      setComment('')
      fetchPost()
      showToast('success', 'Comment added successfully!')
    } catch (error) {
      console.error('Error adding comment:', error)
      showToast('error', 'Failed to add comment. Please try again.')
    } finally {
      setSubmittingComment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 flex items-center justify-center">
        <HeartLoader size="lg" text="Loading blog post..." />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-pink-500 hover:text-pink-600">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const relatedPosts = [
    {
      id: 2,
      title: 'Mindfulness in the Digital Age',
      category: 'Mental Health',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Building Resilience Through Difficult Times',
      category: 'Mental Health',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'The Science of Happiness',
      category: 'Mental Health',
      readTime: '7 min read'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{post.createdAt?.toLocaleDateString()}</span>
            </div>
            <span>{post.readTime}</span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Share:</span>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
            <button 
              onClick={handleLike}
              disabled={!user}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                user && post.likedBy?.includes(user.uid)
                  ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Heart className={`h-4 w-4 ${user && post.likedBy?.includes(user.uid) ? 'fill-current' : ''}`} />
              <span className="text-sm">{post.likes || 0} Likes</span>
            </button>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            {post.imageUrl && post.imageUrl.startsWith('data:') ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-xl opacity-80">{post.category}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {post.authorName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.authorName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Published on {post.createdAt?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Comments ({post.comments?.length || 0})
          </h3>
          
          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim() || submittingComment}
                    className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submittingComment ? (
                      <>
                        <HeartLoader size="sm" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Post Comment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-8">
              <p className="text-gray-600 dark:text-gray-300">
                <Link href="/login" className="text-pink-500 hover:text-pink-600">Sign in</Link> to leave a comment.
              </p>
            </div>
          )}
          
          {/* Comments List */}
          <div className="space-y-4">
            {post.comments?.length > 0 ? (
              post.comments.map((comment: any) => (
                <div key={comment.id} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {comment.authorName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {comment.authorName}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(comment.createdAt?.seconds * 1000 || comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                type="no-comments"
                title="No Comments Yet"
                description="Be the first to share your thoughts on this article. Your insights could spark meaningful discussions and help others."
                actionText={user ? undefined : "Sign In to Comment"}
                actionHref={user ? undefined : "/login"}
              />
            )}
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-sm opacity-80">{relatedPost.category}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-1 rounded-full text-xs font-medium">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-3 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {relatedPost.readTime}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.id}`}
                    className="text-pink-500 hover:text-pink-600 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
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
}