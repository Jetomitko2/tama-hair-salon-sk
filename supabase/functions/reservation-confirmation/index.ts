import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationData {
  reservationNumber: string;
  fullName: string;
  email: string;
  service: string;
  date: string;
  time: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reservationNumber, fullName, email, service, date, time }: ReservationData = await req.json();
    
    console.log(`Sending confirmation email to: ${email} for reservation: ${reservationNumber}`);

    const emailResponse = await resend.emails.send({
      from: "Salón TAMA <info@tvojadomene.sk>",  // Zmeň na tvoju doménu
      to: [email],
      subject: `Ďakujeme za rezerváciu - ${reservationNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #4CAF50; text-align: center; margin-bottom: 30px;">Ďakujeme za Vašu rezerváciu!</h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Milý/á <strong>${fullName}</strong>,</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Ďakujeme za Vašu rezerváciu <strong>${reservationNumber}</strong> na <strong>${time}</strong>, <strong>${date}</strong>.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Najprv ju musíme prijať. Po prijatí Vám dáme vedieť prostredníctvom e-mailu.
            </p>
            
            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4CAF50;">
              <h3 style="color: #333; margin-top: 0;">Detaily rezervácie:</h3>
              <p style="margin: 8px 0; color: #333;"><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Služba:</strong> ${service}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Dátum:</strong> ${date}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Čas:</strong> ${time}</p>
              <p style="margin: 8px 0; color: #666;"><strong>Stav:</strong> Čaká na potvrdenie</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Ozveме sa Vám čoskoro s potvrdením termínu.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              S pozdravom,<br>
              <strong style="color: #4CAF50;">Tím Salón TAMA</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);