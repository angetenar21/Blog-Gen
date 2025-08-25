# 🤖 AI Blog Generator SaaS

A modern, full-stack SaaS platform for generating high-quality blog content using Google Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)
![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-orange?style=flat-square&logo=google)

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Google Gemini Integration** - Advanced AI for high-quality blog content
- **Multiple Writing Tones** - Professional, casual, technical, and more
- **Customizable Word Counts** - From short posts to long-form content
- **SEO Keyword Integration** - Automatically incorporate target keywords
- **Demo Mode** - Test the platform without API keys

### 📝 Complete Blog Management
- **Enhanced Dashboard** - Beautiful overview with real-time statistics
- **Live Editor** - Real-time markdown preview and editing
- **Draft/Published Workflow** - Manage content lifecycle
- **Search & Filter** - Quickly find and organize your content
- **Export Options** - Download content in multiple formats

### 📊 Analytics & Insights
- **Content Analytics** - Track your writing patterns and productivity
- **Publishing Insights** - Monitor your content creation workflow
- **Visual Reports** - Posts by month, tone distribution, and more
- **Recent Activity** - Keep track of your latest work

### 🔐 Enterprise-Ready
- **Supabase Authentication** - Secure user management
- **Database Integration** - Reliable content storage
- **Responsive Design** - Works perfectly on all devices
- **Professional UI** - Modern gradient design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Google AI Studio account (for Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/angetenar21/Blog-Gen.git
   cd Blog-Gen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the database migrations (SQL scripts provided)

### Google Gemini Setup
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

For detailed setup instructions, see [GEMINI_SETUP.md](./GEMINI_SETUP.md)

## 📁 Project Structure

```
src/
├── app/
│   ├── analytics/          # Analytics dashboard
│   ├── auth/              # Authentication pages
│   ├── blog/[id]/         # Blog post viewer
│   ├── create/            # AI blog creation
│   ├── dashboard/         # Main dashboard
│   ├── edit/[id]/         # Blog editor
│   └── api/               # API routes
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
└── styles/               # Global styles
```

## 🎯 Key Technologies

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **AI**: Google Gemini 1.5 Flash
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel-ready

## 🌟 Why This Stack?

### Google Gemini Advantages
- **Generous free tier** (1,500 requests/day)
- **No billing required** to start
- **High-quality content generation**
- **Built-in safety features**

### Modern Tech Stack
- **Next.js 15** - Latest features and performance
- **TypeScript** - Type safety and better DX
- **Supabase** - Postgres with real-time features
- **Tailwind CSS** - Rapid UI development

## 📊 Performance

- ⚡ **Fast loading** - Optimized with Next.js
- 📱 **Mobile-first** - Responsive design
- 🔒 **Secure** - Enterprise-grade authentication
- 🎨 **Professional** - Modern UI/UX design

## 🔮 Roadmap

- [ ] **Stripe Integration** - Subscription payments
- [ ] **Content Export** - WordPress, Medium, PDF
- [ ] **Team Collaboration** - Multi-user workspaces
- [ ] **Advanced SEO** - Content optimization tools
- [ ] **Public Sharing** - Shareable blog links
- [ ] **API Access** - Developer integrations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation files
- Review the setup guides

---

**Built with ❤️ using Google Gemini AI**

Transform your content creation workflow with AI-powered blog generation!
