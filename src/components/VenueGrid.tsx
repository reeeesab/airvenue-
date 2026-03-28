import { Venue } from "@/app/actions";
import VenueCard from "./VenueCard";

export default function VenueGrid({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-900">No venues found</h3>
        <p className="text-gray-500">Try adjusting your filters or search location.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
