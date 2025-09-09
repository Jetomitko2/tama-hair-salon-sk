const SalonInteriorSection = () => {
  const images = ["/lovable-uploads/4c00f729-d38b-4bb6-bc33-232f721c112d.png", "/lovable-uploads/122ddd3b-7833-49e7-a43a-de51e72cc691.png", "/lovable-uploads/7b6e57cc-1d3b-4881-b4c3-7a3e2e66f4e8.png"];
  const shakeAnimations = ["animate-camera-shake", "animate-camera-shake-2", "animate-camera-shake-3"];
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-salon-muted">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-salon-primary">Galéria Kaderníctva</h2>
        <p className="text-base sm:text-lg md:text-xl text-salon-primary-light max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">Mám salón s čistým a príjemným prostredím. Moja kozmetika a profesionálne vybavenie zabezpečujú maximálny komfort počas vašej návštevy.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {images.map((image, index) => <div key={index} className="group">
              <div className="bg-white p-4 sm:p-6 rounded-full salon-shadow-card transition-smooth hover:salon-shadow-elegant group-hover:scale-105">
                <div className="aspect-square rounded-full overflow-hidden">
                  <img src={image} alt={`Interiér salónu ${index + 1}`} className={`w-full h-full object-cover ${shakeAnimations[index]}`} />
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default SalonInteriorSection;