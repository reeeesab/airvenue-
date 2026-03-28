"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price_range: string;
  description: string | null;
  images: string[];
  amenities: string[];
  whatsapp_number: string | null;
  calendly_link: string | null;
};

export type Lead = {
  id: string;
  user_id: string;
  venue_id: string;
  event_type: string;
  guests: number;
  budget: string;
  status: string;
  created_at: string;
  venue?: Venue;
};

export async function getVenues(filters?: {
  location?: string;
  guests?: number;
  budget?: string;
  eventType?: string;
}) {
  let query = supabase.from("venues").select("*");

  if (filters?.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }
  if (filters?.guests) {
    query = query.gte("capacity", filters.guests);
  }
  // Budget and Event Type filtering could be more complex depending on schema
  // For now, simpler filtering
  if (filters?.budget && filters.budget !== "any") {
    query = query.ilike("price_range", `%${filters.budget}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching venues:", error);
    return [];
  }

  return data as Venue[];
}

export async function getVenueById(id: string) {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching venue:", error);
    return null;
  }

  return data as Venue;
}

export async function createLead(formData: {
  venueId: string;
  eventType: string;
  guests: number;
  budget: string;
  redirectUrl?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User must be logged in to create a lead");
  }

  const { error } = await supabase.from("leads").insert({
    user_id: userId,
    venue_id: formData.venueId,
    event_type: formData.eventType,
    guests: formData.guests,
    budget: formData.budget,
    status: "new",
  });

  if (error) {
    console.error("Error creating lead:", error);
    throw new Error("Failed to create lead");
  }

  revalidatePath("/dashboard");

  if (formData.redirectUrl) {
    redirect(formData.redirectUrl);
  }
}

export async function getUserLeads() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*, venue:venues(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }

  return data as Lead[];
}
