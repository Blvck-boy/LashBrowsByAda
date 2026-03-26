import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@/assets/slideshow-1.jpeg";
import slide2 from "@/assets/slideshow-2.jpeg";
import slide3 from "@/assets/slideshow-3.jpeg";
import slide4 from "@/assets/slideshow-4.jpeg";
import slide5 from "@/assets/slideshow-5.jpeg";

type SlideItem = {
  type: "image" | "video";
  src: string;
};

const slides: SlideItem[] = [
  { type: "image", src: slide1 },
  { type: "video", src: "/videos/slideshow-video-1.mp4" },
  { type: "image", src: slide2 },
  { type: "video", src: "/videos/slideshow-video-2.mp4" },
  { type: "image", src: slide3 },
  { type: "video", src: "/videos/slideshow-video-3.mp4" },
  { type: "image", src: slide4 },
  { type: "video", src: "/videos/slideshow-video-4.mp4" },
  { type: "image", src: slide5 },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  };

  const next = () => goTo(current + 1, 1);
  const prev = () => goTo(current - 1, -1);

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const slide = slides[current];
    const delay = slide.type === "video" ? 8000 : 5000;
    timerRef.current = setTimeout(() => next(), delay);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  useEffect(() => {
    if (slides[current].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {slides[current].type === "image" ? (
            <div className="w-full h-full overflow-hidden">
              <motion.img
                src={slides[current].src}
                alt="LashBrows by Ada showcase"
                className="w-full h-full object-cover"
                animate={{ scale: [1, 1.07] }}
                transition={{ duration: 8, ease: "easeInOut" }}
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={slides[current].src}
              autoPlay
              muted
              playsInline
              loop={false}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="script text-primary text-2xl md:text-3xl mb-3"
        >
          Welcome to
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-3"
        >
          LashBrows
          <span className="block text-gradient-pink italic">By Ada</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase mb-10"
        >
          Redefining Beauty
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick("#booking")}
            className="btn-glow text-white font-semibold px-8 py-4 rounded-full text-base tracking-wide"
          >
            Book Appointment
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick("#training")}
            className="glass text-white font-semibold px-8 py-4 rounded-full text-base tracking-wide border border-white/30 hover:border-primary/60 transition-all"
          >
            Become a Trainee
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 glass text-white p-2 md:p-3 rounded-full hover:bg-primary/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 glass text-white p-2 md:p-3 rounded-full hover:bg-primary/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`rounded-full transition-all duration-400 ${
              i === current
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/50" />
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div> */}
    </section>
  );
}
