import { motion } from "motion/react";
import { MapPin, Star } from "lucide-react";
import { useData } from "../../context/DataContext";

export function Destinations() {
  const { destinations } = useData();

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-wide text-green-600 uppercase mb-2">Explore Beauty</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Destinations</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most breathtaking places across the country, from lush rainforests to savannah plains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold text-gray-800">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {destination.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-green-600 mb-2 font-medium">
                  <MapPin className="w-4 h-4 mr-1" />
                  {destination.location}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{destination.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {destination.description}
                </p>
                <button className="w-full py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
