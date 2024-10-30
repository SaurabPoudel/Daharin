import { Star } from "lucide-react";

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
    ))}
  </div>
);

export default StarRating;
