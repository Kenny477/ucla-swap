import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Listing } from "../types";

function ListingPreview({ listing }: { listing: Listing }) {
	return (
		<NavLink to={`/listing/${listing.id}`} className="col-span-1 shadow-md rounded-md p-2 grid grid-rows-4">
			<h1 className="text-lg row-span-1">{listing.title}</h1>
      <p className="text-sm row-span-2">{listing.description}</p>
      <p className="text-md row-span-1">{new Date(listing.created_at).toDateString()}</p>
		</NavLink>
	);
}

export default ListingPreview;
