import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Leaf, Shield } from "lucide-react";
const ProductsSection = () => {
  return <section className="py-12 sm:py-16 md:py-20 bg-muted/50 relative" style={{
    backgroundImage: "url('/lovable-uploads/4a2a8aac-b6f7-4591-94f4-097917a493a4.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
      {/* Double overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/80"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Produkty
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">Používam len tie najkvalitnejšie produkty pre starostlivosť o vaše vlasy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Farmavita Product */}
          <Card className="salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 overflow-hidden rounded-xl">
                <img src="/lovable-uploads/723b5118-c7fb-45b8-8d4a-413279b3428d.png" alt="FarmaVita produkty" className="w-full h-full object-cover" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                Farmavita
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-center">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Prírodné zloženie</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Ochrana vlasov</p>
                </div>
                <div className="text-center">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Profesionálna kvalita</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-2">
                Farmavita je veľmi kvalitný produkt na vlasy, ktorý zabezpečuje optimálnu 
                starostlivosť a ochranu. Ich produkty sú navrhnuté pre profesionálne použitie 
                a zaručujú vynikajúce výsledky pri každom ošetrení.
              </p>
            </CardContent>
          </Card>

          {/* Malibu C Product */}
          <Card className="salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 overflow-hidden rounded-xl">
                <img src="/lovable-uploads/0163f81b-33e2-4396-a80c-3c60a8e00b70.png" alt="Malibu C produkty" className="w-full h-full object-cover" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                Malibu C
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-center">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Ekologické riešenia</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Intenzívna regenerácia</p>
                </div>
                <div className="text-center">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Luxusná starostlivosť</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-2">
                Malibu C predstavuje prémiové riešenie pre kompletnú starostlivosť o vlasy. 
                Tieto produkty poskytujú hlbokú regeneráciu a výživu, ideálne pre poškodené 
                a chemicky ošetrené vlasy s dlhotrvajúcimi výsledkami.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ProductsSection;