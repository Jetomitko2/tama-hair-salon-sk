import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Heart, Waves, ShieldCheck } from "lucide-react";

const ServicesSection = () => {
  const services = [
    { icon: Scissors, title: "Pánske strihanie", description: "Profesionálne strihanie pre mužov všetkých vekových kategórií" },
    { icon: Scissors, title: "Dámske strihanie", description: "Moderné a klasické strihy pre ženy podľa najnovších trendov" },
    { icon: Palette, title: "Melírovanie", description: "Kreatívne melírovanie a zvýrazňovanie vlasov" },
    { icon: Scissors, title: "Detské strihanie", description: "Šetrné a priateľské strihanie pre najmenších" },
    { icon: Palette, title: "Farbenie vlasov", description: "Profesionálne farbenie používa najkvalitnejšie produkty" },
    { icon: Sparkles, title: "Spoločenské účesy", description: "Elegantné účesy pre rôzne spoločenské príležitosti" },
    { icon: Heart, title: "Svadobné účesy", description: "Nezabudnuteľné účesy pre najkrajší deň v živote" },
    { icon: ShieldCheck, title: "Čistenie vlasov Malibu C", description: "Špecializované ošetrenie pre zdravé a čisté vlasy" },
    { icon: Waves, title: "Regeneračné zábaly", description: "Intenzívna starostlivosť a regenerácia poškodených vlasov" },
    { icon: Waves, title: "Objemová Trvalá", description: "Profesionálna objemová trvalá pre krásny a prirodzený objem vlasov" }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Naše služby
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ponúkame kompletnú paletu kadernícka služieb pre každého klienta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <service.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;