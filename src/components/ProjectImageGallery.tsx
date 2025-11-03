import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-navy/80 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] bg-navy/95 border-none p-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-none"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-none"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center p-12">
              <img
                src={allImages[currentIndex].image_url}
                alt={allImages[currentIndex].caption || `Project image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Next button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-none"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Caption */}
            {allImages[currentIndex].caption && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-navy/90 text-white px-6 py-3 rounded-none max-w-2xl">
                <p className="text-center">{allImages[currentIndex].caption}</p>
              </div>
            )}

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectImageGallery;
