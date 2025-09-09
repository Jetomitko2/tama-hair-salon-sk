import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface StatusEmailRequest {
  reservationNumber: string;
  fullName: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'rejected';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== SEND STATUS EMAIL FUNCTION STARTED ===");
    
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    const { reservationNumber, fullName, email, service, date, time, status }: StatusEmailRequest = JSON.parse(requestBody);
    
    console.log("Parsed request data:", { reservationNumber, fullName, email, status });

    console.log("Sending status email for reservation:", reservationNumber, "Status:", status);

    const isConfirmed = status === 'confirmed';
    const statusText = isConfirmed ? 'potvrdená' : 'odmietnutá';
    const statusColor = isConfirmed ? '#4CAF50' : '#f44336';

    console.log("About to send email via Resend...");
    
    const emailResponse = await resend.emails.send({
      from: "Salón TAMA <onboarding@resend.dev>",
      to: [email],
      subject: `Rezervácia ${statusText} - ${reservationNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: ${statusColor};">Rezervácia ${statusText}</h1>
          <p>Milý/á ${fullName},</p>
          
          ${isConfirmed ? `
            <p>Vaša rezervácia bola <strong style="color: ${statusColor};">potvrdená</strong>! Tešíme sa na Vás.</p>
          ` : `
            <p>Ľutujeme, ale Vašu rezerváciu sme museli <strong style="color: ${statusColor};">odmietnuť</strong>. Pre viac informácií nás kontaktujte.</p>
          `}
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Detaily rezervácie:</h3>
            <p><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
            <p><strong>Služba:</strong> ${service}</p>
            <p><strong>Dátum:</strong> ${date}</p>
            <p><strong>Čas:</strong> ${time}</p>
          </div>
          
          ${isConfirmed ? `
            <p>Ak potrebujete zmeniť alebo zrušiť rezerváciu, kontaktujte nás telefonicky alebo emailom.</p>
          ` : `
            <p>Môžete si vybrať iný termín na našej webstránke alebo nás kontaktovať priamo.</p>
          `}
          
          <p style="margin-top: 30px;">
            S pozdravom,<br>
            <strong>Tím Salón TAMA</strong>
          </p>
        </div>
      `,
    });

    console.log("Email response from Resend:", JSON.stringify(emailResponse, null, 2));

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse: emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("ERROR in send-status-email function:", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);