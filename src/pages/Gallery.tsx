import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Gallery = () => {
  const images = [
    "/lovable-uploads/ac773ffc-759f-444a-bd4c-c1fd1e2a2386.png",
    "/lovable-uploads/ee838e0c-d432-4d22-bb42-cc28918a930d.png",
    "/lovable-uploads/d4ffd516-7894-4a13-a78c-79228f2410f1.png",
    "/lovable-uploads/57b8700d-da00-4b6f-acad-a679804fc311.png",
    "/lovable-uploads/d3a99d09-cb34-4f71-ab3a-6599801060b1.png",
    "/lovable-uploads/439cb024-3f88-4489-b031-b6af0987f5a3.png",
    "/lovable-uploads/1edd7fe6-3abf-44e5-a6b0-612d3d2a913b.png",
    "/lovable-uploads/bc3537ba-c4bf-4a27-9513-00850307aa17.png",
    "/lovable-uploads/a68aba30-72b8-4599-b63d-0c13670d1e41.png",
    "/lovable-uploads/098232cd-29c5-4057-aae9-205b1b4533d8.png",
    "/lovable-uploads/9c385286-52f1-40d9-98d5-e6b672530de0.png",
    "/lovable-uploads/72906b94-c65c-4204-9896-136b7ba46020.png",
    "/lovable-uploads/8ac92f97-9f8a-4376-a221-3751222cdca2.png",
    "/lovable-uploads/62f757f5-2323-46bf-914e-eeac1db30dc6.png",
    "/lovable-uploads/836dde04-d5da-4691-8bf5-66c08f887191.png",
    "/lovable-uploads/ce1aa67f-c837-499b-b340-9cab1ed9a952.png",
    "/lovable-uploads/ba4dce19-c1b4-4ca2-8596-6a8842f5994f.png",
    "/lovable-uploads/8967f0f9-4781-43bd-98e1-d65cc24438d8.png",
    "/lovable-uploads/8fe0296c-96a4-48d5-bb56-ea76e28f3385.png",
    "/lovable-uploads/1c1839f2-318f-4179-9925-8ac27518b485.png",
    "/lovable-uploads/8f7b0c8e-a598-4d7a-bf16-4365aef7c0f3.png",
    "/lovable-uploads/a7f820ad-9b34-43c3-a303-9f389c6f57e4.png"
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(25); // Default position at 25%
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderDrag = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Clamp between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      const clampedPercentage = Math.max(0, Math.min(100, percentage));
      setSliderPosition(clampedPercentage);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

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

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Naša galéria
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pozrite si našu prácu a inšpirujte sa pre váš nový vzhľad
            </p>
          </div>

          {/* Image Comparison Slider */}
          <div className="mb-16 animate-fade-up">
            <div 
              ref={sliderRef}
              className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded-lg cursor-ew-resize select-none"
              onClick={handleSliderDrag}
            >
              {/* First Image (Right side - visible when slider is to the right) */}
              <div className="absolute inset-0">
                <img
                  src="/lovable-uploads/f5a1afcf-fb43-4534-ac61-086cdd0dcdbc.png"
                  alt="Účes - pred"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
              
              {/* Second Image (Left side - visible when slider is to the left) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="/lovable-uploads/0c2a7ab3-61e4-48b3-990f-04284622dc90.png"
                  alt="Účes - po"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
              
              {/* Draggable Divider */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
                  <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-lg salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt={`Účes ${index + 1}`}
                    className="w-full h-full object-cover transition-smooth hover:scale-105 animate-camera-shake"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image */}
            {selectedImageIndex !== null && (
              <div className="flex items-center justify-center min-h-[80vh]">
                <img
                  src={images[selectedImageIndex]}
                  alt={`Účes ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            )}

            {/* Image counter */}
            {selectedImageIndex !== null && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;