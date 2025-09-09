import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailRequest {
  reservationNumber: string;
  fullName: string;
  email: string;
  service: string;
  date: string;
  time: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reservationNumber, fullName, email, service, date, time }: ReservationEmailRequest = await req.json();

    console.log("Sending reservation emails for:", reservationNumber);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Salón TAMA <onboarding@resend.dev>",
      to: [email],
      subject: "Potvrdenie rezervácie - Salón TAMA",
      html: `
        <h1>Ďakujeme za vašu rezerváciu, ${fullName}!</h1>
        <p><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
        <p><strong>Služba:</strong> ${service}</p>
        <p><strong>Dátum:</strong> ${date}</p>
        <p><strong>Čas:</strong> ${time}</p>
        <br>
        <p>Rezerváciu musíme ešte potvrdiť. Napíšeme vám na e-mail s potvrdením.</p>
        <p>S pozdravom,<br>Tím Salón TAMA</p>
      `,
    });

    // Send notification email to salon owners
    const adminEmailResponse = await resend.emails.send({
      from: "Salón TAMA <onboarding@resend.dev>",
      to: ["tamara.gaborova28@gmail.com", "timotejkucharcik116@gmail.com"],
      subject: `Nová rezervácia - ${reservationNumber}`,
      html: `
        <h1>Nová rezervácia!</h1>
        <p><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
        <p><strong>Klient:</strong> ${fullName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Služba:</strong> ${service}</p>
        <p><strong>Dátum:</strong> ${date}</p>
        <p><strong>Čas:</strong> ${time}</p>
        <br>
        <p>Prosím, potvrďte alebo odmietne túto rezerváciu v administrácii.</p>
        <p><a href="https://hywvxiezdxhvfwqzlcdj.lovable.app/admin" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Spravovať rezervácie</a></p>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      customerEmail: customerEmailResponse,
      adminEmail: adminEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reservation-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);