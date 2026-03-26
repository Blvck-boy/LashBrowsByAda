import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Eye, Plus } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Lash Extensions",
    description:
      "From classic to volume, anime to custom full sets — we create the perfect lashes to frame your eyes beautifully.",
    features: ["Classic Set", "Hybrid Set", "Volume Set", "Anime Set", "Wet Set", "Custom Full Set"],
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
  },
  {
    icon: Sparkles,
    title: "Brows",
    description:
      "Expertly shaped, laminated, and tinted brows that define your face and elevate your natural beauty.",
    features: ["Brow Lamination", "Lamination & Tint", "Brow Tint"],
    color: "from-accent/30 to-accent/5",
    accent: "text-accent-foreground",
  },
  {
    icon: Plus,
    title: "Add-Ons & Extras",
    description:
      "Enhance your look with our exclusive extras — wispy effects, under eye treatment, and professional lash removal.",
    features: ["Wispy Effect", "Under Eye", "Lash Removal"],
    color: "from-nude/60 to-nude/20",
    accent: "text-muted-foreground",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative glass-white rounded-2xl p-8 cursor-default overflow-hidden transition-all duration-500 hover:shadow-pink"
    >
      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-14 h-14 rounded-2xl bg-gradient-pink flex items-center justify-center mb-6 shadow-pink"
        >
          <Icon size={24} className="text-white" />
        </motion.div>

        <h3 className="font-playfair text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="flex flex-wrap gap-2">
          {service.features.map((f) => (
            <li
              key={f}
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="script text-primary text-2xl mb-2">What We Offer</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Luxury beauty treatments crafted with precision, love, and artistry — because you deserve nothing less.
          </p>
          <div className="flex justify-center mt-6 gap-1">
            <div className="w-12 h-0.5 bg-primary rounded-full" />
            <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
            <div className="w-1.5 h-0.5 bg-primary/30 rounded-full" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
