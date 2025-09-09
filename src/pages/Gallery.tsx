import Navigation from "@/components/Navigation";

const Gallery = () => {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              "/lovable-uploads/ac773ffc-759f-444a-bd4c-c1fd1e2a2386.png",
              "/lovable-uploads/ee838e0c-d432-4d22-bb42-cc28918a930d.png",
              "/lovable-uploads/d4ffd516-7894-4a13-a78c-79228f2410f1.png",
              "/lovable-uploads/57b8700d-da00-4b6f-acad-a679804fc311.png",
              "/lovable-uploads/d3a99d09-cb34-4f71-ab3a-6599801060b1.png",
              "/lovable-uploads/439cb024-3f88-4489-b031-b6af0987f5a3.png",
              "/lovable-uploads/1edd7fe6-3abf-44e5-a6b0-612d3d2a913b.png",
              "/lovable-uploads/bc3537ba-c4bf-4a27-9513-00850307aa17.png",
              "/lovable-uploads/a68aba30-72b8-4599-b63d-0c13670d1e41.png",
              "/lovable-uploads/098232cd-29c5-4057-aae9-205b1b4533d8.png"
            ].map((image, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-lg salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
    </>
  );
};

export default Gallery;