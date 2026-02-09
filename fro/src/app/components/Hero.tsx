import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1756245994848-1eb2be3b9b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyd2FuZGElMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBsdXNoJTIwZ3JlZW4lMjB0ZWElMjBwbGFudGF0aW9ufGVufDF8fHx8MTc3MDIwMTA4Mnww&ixlib=rb-4.1.0&q=80&w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm font-medium mb-6 uppercase tracking-wider"
        >
          The Land of a Thousand Hills
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Discover Rwanda
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Experience the breathtaking landscapes, vibrant culture, and unforgettable wildlife encounters in the heart of Africa.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#destinations" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
            Explore Destinations <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#packages" className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center">
            View Packages
          </a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}
