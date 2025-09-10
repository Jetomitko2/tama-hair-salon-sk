import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
const GallerySection = () => {
  const galleryImages = ["/lovable-uploads/cde560d4-f227-4cf1-a4bf-2625983f178f.png", "/lovable-uploads/ae4c81c8-e177-4364-99c5-f95e7cf5c592.png", "/lovable-uploads/3da40f6d-1288-4925-bdeb-888c0f30feed.png"];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === galleryImages.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };
  return <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Fotogaléria
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">Pozrite si moju prácu a inšpirujte sa pre váš nový vzhľad</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {galleryImages.map((image, index) => <Card key={index} className="overflow-hidden salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up cursor-pointer" style={{
          animationDelay: `${index * 0.2}s`
        }} onClick={() => openLightbox(index)}>
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img src={image} alt={`Účes ${index + 1}`} className="w-full h-full object-cover transition-smooth hover:scale-105 animate-camera-shake" />
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="text-center animate-fade-up">
          <Link to="/galeria">
            <Button size="lg" className="salon-gradient-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 transition-spring hover:scale-105 w-full sm:w-auto">
              Pozrieť ďalej
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
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
                <img src={galleryImages[selectedImageIndex]} alt={`Účes ${selectedImageIndex + 1}`} className="max-w-full max-h-[80vh] object-contain" />
              </div>}

            {/* Image counter */}
            {selectedImageIndex !== null && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};
export default GallerySection;