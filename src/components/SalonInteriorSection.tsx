import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const SalonInteriorSection = () => {
  const images = ["/lovable-uploads/4c00f729-d38b-4bb6-bc33-232f721c112d.png", "/lovable-uploads/122ddd3b-7833-49e7-a43a-de51e72cc691.png", "/lovable-uploads/7b6e57cc-1d3b-4881-b4c3-7a3e2e66f4e8.png"];
  const shakeAnimations = ["animate-camera-shake", "animate-camera-shake-2", "animate-camera-shake-3"];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-salon-muted">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-salon-primary">Galéria Kaderníctva</h2>
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {images.map((image, index) => <div key={index} className="group cursor-pointer" onClick={() => openLightbox(index)}>
              <div className="bg-white p-4 sm:p-6 rounded-full salon-shadow-card transition-smooth hover:salon-shadow-elegant group-hover:scale-105">
                <div className="aspect-square rounded-full overflow-hidden">
                  <img src={image} alt={`Interiér salónu ${index + 1}`} className={`w-full h-full object-cover ${shakeAnimations[index]}`} />
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          <div className="relative">
            {/* Close button */}
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10 text-white hover:bg-white/20" onClick={closeLightbox}>
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20" onClick={goToPrevious}>
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20" onClick={goToNext}>
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image */}
            {selectedImageIndex !== null && <div className="flex items-center justify-center min-h-[80vh]">
                <img src={images[selectedImageIndex]} alt={`Interiér salónu ${selectedImageIndex + 1}`} className="max-w-full max-h-[80vh] object-contain" />
              </div>}

            {/* Image counter */}
            {selectedImageIndex !== null && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {images.length}
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};
export default SalonInteriorSection;