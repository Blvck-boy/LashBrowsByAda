import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, Users, Star, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { traineeAPI } from "../services/api";

const perks = [
  { icon: GraduationCap, label: "Certified Training" },
  { icon: Award, label: "Certificate Awarded" },
  { icon: Users, label: "Small Class Sizes" },
  { icon: Star, label: "Expert Mentor" },
];

export default function TrainingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!form.phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!form.experience) {
      setError("Please select experience level");
      return;
    }

    setIsLoading(true);
    try {
      await traineeAPI.registerTrainee({
        name: form.name,
        email: form.email,
        phone: form.phone,
        experienceLevel: form.experience,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="training" className="py-24 bg-gradient-dark text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="script text-primary text-2xl mb-2">Train with Ada</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Become a Certified
            <span className="text-gradient-pink italic block">Lash Artist</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            Join Ada's exclusive training program and learn the art of lashes from an industry expert.
            Start your beauty career with confidence.
          </p>
          <div className="flex justify-center mt-4 gap-1">
            <div className="w-12 h-0.5 bg-primary rounded-full" />
            <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
          </div>
        </motion.div>

        {/* Perks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                className="glass rounded-2xl p-5 text-center flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-white/80">{p.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="glass rounded-2xl p-8 md:p-10 max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={28} className="text-white" />
              </motion.div>
              <h3 className="font-playfair text-2xl font-semibold mb-2">You're Registered! 🎉</h3>
              <p className="text-white/60">We've received your application. Ada will review it and get in touch with training details within 24 hours.</p>
            </div>
          ) : (
            <>
              <h3 className="font-playfair text-2xl font-semibold mb-6 text-center">
                Registration Form
              </h3>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3"
                >
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-500">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">Full Name *</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">Email Address *</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">Phone Number *</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 000 0000 000"
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">Experience Level *</label>
                    <motion.select
                      whileFocus={{ scale: 1.01 }}
                      name="experience"
                      required
                      value={form.experience}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all appearance-none"
                    >
                      <option value="" className="bg-secondary text-white">Select level</option>
                      <option value="beginner" className="bg-secondary text-white">Complete Beginner</option>
                      <option value="some" className="bg-secondary text-white">Some Experience</option>
                      <option value="intermediate" className="bg-secondary text-white">Intermediate</option>
                      <option value="advanced" className="bg-secondary text-white">Advanced</option>
                    </motion.select>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-glow text-white font-semibold py-4 rounded-xl tracking-wide text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>Register for Training →</>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
