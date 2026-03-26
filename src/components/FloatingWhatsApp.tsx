import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/2348000000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="floating-wa"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} className="text-white fill-white" />
      {/* Pulse ring */}
      <motion.span
        animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-[#25D366]"
      />
    </motion.a>
  );
}
