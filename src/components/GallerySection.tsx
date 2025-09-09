import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GallerySection = () => {
  const galleryImages = [
    "/lovable-uploads/cde560d4-f227-4cf1-a4bf-2625983f178f.png",
    "/lovable-uploads/ae4c81c8-e177-4364-99c5-f95e7cf5c592.png", 
    "/lovable-uploads/3da40f6d-1288-4925-bdeb-888c0f30feed.png"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Fotogaléria
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pozrite si našu prácu a inšpirujte sa pre váš nový vzhľad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {galleryImages.map((image, index) => (
            <Card 
              key={index} 
              className="overflow-hidden salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt={`Účes ${index + 1}`}
                    className="w-full h-full object-cover transition-smooth hover:scale-105 animate-camera-shake"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <Link to="/galeria">
            <Button size="lg" className="salon-gradient-primary text-white font-semibold px-8 py-3 transition-spring hover:scale-105">
              Pozrieť ďalej
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;