"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, MessageCircle, ChevronRight, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Features } from './components/landing/Features';
import { Pricing } from './components/landing/Payment';

const Navbar = () => (
  <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-emerald-500">Daharin</Link>
      <div className="flex items-center gap-8">
        <Link href="#features" className="text-gray-600 hover:text-emerald-500">Features</Link>
        <Link href="#testimonials" className="text-gray-600 hover:text-emerald-500">Testimonials</Link>
        <Link href="#contact" className="text-gray-600 hover:text-emerald-500">Contact</Link>
        <Link href={'/getStarted'}>

        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600">
          Start Now
        </button>
        </Link>
      </div>
    </div>
  </nav>
);

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
    ))}
  </div>
);

const TestimonialCard = ({ name, role, content }:any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    <StarRating />
    <p className="mt-4 text-gray-600">{content}</p>
    <div className="mt-4">
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "Tracking calories through WhatsApp is genius! No more juggling between different apps."
    },
    {
      name: "Mike Chen",
      role: "Personal Trainer",
      content: "I recommend this to all my clients. The simplicity and accuracy are unmatched."
    },
    {
      name: "Emma Watson",
      role: "Nutrition Coach",
      content: "The instant nutrition feedback through WhatsApp has transformed how I guide my clients."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <header className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex  flex-col  items-center gap-2"
          >
            <StarRating />
            <p className="text-sm text-gray-600">"No more hassle to download another calorie tracker app and accurate too!"</p>
          </motion.div>
          
          <div className="grid  md:grid-cols-2 mt-20 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-6xl font-bold mb-6">
                Stay healthy and maintain calories with <p className='text-emerald-600'> WhatsApp</p>
              </h1>
              <p className="text-gray-600 mb-8">
                Track your nutrition journey right where you chat. No downloads, no complications.
              </p>
              <Link href={'/getStarted'}>
              <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 flex items-center gap-2">
                Start For Free <ChevronRight />
              </button>
              </Link>

            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-full  "
            >
              <img 
                src="/2.png"
                alt="WhatsApp Interface"
                className=" md:ml-32 max-h-96 md:scale-150 scale-110 object-contain  w-full "
              />
            </motion.div>
          </div>
        </div>
      </header>

      <section id="features" className="py-12 md:py-24  ">

      {/* Features Section */}
        <Features />
        </section>

      {/* Testimonials Section */}
      <section className="py-20" id="testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What our users say</h2>
            <p className="text-gray-600">Join thousands of satisfied users on their health journey</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      <Pricing />

      {/* CTA Section */}
      <section className="py-20 bg-emerald-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Start your journey today</h2>
              <p className="mb-8">Register your number and start instant.</p>
              <Link href={'/getStarted'}>
              <button className="bg-white text-emerald-500 px-8 py-3 rounded-lg hover:bg-gray-100">
                Get Started
              </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className='flex md:flex-row flex-col items-center'
            >
               <img 
                src="/3.png"
                alt="App Preview"
                className="object-contain max-h-96"
              />
               <img 
                src="/1.png"
                alt="App Preview"
                className="object-contain max-h-96"
              />
              <img 
                src="/2.png"
                alt="App Preview"
                className="object-contain max-h-96"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Daharin</h3>
              <p className="text-gray-400">Simplifying nutrition tracking through WhatsApp</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#testimonials">Testimonials</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+9779861487591</li>
                <li>aayushgelal4@gmail.com</li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-emerald-500"><Instagram size={24} /></Link>
                <Link href="#" className="hover:text-emerald-500"><Twitter size={24} /></Link>
                <Link href="#" className="hover:text-emerald-500"><Linkedin size={24} /></Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Daharin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}