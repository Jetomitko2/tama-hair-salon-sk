import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Boli ste zaujatí?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Kontaktujte ma a dohodnite si termín pre váš nový vzhľad<br />
            <span className="text-accent font-medium">Sobota na objednávku</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <Card className="salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up">
            <CardContent className="p-4 sm:p-6 text-center">
              <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Telefón</h3>
              <p className="text-muted-foreground text-sm sm:text-base">0908 989 423</p>
            </CardContent>
          </Card>

          <Card className="salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up animate-delay-200">
            <CardContent className="p-4 sm:p-6 text-center">
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Adresa</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Komenského 1917/73<br />
                Trebišov 075 01<br />
                Slovensko
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up">
          <Link to="/rezervacia" className="w-full sm:w-auto">
            <Button size="lg" className="salon-gradient-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 transition-spring hover:scale-105 w-full">
              Rezervovať termín
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <Link to="/kontakt" className="w-full sm:w-auto">
            <Button size="lg" className="salon-gradient-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 transition-spring hover:scale-105 w-full">
              Kontaktujte ma
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;