-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Anyone can create reservations" 
ON public.reservations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view reservations" 
ON public.reservations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update reservations" 
ON public.reservations 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate reservation number
CREATE OR REPLACE FUNCTION public.generate_reservation_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RES' || LPAD(EXTRACT(EPOCH FROM NOW())::TEXT, 10, '0');
END;
$$ LANGUAGE plpgsql;