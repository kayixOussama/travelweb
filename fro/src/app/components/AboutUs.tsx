import { motion } from "motion/react";
import { Shield, Heart, Map } from "lucide-react";

export function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1643367750096-0f9215fdd0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBndWlkZSUyMHJ3YW5kYSUyMGZyaWVuZGx5fGVufDF8fHx8MTc3MDIwMTU4MHww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Hashem Tours Guide" 
                className="w-full h-full object-cover min-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-xl">Authentic Experiences</p>
                <p className="text-gray-200">Discover the real Rwanda with us</p>
              </div>
            </div>
            
            {/* Decorative pattern/shape behind */}
            <div className="absolute -z-10 top-[-20px] left-[-20px] w-full h-full border-2 border-green-100 rounded-2xl transform -rotate-3" />
            <div className="absolute -z-10 bottom-[-20px] right-[-20px] w-full h-full bg-green-50 rounded-2xl transform rotate-3" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-wide text-green-600 uppercase mb-2">About Hashem Tours</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Gateway to Unforgettable Adventures</h3>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hashem Tours & Safaris is a tourism company dedicated to delivering memorable and authentic travel experiences in Rwanda and the region.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We focus on quality service, safety, and professionalism to ensure every guest enjoys a smooth and unforgettable journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Safety First</h4>
                  <p className="text-sm text-gray-500">Rigorous safety standards for your peace of mind.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Quality Service</h4>
                  <p className="text-sm text-gray-500">Dedicated to excellence in every detail.</p>
                </div>
              </div>
            </div>

            <button className="px-8 py-3 bg-gray-900 hover:bg-green-600 text-white rounded-xl font-medium transition-colors duration-300 shadow-lg hover:shadow-xl">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
