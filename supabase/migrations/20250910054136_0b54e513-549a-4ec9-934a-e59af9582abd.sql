-- Allow authenticated users to delete reservations
CREATE POLICY "Authenticated users can delete reservations" 
ON public.reservations 
FOR DELETE 
USING (auth.uid() IS NOT NULL);