"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import VenueGrid from "@/components/VenueGrid";
import { getVenues, Venue } from "../actions";
import { useEffect, useState, use, Suspense } from "react";

export default function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVenues({
      location: params.location as string,
      guests: params.guests ? parseInt(params.guests as string) : undefined,
      budget: params.budget as string,
      eventType: params.eventType as string,
    }).then(v => {
      setVenues(v);
      setLoading(false);
    });
  }, [params.location, params.guests, params.budget, params.eventType]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-white border-b py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-12 w-full bg-gray-100 animate-pulse rounded-full" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {loading ? "Searching..." : `${venues.length} ${venues.length === 1 ? 'venue' : 'venues'} found`}
            {params.location ? ` in ${params.location}` : ''}
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Prices and availability might change based on your event date.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse flex flex-col gap-3">
                <div className="bg-gray-200 rounded-2xl aspect-[4/3]" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <VenueGrid venues={venues} />
          </motion.div>
        )}
      </section>
    </main>
  );
}
