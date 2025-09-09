import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const images = [
    "/lovable-uploads/da10607d-2ff9-4699-9e72-8462b5eec567.png",
    "/lovable-uploads/cde560d4-f227-4cf1-a4bf-2625983f178f.png",
    "/lovable-uploads/ae4c81c8-e177-4364-99c5-f95e7cf5c592.png",
    "/lovable-uploads/8efab820-a2e7-4539-a83f-381bea4dff58.png",
    "/lovable-uploads/b0c9de2a-f8b3-4f2d-9240-b523abc39694.png"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => {
        const shakeAnimations = [
          "animate-camera-shake",
          "animate-camera-shake-2", 
          "animate-camera-shake-3",
          "animate-camera-shake-4",
          "animate-camera-shake"
        ];
        return (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={image} 
              alt={`Účes ${index + 1}`} 
              className={`w-full h-full object-cover ${shakeAnimations[index]}`} 
            />
          </div>
        );
      })}

      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-4xl px-4 sm:px-6 text-white animate-fade-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            Účesový Salón TAMA
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-6 sm:mb-8 px-2">
            Moje meno je Tamara. Pracujem ako kaderníčka už viac ako 20 rokov. Mám bohaté skúsenosti v starostlivosti o vlasy a tvorbe krásnych účesov pre každú príležitosť.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link to="/rezervacia">
              <Button size="lg" className="salon-gradient-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 transition-spring hover:scale-105 backdrop-blur-sm w-full sm:w-auto">
                Rezervovať termín
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentImage(index)} 
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentImage ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;