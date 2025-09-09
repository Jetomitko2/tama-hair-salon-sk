import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Phone, MapPin, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen bg-muted/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Radi sa o vás postaráme. Kontaktujte nás alebo si dohodnite termín
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Otváracie hodiny */}
            <Card className="salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-primary">Otváracie hodiny</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pondelok</span>
                  <span className="font-semibold">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Utorok</span>
                  <span className="font-semibold">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Streda</span>
                  <span className="font-semibold">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Štvrtok</span>
                  <span className="font-semibold">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Piatok</span>
                  <span className="font-semibold">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-muted-foreground">Sobota</span>
                  <span className="text-red-500">Zatvorené</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Nedeľa</span>
                  <span className="text-red-500">Zatvorené</span>
                </div>
              </CardContent>
            </Card>

            {/* Telefón */}
            <Card className="salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up animate-delay-200">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-primary">Telefónny kontakt</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <a 
                  href="tel:+421908989423" 
                  className="text-2xl font-bold text-accent hover:text-salon-primary-light transition-smooth"
                >
                  0908 989 423
                </a>
                <p className="text-muted-foreground mt-4">
                  Zavolajte nám pre objednanie termínu alebo informácie o našich službách
                </p>
              </CardContent>
            </Card>

            {/* Adresa */}
            <Card className="salon-shadow-elegant hover:salon-shadow-card transition-spring hover:-translate-y-2 animate-fade-up animate-delay-400 md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-primary">Naša adresa</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <address className="not-italic text-lg leading-relaxed">
                  <strong>Komenského 1917/73</strong><br />
                  <strong>075 01 Trebišov</strong><br />
                  <strong>Slovensko</strong>
                </address>
                <p className="text-muted-foreground mt-4">
                  Nachádzame sa v centre Trebišova, ľahko dostupní pešo aj autom
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dodatočné informácie */}
          <div className="mt-16 text-center animate-fade-up">
            <Card className="max-w-2xl mx-auto salon-shadow-card">
              <CardHeader>
                <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-primary">Dôležité informácie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Pre zaistenie najlepšej služby odporúčame dohodnúć si termín vopred. 
                  V prípade potreby zmeny termínu nás prosím kontaktujte aspoň 24 hodín vopred.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;