"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, BarChart, GitPullRequest, Star, Tag, Menu, X } from "lucide-react"
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"
import { UserProfile } from "@/components/auth/UserProfile"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="w-full px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <Github className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Github Analyzer</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              About
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <UserProfile />
            <GoogleSignInButton />
            <Link href="/dashboards">
              <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                Manage API Keys
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed inset-x-0 top-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm lg:hidden transition-transform duration-300 ease-in-out z-40",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              About
            </Link>
          </nav>
          <div className="flex flex-col gap-3">
            <UserProfile />
            <GoogleSignInButton />
            <Link href="/dashboards" className="w-full">
              <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors">
                Manage API Keys
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 pt-16">
        <section className="w-full py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white">
                  Analyze GitHub Repositories 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Like Never Before
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                  Get powerful insights, summaries, and analytics for any open source GitHub repository.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto px-8 py-6 text-base rounded-xl border-2 hover:bg-primary hover:text-white transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Key Features
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <BarChart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Repository Insights</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get comprehensive summaries and analytics for any GitHub repository.
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <Star className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Star Trends</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Track star history and discover trending repositories in real-time.
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <GitPullRequest className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">PR Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Stay updated on the latest important pull requests and contributions.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Pricing Plans
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card className="flex flex-col p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-4xl font-bold mb-4">
                  $0<span className="text-base font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Basic repository insights
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Limited to 5 repositories
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Daily updates
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </Card>

              <Card className="flex flex-col p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-primary bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-4xl font-bold mb-4">
                  $19<span className="text-base font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Advanced repository analytics
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Unlimited repositories
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Real-time updates
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    PR and issue tracking
                  </li>
                </ul>
                <Button className="w-full">Subscribe</Button>
              </Card>

              <Card className="flex flex-col p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    All Pro features
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    On-premise options
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center sm:text-left">
              © 2024 Github Analyzer. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link className="text-xs hover:text-primary transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:text-primary transition-colors" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
