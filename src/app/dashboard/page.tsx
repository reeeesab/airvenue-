import { ArrowRight, Calendar, Users, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getUserLeads } from "../actions";

export default async function DashboardPage() {
  const leads = await getUserLeads();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Your Enquiries</h1>
          <p className="text-gray-500 mt-2">Track the status of your venue bookings and visits.</p>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No enquiries yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Start exploring venues and book a visit or chat with owners to see your enquiries here.
            </p>
            <Link 
              href="/results" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition shadow-lg"
            >
              Browse Venues
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition"
              >
                <div className="relative w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={lead.venue?.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=500"} 
                    alt={lead.venue?.name || "Venue"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{lead.venue?.name}</h3>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{lead.venue?.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                        lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-xl">
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold uppercase text-gray-400">Event Type</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Tag className="w-3 h-3 text-pink-500" />
                        <span className="capitalize">{lead.event_type}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold uppercase text-gray-400">Guests</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Users className="w-3 h-3 text-pink-500" />
                        <span>{lead.guests} guests</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold uppercase text-gray-400">Budget</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="text-pink-500 font-bold">£</span>
                        <span>{lead.budget}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold uppercase text-gray-400">Date Logged</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 font-medium">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link 
                      href={`/venue/${lead.venue_id}`}
                      className="text-pink-600 font-bold text-sm hover:underline flex items-center gap-1"
                    >
                      View Venue Details
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
