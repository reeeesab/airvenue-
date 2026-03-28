"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import VenueGrid from "@/components/VenueGrid";
import { getVenues, Venue } from "./actions";
import { useEffect, useState } from "react";

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    getVenues().then(setVenues);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.5]"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight"
          >
            Find the perfect space for <br />
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">your next big moment</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md font-medium"
          >
            Discover breathtaking venues, from grand ballrooms to intimate lofts. 
            Book your visit today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Venues</h2>
            <p className="text-gray-500 mt-2">Explore our hand-picked selection of top-rated venues.</p>
          </div>
          <button className="text-pink-600 font-semibold hover:underline decoration-2 underline-offset-4">
            View All
          </button>
        </div>
        
        <VenueGrid venues={venues.slice(0, 8)} />
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-medium mb-4">List your venue on <span className="font-normal text-white">airVenue.ai</span></h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join thousands of venue owners and start getting high-quality leads for your space.
            </p>
            <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 airVenue.ai. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
