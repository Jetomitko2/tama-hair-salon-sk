import { Card, CardContent } from "@/components/ui/card";
import { Crown, Award, Heart } from "lucide-react";

const StaffSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Náš tým
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Spoznajte našich skúsených profesionálov
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="max-w-md salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up">
            <CardContent className="p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-salon-accent to-salon-primary-light rounded-full mx-auto mb-6 flex items-center justify-center">
                <Crown className="h-16 w-16 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-2">
                Tamara Gáborová
              </h3>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">Majiteľka & Kaderníčka</span>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-5 w-5 text-salon-primary-light" />
                  <span>Viac ako 20 rokov skúseností</span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-salon-primary-light" />
                  <span>Špecializácia na všetky typy služieb</span>
                </div>
              </div>
              
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                S vášňou pre krásu a dlhoročnými skúsenosťami vytváram účesy, 
                ktoré zdôraznia vašu prirodzenú krásu a osobnosť.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;