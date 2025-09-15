# You Deserve Better 💖

A modern, responsive Next.js application for a self-growth company focused on mental health, women empowerment, and pharmaceutical wellness.

## 🚀 Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Seamless theme switching with next-themes
- **Smooth Animations**: Framer Motion animations throughout
- **Professional Video Frame**: Animated logo display with floating stats
- **Custom Components**: Heart loader, toast notifications, empty states

### 📝 **Dynamic Blog System**
- **Firebase Integration**: Real-time blog posts with Firestore
- **Authentication**: Firebase Auth for user management
- **Image Upload**: Base64 image storage (CORS-free solution)
- **Interactive Features**: Likes, comments, search, and filtering
- **Rich Content**: Full blog creation and management system

### 📧 **Newsletter Subscription**
- **Dual Integration**: Footer and blog page subscriptions
- **Email Validation**: Regex validation and duplicate prevention
- **Database Storage**: Firestore collection with source tracking
- **User Feedback**: Toast notifications for all actions

### 🔐 **Authentication & Security**
- **Firebase Auth**: Email/password authentication
- **Protected Routes**: Blog creation requires authentication
- **Secure Rules**: Firestore security rules for data protection
- **User Management**: Profile display and logout functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage (with base64 fallback)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog system
│   │   ├── [id]/          # Dynamic blog post pages
│   │   └── create/        # Blog creation page
│   ├── contact/           # Contact page
│   ├── login/             # Authentication page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Footer.tsx         # Footer with newsletter
│   ├── navbar.tsx         # Navigation with theme toggle
│   ├── HeartLoader.tsx    # Custom loading animation
│   ├── Toast.tsx          # Notification system
│   └── EmptyState.tsx     # Empty state illustrations
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── hooks/                 # Custom hooks
│   ├── useCounter.ts      # Animated counter hook
│   ├── useScrollReveal.ts # Scroll animations
│   └── useToast.ts        # Toast notifications
└── lib/                   # Utilities
    └── firebase.ts        # Firebase configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Firebase project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd you-deserve-better
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` with your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Firebase Setup**
   
   **Firestore Rules** (Firebase Console → Firestore → Rules):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /blogs/{document} {
         allow read: if true;
         allow create: if request.auth != null;
         allow update: if request.auth != null;
         allow delete: if request.auth != null && request.auth.uid == resource.data.authorId;
       }
       
       match /newsletter/{document} {
         allow read: if false;
         allow create: if true;
       }
     }
   }
   ```

   **Authentication** (Firebase Console → Authentication):
   - Enable Email/Password provider

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Blogs Collection
```javascript
{
  title: string,
  excerpt: string,
  content: string,
  category: string,
  imageUrl: string, // Base64 data URL
  authorId: string,
  authorName: string,
  authorEmail: string,
  createdAt: timestamp,
  likes: number,
  likedBy: string[],
  comments: array
}
```

### Newsletter Collection
```javascript
{
  email: string,
  subscribedAt: timestamp,
  status: string,
  source: string // 'footer' or 'blog'
}
```

## 🎨 Design System

### Colors
- **Primary**: Pink (#EC4899) to Purple (#8B5CF6) gradients
- **Background**: White/Gray-50 (light), Slate-900/800 (dark)
- **Text**: Gray-900 (light), White (dark)

### Components
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Rounded-xl with shadows and hover animations
- **Forms**: Focus states with pink accent colors
- **Loading**: Custom heart-shaped loader animation

## 🔧 Key Features Implementation

### Animated Counter Stats
```typescript
// Custom hook for smooth number animations
const count = useCounter(15000, 2500) // Target: 15000, Duration: 2500ms
```

### Newsletter Subscription
```typescript
// Validation + Firestore integration
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
await addDoc(collection(db, 'newsletter'), { email, subscribedAt, status })
```

### Image Upload Solution
```typescript
// Base64 storage (CORS-free)
const reader = new FileReader()
const imageUrl = await new Promise(resolve => {
  reader.onload = () => resolve(reader.result)
  reader.readAsDataURL(file)
})
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 🐛 Troubleshooting

### Common Issues

**Firestore Permissions Error**
- Ensure rules are published in Firebase Console
- Hard refresh browser (Ctrl+Shift+R)

**Images Not Displaying**
- Check base64 format in Firestore
- Verify image upload functionality

**Theme Toggle Issues**
- Clear browser cache
- Check next-themes configuration

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Firebase** for backend services
- **Tailwind CSS** for styling system
- **Framer Motion** for animations
- **Lucide React** for beautiful icons

---

**Built with ❤️ for mental health and wellness**