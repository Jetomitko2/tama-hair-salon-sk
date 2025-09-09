import { useState } from "react";

const SalonInteriorSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    "/lovable-uploads/4c00f729-d38b-4bb6-bc33-232f721c112d.png",
    "/lovable-uploads/122ddd3b-7833-49e7-a43a-de51e72cc691.png", 
    "/lovable-uploads/7b6e57cc-1d3b-4881-b4c3-7a3e2e66f4e8.png"
  ];

  const shakeAnimations = ["animate-camera-shake", "animate-camera-shake-2", "animate-camera-shake-3"];

  return (
    <section className="py-20 px-4 bg-salon-muted">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-salon-primary">
          Náš Salón
        </h2>
        <p className="text-lg md:text-xl text-salon-primary-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Máme nádherný salón s čistým a príjemným prostredím. Naša kozmetika a profesionálne vybavenie zabezpečujú maximálny komfort počas vašej návštevy.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="bg-white p-6 rounded-full salon-shadow-card transition-smooth hover:salon-shadow-elegant group-hover:scale-105">
                <div className="aspect-square rounded-full overflow-hidden">
                  <img
                    src={image}
                    alt={`Interiér salónu ${index + 1}`}
                    className={`w-full h-full object-cover ${shakeAnimations[index]}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Detail interiéru salónu"
              className="w-full h-auto object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-smooth"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SalonInteriorSection;