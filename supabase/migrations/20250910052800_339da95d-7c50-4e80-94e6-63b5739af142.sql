-- Create blackout_dates table for managing unavailable dates
CREATE TABLE public.blackout_dates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.blackout_dates ENABLE ROW LEVEL SECURITY;

-- Create policies for blackout_dates
CREATE POLICY "Anyone can view blackout dates" 
ON public.blackout_dates 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage blackout dates" 
ON public.blackout_dates 
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Add rejection_reason column to reservations table
ALTER TABLE public.reservations 
ADD COLUMN rejection_reason TEXT;