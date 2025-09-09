import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailRequest {
  reservationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reservationNumber, fullName, email, phone, service, date, time }: ReservationEmailRequest = await req.json();
    
    console.log(`Sending reservation emails for ${reservationNumber} to ${email}`);

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "Salón TAMA <onboarding@resend.dev>",
      to: [email],
      subject: `Ďakujeme za rezerváciu - ${reservationNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4CAF50;">Ďakujeme za Vašu rezerváciu</h1>
          <p>Milý/á ${fullName},</p>
          <p>Ďakujeme za Vašu rezerváciu <strong>${reservationNumber}</strong> na <strong>${time}</strong>, <strong>${date}</strong>.</p>
          <p>Najprv ju musíme prijať. Po prijatí Vám dáme vedieť prostredníctvom e-mailu.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Detaily rezervácie:</h3>
            <p><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
            <p><strong>Služba:</strong> ${service}</p>
            <p><strong>Dátum:</strong> ${date}</p>
            <p><strong>Čas:</strong> ${time}</p>
            <p><strong>Stav:</strong> Čaká na potvrdenie</p>
          </div>
          
          <p>Ozveме sa Vám čoskoro s potvrdením termínu.</p>
          <p>S pozdravom,<br><strong>Tím Salón TAMA</strong></p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending reservation emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);