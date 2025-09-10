import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, ArrowLeft, Trash2 } from "lucide-react";
import RejectReasonDialog from "@/components/RejectReasonDialog";

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

const AdminDetail = () => {
  const { reservationNumber } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "TAMA-Admin Detail";
    fetchReservation();
  }, [reservationNumber]);

  const fetchReservation = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('reservation_number', reservationNumber)
        .single();

      if (error) throw error;
      setReservation(data);
    } catch (error) {
      console.error('Error fetching reservation:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa načítať rezerváciu",
        variant: "destructive",
      });
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = () => {
    setRejectDialogOpen(true);
  };

  const updateReservationStatus = async (status: 'accepted' | 'rejected', reason?: string) => {
    if (!reservation || processing) return;
    
    try {
      setProcessing(true);

      const updateData = {
        status,
        ...(reason && { rejection_reason: reason })
      };

      const { error } = await supabase
        .from('reservations')
        .update(updateData)
        .eq('id', reservation.id);

      if (error) throw error;

      // Send status email
      const { error: emailError } = await supabase.functions.invoke('reservation-status', {
        body: {
          reservationNumber: reservation.reservation_number,
          fullName: reservation.full_name,
          email: reservation.email,
          service: reservation.service,
          date: new Date(reservation.reservation_date).toLocaleDateString('sk-SK'),
          time: reservation.reservation_time,
          status: status === 'accepted' ? 'confirmed' : 'rejected',
          ...(reason && { rejectionReason: reason })
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }

      setReservation({ ...reservation, status });

      toast({
        title: "Úspech",
        description: `Rezervácia bola ${status === 'accepted' ? 'potvrdená' : 'odmietnutá'}`,
      });
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa aktualizovať rezerváciu",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const deleteReservation = async () => {
    if (!reservation || deleting) return;
    
    try {
      setDeleting(true);
      
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservation.id);

      if (error) throw error;

      toast({
        title: "Úspech",
        description: "Rezervácia bola vymazaná",
      });

      navigate('/admin');
      
    } catch (error: any) {
      console.error('Error deleting reservation:', error);
      toast({
        title: "Chyba",
        description: `Nepodarilo sa vymazať rezerváciu: ${error.message || 'Neznáma chyba'}`,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
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

  if (!reservation) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Rezervácia nenájdená</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Späť na zoznam</span>
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Rezervácia {reservation.reservation_number}</h1>
          <div className="flex items-center space-x-4">
            {getStatusBadge(reservation.status)}
            <Button 
              variant="destructive"
              onClick={deleteReservation}
              disabled={deleting}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>{deleting ? 'Vymazáva sa...' : 'Vymazať'}</span>
            </Button>
          </div>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Detail rezervácie</CardTitle>
            <div className="text-sm text-muted-foreground">
              Vytvorené: {new Date(reservation.created_at).toLocaleString('sk-SK')}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
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
                  onClick={() => updateReservationStatus('accepted')}
                  disabled={processing}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>{processing ? 'Spracováva sa...' : 'Potvrdiť'}</span>
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={handleReject}
                  disabled={processing}
                  className="flex items-center space-x-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>{processing ? 'Spracováva sa...' : 'Odmietnuť'}</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reject Reason Dialog */}
        <RejectReasonDialog
          open={rejectDialogOpen}
          onOpenChange={setRejectDialogOpen}
          onConfirm={(reason) => {
            updateReservationStatus('rejected', reason);
            setRejectDialogOpen(false);
          }}
          loading={processing}
        />
      </div>
    </div>
  );
};

export default AdminDetail;