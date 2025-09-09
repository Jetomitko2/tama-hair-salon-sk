import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, LogOut, Eye } from "lucide-react";

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
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    console.log('Fetching reservations...');
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Reservations query result:', { data, error });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      console.log('Fetched reservations:', data?.length || 0);
      setReservations(data || []);
    } catch (error: any) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Chyba",
        description: `Nepodarilo sa načítať rezervácie: ${error.message || 'Neznáma chyba'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: 'accepted' | 'rejected') => {
    if (processingId) return;
    
    console.log('=== UPDATING RESERVATION STATUS ===');
    console.log('ID:', id);
    console.log('Status:', status);
    console.log('ProcessingId:', processingId);
    
    try {
      setProcessingId(id);
      
      const reservation = reservations.find(res => res.id === id);
      if (!reservation) {
        console.error('Rezervácia nenájdená:', id);
        throw new Error('Rezervácia nenájdená');
      }

      console.log('Found reservation:', reservation);
      console.log('About to update with status:', status);

      // Update status in database with explicit values
      const updateData = { status: status };
      console.log('Update data:', updateData);

      const { data, error } = await supabase
        .from('reservations')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      console.log('Database response - data:', data);
      console.log('Database response - error:', error);

      if (error) {
        console.error('Database update error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Database updated successfully:', data);

      // Update local state
      setReservations(prev => 
        prev.map(res => 
          res.id === id ? { ...res, status } : res
        )
      );

      // Send status email
      console.log('Sending status email...');
      try {
        const emailStatus = status === 'accepted' ? 'confirmed' : 'rejected';
        console.log('Email status:', emailStatus);
        
        const { data: emailData, error: emailError } = await supabase.functions.invoke('reservation-status', {
          body: {
            reservationNumber: reservation.reservation_number,
            fullName: reservation.full_name,
            email: reservation.email,
            service: reservation.service,
            date: new Date(reservation.reservation_date).toLocaleDateString('sk-SK'),
            time: reservation.reservation_time,
            status: emailStatus
          }
        });

        if (emailError) {
          console.error('Email error:', emailError);
        } else {
          console.log('Email sent successfully:', emailData);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }

      toast({
        title: "Úspech",
        description: `Rezervácia bola ${status === 'accepted' ? 'potvrdená' : 'odmietnutá'}`,
      });
      
      console.log('=== STATUS UPDATE COMPLETED SUCCESSFULLY ===');
      
    } catch (error: any) {
      console.error('=== ERROR UPDATING RESERVATION ===');
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      toast({
        title: "Chyba",
        description: `Nepodarilo sa aktualizovať rezerváciu: ${error.message || 'Neznáma chyba'}`,
        variant: "destructive",
      });
    } finally {
      console.log('=== FINALLY BLOCK - RESETTING PROCESSING ID ===');
      setProcessingId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Správa rezervácií</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Odhlásiť sa</span>
          </Button>
        </div>
        
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
                        onClick={() => updateReservationStatus(reservation.id, 'accepted')}
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

                  <div className="flex justify-end pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/admin/${reservation.reservation_number}`)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Detail</span>
                    </Button>
                  </div>
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