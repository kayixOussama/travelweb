import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-bold text-2xl tracking-tight">
                Discover<span className="text-green-500">Rwanda</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We specialize in creating unforgettable experiences in the Land of a Thousand Hills. From gorilla trekking to cultural immersions, let us guide you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-400 hover:text-green-500 transition-colors">About Us</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-green-500 transition-colors">Destinations</a></li>
              <li><a href="#packages" className="text-gray-400 hover:text-green-500 transition-colors">Tour Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-4">
              <li className="text-gray-400">Gorilla Trekking Permits</li>
              <li className="text-gray-400">Custom Safari Itineraries</li>
              <li className="text-gray-400">Hotel & Lodge Booking</li>
              <li className="text-gray-400">Airport Transfers</li>
              <li className="text-gray-400">Cultural Tours</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>KG 622 St, Kigali, Rwanda<br />Kimihurura, Kigali Heights</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>hello@discoverrwanda.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Discover Rwanda. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
