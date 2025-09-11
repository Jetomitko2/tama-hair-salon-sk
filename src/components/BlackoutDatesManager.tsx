import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Trash2, Clock } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
interface BlackoutDate {
  id: string;
  date: string;
  time?: string;
  reason?: string;
}
const BlackoutDatesManager = () => {
  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
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
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const addBlackoutDate = async () => {
    if (!selectedDate) return;
    setIsAdding(true);
    try {
      const dateString = format(selectedDate, 'yyyy-MM-dd');

      // Check if combination already exists
      const existing = blackoutDates.find(bd => 
        bd.date === dateString && 
        (bd.time === selectedTime || (!bd.time && !selectedTime))
      );
      if (existing) {
        toast({
          title: "Upozornenie",
          description: selectedTime ? "Tento čas je už zakázaný" : "Tento dátum je už zakázaný",
          variant: "destructive"
        });
        return;
      }
      
      const insertData: any = {
        date: dateString,
        reason: selectedTime ? `Nedostupný čas ${selectedTime}` : 'Nedostupný deň'
      };
      
      if (selectedTime) {
        insertData.time = selectedTime;
      }

      const { error } = await supabase
        .from('blackout_dates')
        .insert([insertData]);
        
      if (error) throw error;
      
      toast({
        title: "Úspech",
        description: selectedTime 
          ? `Čas ${selectedTime} bol úspešne zakázaný` 
          : "Dátum bol úspešne zakázaný"
      });
      
      setSelectedDate(undefined);
      setSelectedTime("");
      fetchBlackoutDates();
    } catch (error) {
      console.error('Error adding blackout date:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa zakázať dátum/čas",
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
          <h3 className="font-medium">Pridať zakázaný dátum/čas</h3>
          <div className="space-y-4">
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
            </div>
            
            <div className="space-y-2">
              <Label>Čas (nepovinné)</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Vyberte čas alebo nechajte prázdne pre celý deň" />
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
              <p className="text-xs text-muted-foreground">
                Ak nevyberiete čas, celý deň bude zakázaný
              </p>
            </div>
            
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
                    {blackoutDate.time && (
                      <Badge variant="secondary" className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {blackoutDate.time}
                      </Badge>
                    )}
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