import Navigation from "@/components/Navigation";

const Gallery = () => {
  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen flex items-center justify-center bg-muted/50">
        <div className="text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Galéria
          </h1>
          <p className="text-xl text-muted-foreground">
            Zatiaľ sa pripravuje
          </p>
        </div>
      </div>
    </>
  );
};

export default Gallery;