import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const WHATSAPP_NUMBER = "250781411592";

  const onSubmit = async (data: FormData) => {
    // Build WhatsApp URL before the async call to keep user-gesture context
    const text = `Hi, I'm *${data.name}*\n📧 ${data.email}\n📌 Subject: ${data.subject}\n\n${data.message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message saved! Redirecting to WhatsApp...");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      return; // Don't redirect if save failed
    }

    // Redirect via location.href instead of window.open to avoid popup blockers
    window.location.href = whatsappUrl;
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-wide text-green-600 uppercase mb-2">Get in Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Let's Plan Your Trip</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have questions about our packages or want to customize your Rwanda adventure? 
              Fill out the form, and our travel experts will help you craft the perfect itinerary.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Visit Us</h4>
                  <p className="text-gray-600">KG 622 St, Kigali Heights<br />Kimihurura, Kigali, Rwanda</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Call Us</h4>
                  <p className="text-gray-600">+250 781 411 592</p>
                  <p className="text-gray-500 text-sm">Mon - Sat: 8am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Email Us</h4>
                  <p className="text-gray-600">aboubakarmukunzi@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2 transition-all bg-gray-50`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2 transition-all bg-gray-50`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                <select
                  id="subject"
                  {...register("subject", { required: "Please select a subject" })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2 transition-all bg-gray-50`}
                >
                  <option value="">Select a topic</option>
                  <option value="Booking Inquiry">Booking Inquiry</option>
                  <option value="Custom Itinerary">Custom Itinerary Request</option>
                  <option value="General Question">General Question</option>
                  <option value="Partnership">Partnership Opportunity</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2 transition-all bg-gray-50 resize-none`}
                  placeholder="Tell us about your dream trip..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
