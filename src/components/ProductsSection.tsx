import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Leaf, Shield } from "lucide-react";

const ProductsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Produkty
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Používame len tie najkvalitnejšie produkty pre starostlivosť o vaše vlasy
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="max-w-2xl salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-salon-accent to-salon-primary-light rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-4">
                Farmavita
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Leaf className="h-8 w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Prírodné zloženie</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Ochrana vlasov</p>
                </div>
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-salon-primary-light mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Profesionálna kvalita</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Farmavita je veľmi kvalitný produkt na vlasy, ktorý zabezpečuje optimálnu 
                starostlivosť a ochranu. Ich produkty sú navrhnuté pre profesionálne použitie 
                a zaručujú vynikajúce výsledky pri každom ošetrení.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;