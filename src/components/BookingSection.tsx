import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Info, Calendar, Clock, AlertCircle, Loader } from "lucide-react";
import { bookingAPI } from "../services/api";

type Service = { id: string; name: string; price: number };

const lashSets: Service[] = [
  { id: "classic", name: "Classic Set", price: 20000 },
  { id: "hybrid", name: "Hybrid Set", price: 25000 },
  { id: "volume", name: "Volume Set", price: 30000 },
  { id: "anime", name: "Anime Set", price: 25000 },
  { id: "wet", name: "Wet Set", price: 20000 },
  { id: "custom", name: "Custom Full Set", price: 40000 },
];

const brows: Service[] = [
  { id: "brow-lam", name: "Brow Lamination", price: 13000 },
  { id: "brow-lam-tint", name: "Brow Lamination & Tint", price: 25000 },
  { id: "brow-tint", name: "Brow Tint", price: 13000 },
];

const extras: Service[] = [
  { id: "wispy", name: "Wispy Effect", price: 5000 },
  { id: "under-eye", name: "Under Eye", price: 5000 },
  { id: "removal", name: "Lash Removal", price: 5000 },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function ServiceCard({
  service,
  selected,
  onToggle,
  single,
}: {
  service: Service;
  selected: boolean;
  onToggle: (s: Service) => void;
  single?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onToggle(service)}
      className={`relative w-full text-left rounded-xl p-4 border-2 transition-all duration-300 ${
        selected
          ? "border-primary bg-primary/10 shadow-pink"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <Check size={12} className="text-white" />
        </div>
      )}
      <p className={`font-medium text-sm ${selected ? "text-primary" : "text-foreground"}`}>
        {service.name}
      </p>
      <p className={`text-xs mt-0.5 font-semibold ${selected ? "text-primary/80" : "text-muted-foreground"}`}>
        {formatNaira(service.price)}
      </p>
    </motion.button>
  );
}

export default function BookingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [tab, setTab] = useState<"lash" | "brows" | "extras">("lash");
  const [selectedLash, setSelectedLash] = useState<Service | null>(null);
  const [selectedBrow, setSelectedBrow] = useState<Service | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Client info
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLash = (s: Service) => setSelectedLash(prev => prev?.id === s.id ? null : s);
  const toggleBrow = (s: Service) => setSelectedBrow(prev => prev?.id === s.id ? null : s);
  const toggleExtra = (s: Service) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === s.id) ? prev.filter(e => e.id !== s.id) : [...prev, s]
    );
  };

  const total =
    (selectedLash?.price ?? 0) +
    (selectedBrow?.price ?? 0) +
    selectedExtras.reduce((acc, e) => acc + e.price, 0);

  const handleProceed = async () => {
    setError(null);

    // Validation
    if (!clientName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!clientEmail.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!clientPhone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time");
      return;
    }
    if (total === 0) {
      setError("Please select at least one service");
      return;
    }

    setIsLoading(true);
    try {
      const response = await bookingAPI.createBooking({
        clientName,
        clientEmail,
        clientPhone,
        services: {
          lash: selectedLash,
          brow: selectedBrow,
          extras: selectedExtras,
        },
        date: selectedDate,
        time: selectedTime,
        totalAmount: total,
      });

      // Redirect to Paystack payment
      window.location.href = response.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="script text-primary text-2xl mb-2">Reserve Your Spot</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book an Appointment
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your services, pick a date and time, and we'll confirm your luxury experience.
          </p>
          <div className="flex justify-center mt-4 gap-1">
            <div className="w-12 h-0.5 bg-primary rounded-full" />
            <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="glass-white rounded-2xl p-2 flex gap-2">
              {(["lash", "brows", "extras"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                    tab === t
                      ? "btn-glow text-white shadow-pink"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t === "lash" ? "💖 Lash Sets" : t === "brows" ? "✨ Brows" : "➕ Extras"}
                </button>
              ))}
            </div>

            {/* Service Cards */}
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {tab === "lash" &&
                lashSets.map((s) => (
                  <ServiceCard key={s.id} service={s} selected={selectedLash?.id === s.id} onToggle={toggleLash} single />
                ))}
              {tab === "brows" &&
                brows.map((s) => (
                  <ServiceCard key={s.id} service={s} selected={selectedBrow?.id === s.id} onToggle={toggleBrow} single />
                ))}
              {tab === "extras" &&
                extras.map((s) => (
                  <ServiceCard key={s.id} service={s} selected={!!selectedExtras.find(e => e.id === s.id)} onToggle={toggleExtra} />
                ))}
            </motion.div>

            {/* Date + Time */}
            <div className="glass-white rounded-2xl p-6 space-y-4">
              <h3 className="font-playfair text-xl font-semibold flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Pick a Date & Time
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    <Clock size={12} className="inline mr-1" /> Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`text-xs py-2 rounded-lg border transition-all duration-200 ${
                          selectedTime === t
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary + Disclaimer */}
          <div className="space-y-5">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-white rounded-2xl p-6"
            >
              <h3 className="font-playfair text-xl font-semibold mb-4">Your Selection</h3>
              <div className="space-y-2.5 min-h-[100px]">
                {!selectedLash && !selectedBrow && selectedExtras.length === 0 && (
                  <p className="text-muted-foreground text-sm italic">No services selected yet...</p>
                )}
                {selectedLash && (
                  <div className="flex justify-between text-sm">
                    <span>{selectedLash.name}</span>
                    <span className="font-semibold text-primary">{formatNaira(selectedLash.price)}</span>
                  </div>
                )}
                {selectedBrow && (
                  <div className="flex justify-between text-sm">
                    <span>{selectedBrow.name}</span>
                    <span className="font-semibold text-primary">{formatNaira(selectedBrow.price)}</span>
                  </div>
                )}
                {selectedExtras.map((e) => (
                  <div key={e.id} className="flex justify-between text-sm">
                    <span>{e.name}</span>
                    <span className="font-semibold text-primary">{formatNaira(e.price)}</span>
                  </div>
                ))}
                {selectedDate && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Date</span><span>{selectedDate}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Time</span><span>{selectedTime}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-playfair text-2xl font-bold text-primary">
                  {formatNaira(total)}
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3"
                >
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-500">{error}</p>
                </motion.div>
              )}

              {/* Client Info Form */}
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+234 XXX XXXX XXX"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleProceed}
                disabled={total === 0 || isLoading}
                className="mt-4 w-full btn-glow text-white font-semibold py-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Proceed to Payment →</>
                )}
              </motion.button>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-primary flex-shrink-0" />
                <h4 className="font-semibold text-sm text-foreground">Important Notes</h4>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  ALL LASH REFILLS COST 50% OF THE INITIAL PRICE.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  NO REFILLS ON LASH SETS NOT MADE BY THE ARTIST
                </li>
                <li className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  TOUCHUPS COST 50% OF THE INITIAL PRICE ON BROWS DONE BY THE ARTIST.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  FOREIGN BROWS SHOULD SEND A CLEAR PICTURE FOR TOUCHUP RECOMMENDATIONS.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
