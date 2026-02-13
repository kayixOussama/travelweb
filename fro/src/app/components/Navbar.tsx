import { Menu, X } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const SECRET_CLICKS = 5;
const CLICK_TIMEOUT = 2000;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const handleLogoClick = useCallback(() => {
    clickCount.current += 1;

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, CLICK_TIMEOUT);

    if (clickCount.current >= SECRET_CLICKS) {
      clickCount.current = 0;
      if (clickTimer.current) clearTimeout(clickTimer.current);
      navigate("/login");
    }
  }, [navigate]);

  const navLinks = [
    { name: "Destinations", href: "#destinations" },
    { name: "About Us", href: "#about" },
    { name: "Packages", href: "#packages" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/ backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center cursor-pointer select-none bg-transparent border-none p-0"
          >
            <img
              src="https://fwnlbokaueygkmzthrsx.supabase.co/storage/v1/object/public/asset-public/hashem_logo.PNG"
              alt="Hashem Tours & Safaris"
              className="h-16 w-auto object-contain"
            />
          </button>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
             <button
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
             >
                Book Now
             </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                 <button
                    onClick={() => {
                      setIsOpen(false);
                      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                 >
                    Book Now
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
