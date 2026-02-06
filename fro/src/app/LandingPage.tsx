import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Destinations } from "./components/Destinations";
import { Packages } from "./components/Packages";
import { Footer } from "./components/Footer";
import { AboutUs } from "./components/AboutUs";
import { ContactUs } from "./components/ContactUs";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <AboutUs />
      
      {/* Popular / Why Choose Us Section - Small interstitial */}
      <section className="py-20 bg-green-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
           <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <path fill="#FFFFFF" d="M45.7,-70.5C58.9,-62.5,69.3,-49.6,75.9,-35.3C82.5,-21,85.4,-5.2,82.4,9.2C79.4,23.6,70.5,36.6,59.6,47.1C48.7,57.6,35.8,65.7,21.8,70.8C7.8,75.9,-7.2,78.1,-20.9,74.5C-34.6,70.9,-46.9,61.6,-56.8,50.1C-66.7,38.6,-74.1,24.9,-75.6,10.6C-77.1,-3.7,-72.6,-18.6,-63.9,-30.9C-55.2,-43.2,-42.3,-52.9,-28.9,-60.8C-15.5,-68.7,0,-74.8,14.2,-74.8C28.4,-74.8,42.6,-68.7,56.8,-62.6Z" transform="translate(100 100)" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Travel With Us?</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We are a locally owned tour operator committed to sustainable tourism. By traveling with us, you directly support conservation efforts and local communities.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                   <h3 className="text-4xl font-bold text-green-400 mb-2">10+</h3>
                   <p className="text-sm text-gray-300 uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                   <h3 className="text-4xl font-bold text-green-400 mb-2">5k+</h3>
                   <p className="text-sm text-gray-300 uppercase tracking-wider">Happy Travelers</p>
                </div>
                <div>
                   <h3 className="text-4xl font-bold text-green-400 mb-2">24/7</h3>
                   <p className="text-sm text-gray-300 uppercase tracking-wider">Support</p>
                </div>
                <div>
                   <h3 className="text-4xl font-bold text-green-400 mb-2">100%</h3>
                   <p className="text-sm text-gray-300 uppercase tracking-wider">Customizable</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyd2FuZGElMjB0cmFkaXRpb25hbCUyMGRhbmNlcnN8ZW58MXx8fHwxNzcwMjAxMTYxfDA&ixlib=rb-4.1.0&q=80&w=400" alt="Rwanda Culture" className="rounded-2xl object-cover h-64 w-full translate-y-8 shadow-lg" />
                 <img src="https://images.unsplash.com/photo-1662217134917-264a5e248581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2FmYXJpJTIwamVlcCUyMHNhdmFubmFoJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3MDIwMTA4Mnww&ixlib=rb-4.1.0&q=80&w=400" alt="Safari Adventure" className="rounded-2xl object-cover h-64 w-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Packages />
      <ContactUs />
      <Footer />
    </>
  );
}
