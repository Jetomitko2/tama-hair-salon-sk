import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Heart, Waves, ShieldCheck } from "lucide-react";
const ServicesSection = () => {
  const services = [{
    icon: Scissors,
    title: "Pánske strihanie",
    description: "Profesionálne strihanie pre mužov všetkých vekových kategórií"
  }, {
    icon: Scissors,
    title: "Dámske strihanie",
    description: "Moderné a klasické strihy pre ženy podľa najnovších trendov"
  }, {
    icon: Palette,
    title: "Melírovanie",
    description: "Kreatívne melírovanie a zvýrazňovanie vlasov"
  }, {
    icon: Scissors,
    title: "Detské strihanie",
    description: "Šetrné a priateľské strihanie pre najmenších"
  }, {
    icon: Palette,
    title: "Farbenie vlasov",
    description: "Profesionálne farbenie používa najkvalitnejšie produkty"
  }, {
    icon: Sparkles,
    title: "Spoločenské účesy",
    description: "Elegantné účesy pre rôzne spoločenské príležitosti"
  }, {
    icon: Heart,
    title: "Svadobné účesy",
    description: "Nezabudnuteľné účesy pre najkrajší deň v živote"
  }, {
    icon: ShieldCheck,
    title: "Čistenie vlasov Malibu C",
    description: "Špecializované ošetrenie pre zdravé a čisté vlasy"
  }, {
    icon: Waves,
    title: "Regeneračné zábaly",
    description: "Intenzívna starostlivosť a regenerácia poškodených vlasov"
  }, {
    icon: Waves,
    title: "Objemová Trvalá",
    description: "Profesionálna objemová trvalá pre krásny a prirodzený objem vlasov"
  }];
  return <section className="py-12 sm:py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">Služby</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">Ponúkam kompletnú paletu kaderníckych služieb pre každého klienta</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => <Card key={index} className="salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <CardContent className="p-4 sm:p-6 text-center">
                <service.icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default ServicesSection;