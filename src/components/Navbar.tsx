"use client";

import Link from "next/link";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-3xl font-medium bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            airVenue.ai
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="/" className="hover:text-pink-600 transition-colors">Explore</Link>
            <Link href="/results" className="hover:text-pink-600 transition-colors">Venues</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Show when="signed-in">
            <div className="flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-pink-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <div className="border-l pl-6">
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border-2 border-pink-100" } }} />
              </div>
            </div>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg hover:shadow-gray-200">
                Sign In
              </button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </motion.nav>
  );
}
