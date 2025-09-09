import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Leaf, Shield } from "lucide-react";
const ProductsSection = () => {
  return <section className="py-12 sm:py-16 md:py-20 bg-muted/50 relative" style={{
    backgroundImage: "url('/lovable-uploads/8d3a35ed-42c1-4dd6-9d7f-bfc5889f0972.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/80"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Produkty
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">Používam len tie najkvalitnejšie produkty pre starostlivosť o vaše vlasy</p>
        </div>

        <div className="flex justify-center">
          <Card className="max-w-2xl salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up bg-background/95 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 overflow-hidden rounded-xl">
                <img src="/lovable-uploads/2f040f4c-536a-44a1-8200-8e52e55944b8.png" alt="FarmaVita produkty" className="w-full h-full object-cover" />
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
        </div>
      </div>
    </section>;
};
export default ProductsSection;