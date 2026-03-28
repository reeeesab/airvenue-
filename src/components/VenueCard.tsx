"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, MapPin, Wallet } from "lucide-react";
import { Venue } from "@/app/actions";
import { motion } from "framer-motion";

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/venue/${venue.id}`} className="group">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-300">
            <Image
              src={venue.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000"}
              alt={venue.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm">
              Featured
            </div>
          </div>
          <div className="flex flex-col px-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-pink-600 transition-colors line-clamp-1">
                {venue.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{venue.location}</span>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-lg">
                <Users className="w-4 h-4 text-pink-500" />
                <span>{venue.capacity}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-lg">
                <Wallet className="w-4 h-4 text-pink-500" />
                <span>{venue.price_range}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
