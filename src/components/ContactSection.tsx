import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Boli ste zaujatí?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kontaktujte ma a dohodnite si termín pre váš nový vzhľad<br />
            <span className="text-accent font-medium">Sobota na objednávku</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-primary">Telefón</h3>
              <p className="text-muted-foreground">0908 989 423</p>
            </CardContent>
          </Card>

          <Card className="salon-shadow-card hover:salon-shadow-elegant transition-spring hover:-translate-y-2 animate-fade-up animate-delay-200">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-primary">Adresa</h3>
              <p className="text-muted-foreground">
                Komenského 1917/73<br />
                Trebišov 075 01<br />
                Slovensko
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
          <Link to="/rezervacia">
            <Button size="lg" className="salon-gradient-primary text-white font-semibold px-8 py-3 transition-spring hover:scale-105">
              Rezervovať termín
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/kontakt">
            <Button size="lg" className="salon-gradient-primary text-white font-semibold px-8 py-3 transition-spring hover:scale-105">
              Kontaktujte ma
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;