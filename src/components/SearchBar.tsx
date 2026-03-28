"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [location, setLocation] = useState(searchParams.get("location") || "London");
  const [guests, setGuests] = useState(searchParams.get("guests") || "");
  const [budget, setBudget] = useState(searchParams.get("budget") || "");
  const [eventType, setEventType] = useState(searchParams.get("eventType") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (guests) params.set("guests", guests);
    if (budget) params.set("budget", budget);
    if (eventType) params.set("eventType", eventType);
    
    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        onSubmit={handleSearch}
        className="bg-white p-2 rounded-full shadow-xl border flex flex-col md:flex-row items-center gap-2"
      >
        <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r py-2">
          <label className="text-[10px] font-bold uppercase text-gray-500 block">Location</label>
          <input 
            type="text" 
            placeholder="Where are you going?"
            className="w-full text-sm font-medium outline-none placeholder:text-gray-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r py-2">
          <label className="text-[10px] font-bold uppercase text-gray-500 block">Event Type</label>
          <select 
            className="w-full text-sm font-medium outline-none bg-transparent"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Any event</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="birthday">Birthday</option>
            <option value="party">Party</option>
          </select>
        </div>

        <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r py-2">
          <label className="text-[10px] font-bold uppercase text-gray-500 block">Guests</label>
          <input 
            type="number" 
            placeholder="How many people?"
            className="w-full text-sm font-medium outline-none"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <div className="flex-1 w-full px-4 py-2">
          <label className="text-[10px] font-bold uppercase text-gray-500 block">Budget</label>
          <select 
            className="w-full text-sm font-medium outline-none bg-transparent"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Any budget</option>
            <option value="1000">Up to £1000</option>
            <option value="2000">Up to £2000</option>
            <option value="5000">Up to £5000</option>
            <option value="above">£5000+</option>
          </select>
        </div>

        <button 
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-full hover:opacity-90 transition shadow-md"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
