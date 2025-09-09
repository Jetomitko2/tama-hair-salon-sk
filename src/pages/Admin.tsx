import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle } from "lucide-react";

interface Reservation {
  id: string;
  reservation_number: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  reservation_date: string;
  reservation_time: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa načítať rezervácie",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: 'confirmed' | 'rejected') => {
    if (processingId) return; // Prevent multiple simultaneous requests
    
    try {
      console.log("=== ADMIN: Starting reservation update ===");
      console.log("Reservation ID:", id, "New status:", status);
      
      setProcessingId(id);
      
      // Get reservation details before updating
      const reservation = reservations.find(res => res.id === id);
      if (!reservation) throw new Error('Rezervácia nenájdená');

      console.log("Found reservation:", reservation);

      // Update status in database first
      console.log("Updating database...");
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error("Database update error:", error);
        throw error;
      }
      
      console.log("Database updated successfully");

      // Update UI immediately
      setReservations(prev => 
        prev.map(res => 
          res.id === id ? { ...res, status } : res
        )
      );

      console.log("UI updated, now sending email...");

      // Send email in background (don't wait for it to complete)
      supabase.functions.invoke('send-status-email', {
        body: {
          reservationNumber: reservation.reservation_number,
          fullName: reservation.full_name,
          email: reservation.email,
          service: reservation.service,
          date: new Date(reservation.reservation_date).toLocaleDateString('sk-SK'),
          time: reservation.reservation_time,
          status
        }
      }).then(emailResponse => {
        console.log("Email function response:", emailResponse);
        if (emailResponse.error) {
          console.error('Error sending status email:', emailResponse.error);
          toast({
            title: "Upozornenie",
            description: `Rezervácia bola ${status === 'confirmed' ? 'potvrdená' : 'odmietnutá'}, ale email sa nepodarilo poslať`,
            variant: "destructive",
          });
        } else {
          console.log("Email sent successfully!");
        }
      }).catch(emailError => {
        console.error("Email function error:", emailError);
      });

      toast({
        title: "Úspech",
        description: `Rezervácia bola ${status === 'confirmed' ? 'potvrdená' : 'odmietnutá'}`,
      });
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa aktualizovať rezerváciu",
        variant: "destructive",
      });
    } finally {
      console.log("=== ADMIN: Finished reservation update ===");
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 text-white">Potvrdená</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Odmietnutá</Badge>;
      default:
        return <Badge variant="outline">Čaká na potvrdenie</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Načítavanie...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Správa rezervácií</h1>
        
        <div className="grid gap-6">
          {reservations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Žiadne rezervácie</p>
              </CardContent>
            </Card>
          ) : (
            reservations.map((reservation) => (
              <Card key={reservation.id} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center space-x-4">
                    <CardTitle className="text-xl">
                      {reservation.reservation_number}
                    </CardTitle>
                    {getStatusBadge(reservation.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(reservation.created_at).toLocaleString('sk-SK')}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium">{reservation.full_name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{reservation.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{reservation.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Služba:</span>
                      <span>{reservation.service}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{new Date(reservation.reservation_date).toLocaleDateString('sk-SK')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{reservation.reservation_time}</span>
                    </div>
                  </div>
                  
                  {reservation.status === 'pending' && (
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                        disabled={processingId === reservation.id}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>{processingId === reservation.id ? 'Spracováva sa...' : 'Potvrdiť'}</span>
                      </Button>
                      
                      <Button 
                        variant="destructive"
                        onClick={() => updateReservationStatus(reservation.id, 'rejected')}
                        disabled={processingId === reservation.id}
                        className="flex items-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>{processingId === reservation.id ? 'Spracováva sa...' : 'Odmietnuť'}</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;