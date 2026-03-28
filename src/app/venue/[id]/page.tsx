"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Users, Wallet, Check, MessageCircle, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getVenueById, createLead, Venue } from "@/app/actions";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useEffect, useState, use } from "react";

export default function VenueDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    getVenueById(id).then(v => {
      setVenue(v);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
          <div className="bg-gray-200 h-[400px] rounded-2xl mb-8" />
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2 h-64 bg-gray-100 rounded-xl" />
            <div className="h-64 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!venue) {
    notFound();
  }

  // Server Action wrapper called via client transition
  const handleContact = async (type: 'chat' | 'visit') => {
    try {
      const redirectUrl = type === 'chat' 
        ? `https://wa.me/${venue?.whatsapp_number?.replace(/\+/g, '')}`
        : venue?.calendly_link || "#";

      await createLead({
        venueId: id,
        eventType: "General Enquiry",
        guests: venue?.capacity || 0,
        budget: venue?.price_range || "any",
        redirectUrl: redirectUrl
      });
      
      window.open(redirectUrl, '_blank');
    } catch (e) {
      console.error("Action error", e);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl border"
        >
          <div className="md:col-span-2 relative h-full">
            <Image 
              src={venue.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000"} 
              alt={venue.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-4 col-span-2">
            <div className="relative">
              <Image 
                src={venue.images?.[1] || "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000"} 
                alt={venue.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Image 
                  src={venue.images?.[2] || "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1000"} 
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <Image 
                  src={venue.images?.[3] || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000"} 
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{venue.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-3 font-medium">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <span>{venue.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-12 py-8 border-y mb-12">
              <div className="flex items-center gap-4">
                <div className="bg-pink-50 p-3 rounded-2xl">
                  <Users className="w-8 h-8 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Capacity</p>
                  <p className="text-lg font-bold text-gray-800">Up to {venue.capacity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-rose-50 p-3 rounded-2xl">
                  <Wallet className="w-8 h-8 text-rose-500" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Price Range</p>
                  <p className="text-lg font-bold text-gray-800">{venue.price_range}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Experience the venue</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {venue.description || "No description provided."}
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Premium Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {venue.amenities?.map((amenity: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sticky Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="sticky top-24 border rounded-3xl p-8 shadow-2xl bg-white/80 backdrop-blur-xl border-white/20">
              <div className="mb-8 p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
                <p className="text-3xl font-extrabold text-gray-900">{venue.price_range}</p>
                <p className="text-pink-600 font-bold text-sm mt-1 uppercase tracking-widest">Base Rate</p>
              </div>

              {!userId ? (
                <div className="bg-gray-100 p-6 rounded-2xl mb-4 text-center border-2 border-dashed border-gray-200">
                  <p className="text-sm text-gray-600 font-bold mb-4">Join airVenue.ai to contact owners</p>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">Sign In</button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <button 
                    onClick={() => handleContact('chat')}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-green-200 transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Chat on WhatsApp
                  </button>
                  
                  <button 
                    onClick={() => handleContact('visit')}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-rose-200 transition-all duration-300"
                  >
                    <Calendar className="w-6 h-6" />
                    Book a Visit
                  </button>
                </div>
              )}

              <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed px-4">
                Exclusive booking conditions apply. By interacting you agree to our 
                <span className="text-gray-600 font-medium"> terms and conditions</span> for hosting on airVenue.ai.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
