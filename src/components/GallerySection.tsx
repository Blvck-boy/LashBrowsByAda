import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import slide1 from "@/assets/slideshow-1.jpeg";
import slide2 from "@/assets/slideshow-2.jpeg";
import slide3 from "@/assets/slideshow-3.jpeg";
import slide4 from "@/assets/slideshow-4.jpeg";
import slide5 from "@/assets/slideshow-5.jpeg";

type GalleryItem = {
  id: number;
  type: "image" | "video";
  src: string;
  thumb?: string;
  span?: string;
};

const items: GalleryItem[] = [
  { id: 1, type: "image", src: slide1, span: "row-span-2" },
  { id: 2, type: "image", src: slide2 },
  { id: 3, type: "video", src: "/videos/slideshow-video-1.mp4" },
  { id: 4, type: "image", src: slide3 },
  { id: 5, type: "video", src: "/videos/slideshow-video-2.mp4", span: "row-span-2" },
  { id: 6, type: "image", src: slide4 },
  { id: 7, type: "video", src: "/videos/slideshow-video-3.mp4" },
  { id: 8, type: "image", src: slide5 },
  { id: 9, type: "video", src: "/videos/slideshow-video-4.mp4" },
];

function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-muted ${item.span ?? ""}`}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt="Gallery"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <video
          src={item.src}
          muted
          playsInline
          loop
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {item.type === "video" && (
        <div className="absolute top-3 right-3 glass text-white w-7 h-7 rounded-full flex items-center justify-center">
          <Play size={12} className="text-white fill-white" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div className="w-12 h-12 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/60 flex items-center justify-center">
          {item.type === "video" ? <Play size={16} className="text-white fill-white" /> : <span className="text-white text-lg">✦</span>}
        </div>
      </div>

      {/* Pink glow border */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-primary/60 transition-all duration-400 pointer-events-none" />
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="script text-primary text-2xl mb-2">Our Work</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A glimpse into the beauty we create — every set, every brow, a work of art.
          </p>
          <div className="flex justify-center mt-4 gap-1">
            <div className="w-12 h-0.5 bg-primary rounded-full" />
            <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3">
          {items.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onClick={() => setLightbox(item)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            >
              {lightbox.type === "image" ? (
                <img src={lightbox.src} alt="Gallery enlarged" className="w-full h-full object-contain" />
              ) : (
                <video src={lightbox.src} autoPlay muted loop playsInline controls className="w-full h-full object-contain" />
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 glass text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
