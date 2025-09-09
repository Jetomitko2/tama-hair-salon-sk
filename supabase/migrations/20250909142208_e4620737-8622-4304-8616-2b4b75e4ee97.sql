-- Fix search_path security issue for functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.generate_reservation_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RES' || LPAD(EXTRACT(EPOCH FROM NOW())::TEXT, 10, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;