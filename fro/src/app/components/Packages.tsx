import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Calendar, Users, User, Mail, Phone } from "lucide-react";
import { useData } from "../../context/DataContext";

type BookingFormData = {
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  travelDate: string;
  notes: string;
};

export function Packages() {
  const { packages } = useData();
  const WHATSAPP_NUMBER = "250781411592";
  const [selectedPkg, setSelectedPkg] = useState<{ name: string; price: string; duration: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const openBookingForm = (pkg: { name: string; price: string; duration: string }) => {
    setSelectedPkg(pkg);
    reset();
  };

  const onSubmit = (data: BookingFormData) => {
    if (!selectedPkg) return;

    const text =
      `Hello, I want to book the *${selectedPkg.name}* package.\n\n` +
      `👤 Name: ${data.fullName}\n` +
      `📧 Email: ${data.email}\n` +
      `📞 Phone: ${data.phone}\n` +
      `👥 Guests: ${data.guests}\n` +
      `📅 Travel Date: ${data.travelDate}\n` +
      `💰 Price: ${selectedPkg.price}/person\n` +
      `⏱ Duration: ${selectedPkg.duration}\n` +
      (data.notes ? `📝 Notes: ${data.notes}\n` : "") +
      `\nThank you!`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
    setSelectedPkg(null);
    reset();
    window.open(url, "_blank");
  };

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
              
              <button
                onClick={() => openBookingForm(pkg)}
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
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

      {/* Booking Form Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedPkg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Book: {selectedPkg.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedPkg.price}/person · {selectedPkg.duration}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPkg(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 mr-1.5 text-gray-400" /> Full Name
                  </label>
                  <input
                    {...register("fullName", { required: "Full name is required" })}
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 mr-1.5 text-gray-400" /> Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 mr-1.5 text-gray-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phone", { required: "Phone number is required" })}
                    placeholder="+250 7XX XXX XXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Guests */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Users className="w-4 h-4 mr-1.5 text-gray-400" /> Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      {...register("guests", { required: "Required", min: { value: 1, message: "At least 1" } })}
                      defaultValue={1}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    {errors.guests && (
                      <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>
                    )}
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="w-4 h-4 mr-1.5 text-gray-400" /> Travel Date
                    </label>
                    <input
                      type="date"
                      {...register("travelDate", { required: "Date is required" })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    {errors.travelDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.travelDate.message}</p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="Any special requests or questions..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.03L.789 23.257a.75.75 0 00.914.914l4.227-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.584l-.39-.234-3.307 1.169 1.169-3.307-.254-.404A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Send Booking via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
