import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { sk } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Rezervacia = () => {
  useEffect(() => {
    document.title = "TAMA-Rezervácia";
    fetchBlackoutDates();
  }, []);

  const fetchBlackoutDates = async () => {
    try {
      const { data, error } = await supabase
        .from('blackout_dates')
        .select('date');
      
      if (error) throw error;
      
      setBlackoutDates(data.map(item => item.date));
    } catch (error) {
      console.error('Error fetching blackout dates:', error);
    }
  };

  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    date: undefined as Date | undefined,
    time: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blackoutDates, setBlackoutDates] = useState<string[]>([]);

  const services = [
    "Stríhanie na sucho krátke vlasy",
    "Stríhanie na sucho polodlhé vlasy",
    "Stríhanie na sucho dlhé vlasy",
    "Strihanie fúkaná krátke vlasy",
    "Strihanie fúkaná polodlhé vlasy",
    "Strihanie fúkaná dlhé vlasy",
    "Farbenie krátke vlasy",
    "Farbenie polodlhé vlasy",
    "Farbenie dlhé vlasy",
    "Trvalá krátke vlasy",
    "Trvalá polodlhé vlasy",
    "Trvalá dlhé vlasy",
    "Čistenie Malibu C krátke",
    "Čistenie Malibu C polodlhé",
    "Čistenie Malibu C dlhé",
    "Melírovanie",
    "Detské strihanie",
    "Spoločenské účesy",
    "Svadobné účesy",
    "Regeneračné zábaly"
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const today = startOfDay(new Date());
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Disable past dates, Sundays, and blackout dates
    return date < today || day === 0 || blackoutDates.includes(dateString);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service || !formData.date || !formData.time) {
      toast({
        title: "Chyba",
        description: "Všetky polia sú povinné",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate reservation number
      const reservationNumber = `RES${Date.now()}`;
      
      // Insert reservation into database
      const { data, error } = await supabase
        .from('reservations')
        .insert([{
          reservation_number: reservationNumber,
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          reservation_date: format(formData.date, 'yyyy-MM-dd'),
          reservation_time: formData.time,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
      await supabase.functions.invoke('reservation-confirmation', {
        body: {
          reservationNumber,
          fullName: formData.fullName,
          email: formData.email,
          service: formData.service,
          date: format(formData.date, 'dd.MM.yyyy', { locale: sk }),
          time: formData.time
        }
      });

      // Navigate to confirmation page
      navigate(`/dokoncena-rezervacia?id=${reservationNumber}`);
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa vytvoriť rezerváciu. Skúste to znovu.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-muted/50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4">
                Rezervácia
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg px-2">
                Rezervujte si termín u nás jednoducho online
              </p>
            </div>

            <Card className="salon-shadow-card">
              <CardHeader>
                <CardTitle className="text-center text-primary text-lg sm:text-xl">
                  Vyplňte rezervačný formulár
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Celé meno *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Vaše celé meno"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefónne číslo *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+421 XXX XXX XXX"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="vas@email.sk"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Služba *</Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte službu" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dátum *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "dd.MM.yyyy", { locale: sk }) : "Vyberte dátum"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                          disabled={isDateDisabled}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Čas *</Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte čas" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-3 sm:py-2 text-base sm:text-sm" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Rezervujem..." : "Rezervovať"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export default Rezervacia;