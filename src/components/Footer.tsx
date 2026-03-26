import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "Training", href: "#training" },
  { label: "Gallery", href: "#gallery" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-dark text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={brandLogo} alt="LashBrows By Ada" className="h-24 w-auto object-contain mb-4" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Redefining beauty one lash at a time. Premium lash extensions and brow services delivered with love and artistry.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/lashbrows_byada"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Instagram size={16} />
              </motion.a>
              <motion.a
                href="https://tiktok.com/@lashbrows_byada"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://wa.me/2349139198918"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={16} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-white/50 text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Phone size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+2349139198918" className="hover:text-primary transition-colors">+234 913 919 8918</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Mail size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@lashbrowsbyada.com" className="hover:text-primary transition-colors">
                  hello@lashbrowsbyada.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} LashBrows By Ada. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with <span className="text-primary">♥</span> for luxury beauty
          </p>
        </div>
      </div>
    </footer>
  );
}
