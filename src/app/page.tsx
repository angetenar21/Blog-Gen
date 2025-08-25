import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Target, Clock, CheckCircle, Play } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Navigation */}
      <nav className="glass-dark fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">BlogAI</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-primary-enhanced">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-slide-up">
          <Badge className="mb-6 glass shadow-glow animate-bounce-gentle bg-blue-500/20 text-blue-300 border-blue-400/30" variant="secondary">
            🚀 AI-Powered Content Generation
          </Badge>
          <h1 className="text-responsive-xl font-bold text-white mb-6 animate-fade-in">
            Create Amazing
            <span className="gradient-blue block animate-float">Blog Content</span>
            <span className="gradient-purple">in Minutes</span>
          </h1>
          <p className="text-responsive-md text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Transform your ideas into engaging blog posts with our AI-powered writing assistant.
            Generate high-quality content that ranks well and engages your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link href="/auth/signup">
              <Button size="lg" className="btn-primary-enhanced text-lg px-8 py-4 shadow-luxury hover-lift">
                Start Writing for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover-lift glass border-gray-600 text-gray-300 hover:text-white">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4 animate-fade-in">No credit card required • 7-day free trial</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-responsive-lg font-bold text-white mb-4">
            Why Choose BlogAI?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with intuitive design to revolutionize your content creation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card className="card-enhanced text-center p-8 hover-lift shadow-card-dark h-full">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mb-6 animate-bounce-gentle shadow-glow">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4">Lightning Fast Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-300">
                  Generate a complete, SEO-optimized blog post in under 60 seconds. Our advanced AI understands context, maintains your brand voice, and creates relevant, engaging content that resonates with your audience instantly.
                </CardDescription>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Average generation time: 45 seconds</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Support for 50+ languages</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Custom tone and style matching</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-enhanced text-center p-6 hover-lift shadow-glow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 animate-float shadow-luxury">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">SEO Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Every post is optimized for search engines with proper keyword placement, meta descriptions, and structure.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="card-enhanced text-center p-6 hover-lift shadow-glow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 animate-bounce-gentle shadow-luxury">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Reduce content creation time by 90%. Focus on strategy while we handle the writing, editing, and formatting.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-responsive-lg font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Choose the plan that fits your content needs and start creating amazing blog posts today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Card className="card-pricing shadow-card-dark h-full">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl font-bold text-white">Starter</CardTitle>
                <CardDescription className="text-gray-400 mt-2">Perfect for individuals and beginners</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold gradient-blue">$9</span>
                  <span className="text-gray-400 text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">10 blog posts per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Basic SEO optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Email support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Basic templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">1 user account</span>
                </div>
              </CardContent>
              <div className="p-8 pt-0">
                <Link href="/auth/signup">
                  <Button className="w-full btn-primary-enhanced hover-lift" size="lg">Get Started</Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Pro Plan */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-pricing-featured shadow-card-dark h-full relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 shadow-glow">Most Popular</Badge>
              </div>
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl font-bold text-white">Professional</CardTitle>
                <CardDescription className="text-gray-400 mt-2">Best for growing businesses and content creators</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold gradient-blue">$29</span>
                  <span className="text-gray-400 text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">50 blog posts per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Advanced SEO optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Premium templates & styles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Content scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">5 user accounts</span>
                </div>
              </CardContent>
              <div className="p-8 pt-0">
                <Link href="/auth/signup">
                  <Button className="w-full btn-primary-enhanced hover-lift" size="lg">Get Started</Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Enterprise Plan */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="card-pricing shadow-card-dark h-full">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl font-bold text-white">Enterprise</CardTitle>
                <CardDescription className="text-gray-400 mt-2">For large organizations and agencies</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold gradient-purple">$99</span>
                  <span className="text-gray-400 text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Unlimited blog posts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Custom AI training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">24/7 dedicated support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Custom templates & branding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Team collaboration tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">API access & integrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Unlimited user accounts</span>
                </div>
              </CardContent>
              <div className="p-8 pt-0">
                <Button variant="outline" className="w-full glass border-gray-600 text-gray-300 hover:text-white hover-lift" size="lg">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center animate-slide-up">
          <div className="glass max-w-4xl mx-auto p-12 rounded-3xl shadow-luxury">
            <h2 className="text-responsive-lg font-bold text-white mb-6">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of content creators who are already using AI to scale their blog
              content and drive massive engagement. Start your journey today and see the difference
              intelligent content creation can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button size="lg" className="btn-primary-enhanced hover-lift px-8 py-4 text-lg">
                  Start Creating Amazing Content
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="glass border-gray-600 text-gray-300 hover:text-white hover-lift px-8 py-4 text-lg">
                  Watch Demo
                  <Play className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center mt-8 space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-blue">BlogAI Pro</h3>
              <p className="text-gray-400 leading-relaxed">
                Transform your content strategy with AI-powered blog generation.
                Create engaging, SEO-optimized content at scale.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                  SEO Ready
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Product</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="#features" className="block hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="block hover:text-white transition-colors">Pricing</Link>
                <Link href="/demo" className="block hover:text-white transition-colors">Demo</Link>
                <Link href="/templates" className="block hover:text-white transition-colors">Templates</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Company</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
                <Link href="/careers" className="block hover:text-white transition-colors">Careers</Link>
                <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Support</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/help" className="block hover:text-white transition-colors">Help Center</Link>
                <Link href="/docs" className="block hover:text-white transition-colors">Documentation</Link>
                <Link href="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BlogAI Pro. All rights reserved. Built with ❤️ for content creators.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
