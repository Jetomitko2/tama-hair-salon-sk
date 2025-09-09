import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
const Gallery = () => {
  useEffect(() => {
    document.title = "TAMA-Galéria";
  }, []);

  const images = ["/lovable-uploads/0eaa2c21-e754-4651-862d-459408ef6ed7.png", "/lovable-uploads/5611f3aa-bb5c-4ee8-a47b-35fd64d1ddd0.png", "/lovable-uploads/f21df8ea-59d1-4ba5-9b95-37640b11d3ab.png", "/lovable-uploads/72b8cd47-41d7-40bc-90f5-2763ebf5474c.png", "/lovable-uploads/c3f7d468-58c8-42c1-9cc6-8e7e01a2715c.png", "/lovable-uploads/309dc704-f146-411b-af78-e93e93dfa7d5.png", "/lovable-uploads/6a612ac5-b3c8-4138-9a25-eeca575d1bd0.png", "/lovable-uploads/b850ddbb-71db-4a71-9fed-f1d708c55d59.png", "/lovable-uploads/5c83d3bb-0cdd-4cdf-84a6-359bf4d96cd9.png", "/lovable-uploads/518d3ccb-e3ea-41da-b4dc-cd4443228c24.png", "/lovable-uploads/e12b66f3-2399-4144-8de1-e3ade33c6710.png", "/lovable-uploads/92dc3282-a1a1-4b0e-9977-ce1a5dc16140.png", "/lovable-uploads/30b34b35-4578-49fc-8cea-54e479f9e395.png", "/lovable-uploads/5772c3f0-2ce0-474c-8911-b907e6000b48.png", "/lovable-uploads/f19acb85-24dd-40f3-ba31-52c182439ae0.png", "/lovable-uploads/017e506a-0d89-4817-9383-d43fe8a3b6eb.png", "/lovable-uploads/a4c44f18-f1a1-4edd-a4b1-21e1cc793807.png", "/lovable-uploads/57771d74-4d60-4d8f-8ef1-efc1f5f24ada.png", "/lovable-uploads/1649a2f9-b6d9-40b8-89cb-e4ac7804729c.png", "/lovable-uploads/b88db6a2-33ea-4511-a85c-b4a9d131eca7.png", "/lovable-uploads/10e6f8a5-ebbf-4920-b601-cf02700fcaa9.png", "/lovable-uploads/1939aa3d-ef12-450e-b704-fc0b0c35df5b.png", "/lovable-uploads/e67e5587-3504-4293-ac79-1de8ca6773a0.png", "/lovable-uploads/124a8784-418e-4c17-a07c-bc826983f1ef.png", "/lovable-uploads/4b6f2019-bb99-436b-9bf8-c1742c26a04b.png", "/lovable-uploads/03dbcf1a-b666-4ef8-b902-f02f6f4dbe71.png", "/lovable-uploads/d0c42376-9bb8-4215-874c-219e3cab2bfb.png", "/lovable-uploads/b54345e8-6ab6-44b3-8883-6151f8e56f37.png", "/lovable-uploads/ee8d3701-c454-4fd6-bf28-c59ed76bae0b.png", "/lovable-uploads/400d47b9-74ed-44b6-ac66-08ce9f77b715.png", "/lovable-uploads/b78fe421-1e5e-4222-af2e-3e0272ec86c5.png", "/lovable-uploads/0f4fe567-f3e6-4ac7-b52d-5fe15d48d4fe.png", "/lovable-uploads/5d1d1eba-b89f-4918-ba96-1aea775348cf.png", "/lovable-uploads/100af8d8-c0cf-40a8-a835-3411c5f9fad2.png", "/lovable-uploads/c6113c6f-dc22-4dc0-8be0-9a614f02ef6c.png", "/lovable-uploads/6f9e506c-99d4-4608-a84f-86197db536e2.png", "/lovable-uploads/a1d9d823-ece2-42e1-9e99-5cb8ca2c088a.png"];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const getCameraShakeClass = (index: number) => {
    const shakeClasses = ['animate-camera-shake', 'animate-camera-shake-2', 'animate-camera-shake-3', 'animate-camera-shake-4'];
    return shakeClasses[index % 4];
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
  return <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-12 sm:mb-16 animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">Galéria</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">Pozrite si moju prácu a inšpirujte sa pre váš nový vzhľad</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {images.map((image, index) => <div key={index} className="overflow-hidden rounded-lg salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up cursor-pointer" style={{
            animationDelay: `${index * 0.1}s`
          }} onClick={() => openLightbox(index)}>
                <div className="aspect-square overflow-hidden">
                  <img src={image} alt={`Účes ${index + 1}`} className={`w-full h-full object-cover transition-smooth hover:scale-105 ${getCameraShakeClass(index)}`} />
                </div>
              </div>)}
          </div>
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
                <img src={images[selectedImageIndex]} alt={`Účes ${selectedImageIndex + 1}`} className="max-w-full max-h-[80vh] object-contain" />
              </div>}

            {/* Image counter */}
            {selectedImageIndex !== null && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {images.length}
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Gallery;