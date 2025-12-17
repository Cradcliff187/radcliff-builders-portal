import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectImage {
  id: string;
  image_url: string;
  caption?: string;
  display_order: number;
}

interface ProjectImageGalleryProps {
  images: ProjectImage[];
  primaryImage?: string;
}

const ProjectImageGallery = ({ images, primaryImage }: ProjectImageGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Combine primary image with gallery images
  const allImages = primaryImage 
    ? [{ id: 'primary', image_url: primaryImage, display_order: -1 }, ...images]
    : images;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (lightboxOpen && thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [currentIndex, lightboxOpen]);

  if (allImages.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {allImages.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-video overflow-hidden rounded-none cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.image_url}
              alt={image.caption || `Project image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300" />
            
            {/* Expand Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div className="w-12 h-12 bg-white flex items-center justify-center shadow-lg">
                <Expand className="w-6 h-6 text-secondary" />
              </div>
            </div>
            
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-navy/80 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="w-screen h-screen max-w-none bg-navy/95 border-none p-0 overflow-hidden md:w-[98vw] md:h-[98vh] md:max-w-7xl">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full w-10 h-10 md:top-4 md:right-4 md:rounded-none"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </Button>

            {/* Previous button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full md:rounded-none w-12 h-12 md:w-auto md:h-auto"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </Button>

            {/* Image with crossfade animation */}
            <div className="absolute inset-0 flex items-center justify-center p-2 pb-28 sm:p-4 sm:pb-32 md:p-8 md:pb-36 lg:p-12 lg:pb-40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={allImages[currentIndex].image_url}
                  alt={allImages[currentIndex].caption || `Project image ${currentIndex + 1}`}
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Next button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full md:rounded-none w-12 h-12 md:w-auto md:h-auto"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </Button>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-20 left-0 right-0 z-40 bg-navy/80 backdrop-blur-sm py-3 px-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center max-w-full">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    ref={(el) => (thumbnailRefs.current[index] = el)}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 overflow-hidden transition-all duration-200 rounded-none ${
                      index === currentIndex 
                        ? "border-2 border-secondary brightness-100" 
                        : "border-2 border-transparent brightness-75 hover:brightness-90"
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            {allImages[currentIndex].caption && (
              <div className="absolute bottom-36 left-2 right-2 sm:bottom-36 sm:left-4 sm:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 bg-navy/95 text-white px-3 py-2 sm:px-4 md:px-6 md:py-3 rounded-none max-w-full md:max-w-3xl backdrop-blur-sm z-50">
                <p className="text-center text-xs leading-tight sm:text-sm md:text-base md:leading-relaxed line-clamp-3 md:line-clamp-2">
                  {allImages[currentIndex].caption}
                </p>
              </div>
            )}

            {/* Counter */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-white text-xs md:text-sm bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectImageGallery;
