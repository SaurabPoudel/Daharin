import React from "react";
import Link from "next/link";
import { Features } from "../components/landing/Features";
import { Pricing } from "../components/landing/Payment";
import Header from "@/components/landing/Header";
import Testimonial from "@/components/landing/Testimonial";
import CTA from "@/components/landing/CTA";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Navbar = () => (
  <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-emerald-500">
        Daharin
      </Link>
      <div className="flex items-center gap-8">
        <Link href="#features" className="text-gray-600 hover:text-emerald-500">
          Features
        </Link>
        <Link
          href="#testimonials"
          className="text-gray-600 hover:text-emerald-500"
        >
          Testimonials
        </Link>
        <Link href="#contact" className="text-gray-600 hover:text-emerald-500">
          Contact
        </Link>
        <Link href={"/getStarted"}>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600">
            Start Now
          </button>
        </Link>
      </div>
    </div>
  </nav>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Header />

      <section id="features" className="py-12 md:py-24  ">
        {/* Features Section */}
        <Features />
      </section>

      {/* Testimonials Section */}
      <Testimonial />
      <Pricing />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Daharin</h3>
              <p className="text-gray-400">
                Simplifying nutrition tracking through WhatsApp
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#testimonials">Testimonials</Link>
                </li>
                <li>
                  <Link href="#pricing">Pricing</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+9779861487591</li>
                <li>aayushgelal4@gmail.com</li>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-emerald-500">
                  <Instagram size={24} />
                </Link>
                <Link href="#" className="hover:text-emerald-500">
                  <Twitter size={24} />
                </Link>
                <Link href="#" className="hover:text-emerald-500">
                  <Linkedin size={24} />
                </Link>
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
