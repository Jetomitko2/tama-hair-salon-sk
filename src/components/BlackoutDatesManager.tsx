import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
interface BlackoutDate {
  id: string;
  date: string;
  reason?: string;
}
const BlackoutDatesManager = () => {
  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isAdding, setIsAdding] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchBlackoutDates();
  }, []);
  const fetchBlackoutDates = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blackout_dates').select('*').order('date', {
        ascending: true
      });
      if (error) throw error;
      setBlackoutDates(data || []);
    } catch (error) {
      console.error('Error fetching blackout dates:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa načítať zakázané dátmy",
        variant: "destructive"
      });
    }
  };
  const addBlackoutDate = async () => {
    if (!selectedDate) return;
    setIsAdding(true);
    try {
      const dateString = format(selectedDate, 'yyyy-MM-dd');

      // Check if date already exists
      const existing = blackoutDates.find(bd => bd.date === dateString);
      if (existing) {
        toast({
          title: "Upozornenie",
          description: "Tento dátum je už zakázaný",
          variant: "destructive"
        });
        return;
      }
      const {
        error
      } = await supabase.from('blackout_dates').insert([{
        date: dateString,
        reason: 'Nedostupný'
      }]);
      if (error) throw error;
      toast({
        title: "Úspech",
        description: "Dátum bol úspešne zakázaný"
      });
      setSelectedDate(undefined);
      fetchBlackoutDates();
    } catch (error) {
      console.error('Error adding blackout date:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa zakázať dátum",
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  };
  const removeBlackoutDate = async (id: string) => {
    try {
      const {
        error
      } = await supabase.from('blackout_dates').delete().eq('id', id);
      if (error) throw error;
      toast({
        title: "Úspech",
        description: "Zakázaný dátum bol odstránený"
      });
      fetchBlackoutDates();
    } catch (error) {
      console.error('Error removing blackout date:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa odstrániť zakázaný dátum",
        variant: "destructive"
      });
    }
  };
  const isDateDisabled = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return blackoutDates.some(bd => bd.date === dateString);
  };
  return <Card className="w-full">
      <CardHeader>
        <CardTitle>Správa zakázaných dátumov</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new blackout date */}
        <div className="space-y-4">
          <h3 className="font-medium">Pridať zakázaný dátum</h3>
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd.MM.yyyy", {
                  locale: sk
                }) : "Vyberte dátum"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={isDateDisabled} initialFocus className={cn("p-3 pointer-events-auto")} />
              </PopoverContent>
            </Popover>
            
            <Button onClick={addBlackoutDate} disabled={!selectedDate || isAdding}>
              {isAdding ? "Pridávam..." : "Pridať"}
            </Button>
          </div>
        </div>

        {/* List of existing blackout dates */}
        <div className="space-y-4">
          <h3 className="font-medium">Zakázané dátmy ({blackoutDates.length})</h3>
          {blackoutDates.length === 0 ? <p className="text-muted-foreground">Žiadne zakázané dátumy</p> : <div className="space-y-2">
              {blackoutDates.map(blackoutDate => <div key={blackoutDate.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">
                      {format(new Date(blackoutDate.date), "dd.MM.yyyy", {
                  locale: sk
                })}
                    </Badge>
                    {blackoutDate.reason && <span className="text-sm text-muted-foreground">
                        {blackoutDate.reason}
                      </span>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeBlackoutDate(blackoutDate.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>)}
            </div>}
        </div>
      </CardContent>
    </Card>;
};
export default BlackoutDatesManager;