import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useData } from "../../context/DataContext";

export function Packages() {
  const { packages } = useData();

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-wide text-green-600 uppercase mb-2">Plan Your Trip</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Packages</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated itineraries designed to give you the best experience of Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl p-8 border ${
                pkg.recommended 
                  ? "border-green-600 bg-green-50 shadow-xl scale-105 z-10" 
                  : "border-gray-200 bg-white hover:shadow-lg hover:border-green-200"
              } transition-all duration-300 flex flex-col`}
            >
              {pkg.recommended && (
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-2xl">
                  POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900">{pkg.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{pkg.duration}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-gray-900">{pkg.price}</span>
                <span className="text-gray-500"> / person</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${pkg.recommended ? "text-green-600" : "text-gray-400"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
                pkg.recommended 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
                Book This Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
