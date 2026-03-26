import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

const socials = [
  {
    label: "Instagram",
    handle: "@lash_browsbyada",
    icon: Instagram,
    href: "https://instagram.com/lash_browsbyada",
    color: "from-pink-500 to-rose-400",
    bg: "bg-gradient-to-br from-pink-500/10 to-rose-400/10",
    border: "border-pink-400/30",
    desc: "Follow for daily inspo & behind-the-scenes magic",
  },
  {
    label: "TikTok",
    handle: "@lash_browsbyada",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
      </svg>
    ),
    href: "https://tiktok.com/@lash_browsbyada",
    color: "from-slate-800 to-slate-700",
    bg: "bg-gradient-to-br from-slate-800/10 to-slate-700/10",
    border: "border-slate-400/30",
    desc: "Watch transformation videos & tutorials",
  },
  {
    label: "WhatsApp",
    handle: "Chat with Ada",
    icon: MessageCircle,
    href: "https://wa.me/2349139198918",
    color: "from-green-500 to-emerald-400",
    bg: "bg-gradient-to-br from-green-500/10 to-emerald-400/10",
    border: "border-green-400/30",
    desc: "DM to book or ask questions directly",
  },
];

export default function SocialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="script text-primary text-2xl mb-2">Stay Connected</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Us Online
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Follow our journey, get inspired, and slide into our DMs for inquiries and bookings.
          </p>
          <div className="flex justify-center mt-4 gap-1">
            <div className="w-12 h-0.5 bg-primary rounded-full" />
            <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group glass-white rounded-2xl p-7 text-center border ${s.border} transition-all duration-400 hover:shadow-pink`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-5 text-white shadow-pink group-hover:scale-110 transition-transform duration-300`}>
                  <Icon />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-1">{s.label}</h3>
                <p className="text-primary text-sm font-medium mb-2">{s.handle}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
              </motion.a>
            );
          })}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-5 font-light">Ready to look stunning? Book directly via WhatsApp!</p>
          <motion.a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
