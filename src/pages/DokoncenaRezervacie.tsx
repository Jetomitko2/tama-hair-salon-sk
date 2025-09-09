import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Mail } from "lucide-react";

const DokoncenaRezervacie = () => {
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get('id');

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-background to-muted/50 min-h-screen">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Rezervácia odoslaná
              </h1>
              <p className="text-muted-foreground text-lg">
                Ďakujeme za vašu rezerváciu
              </p>
            </div>

            <Card className="salon-shadow-card">
              <CardHeader>
                <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  Rezervačné číslo: {reservationId}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-primary">
                    Čo sa deje ďalej?
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <span>Rezerváciu musíme potvrdiť</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <span>Napíšeme vám na e-mail s potvrdením</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  Prosím, čakajte na naše potvrdenie e-mailom. 
                  Budeme vás kontaktovať čo najskôr.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export default DokoncenaRezervacie;