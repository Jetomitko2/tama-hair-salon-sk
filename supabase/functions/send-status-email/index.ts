import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface StatusEmailRequest {
  reservationNumber: string;
  fullName: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'rejected';
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      reservationNumber, 
      fullName, 
      email, 
      service, 
      date, 
      time, 
      status, 
      rejectionReason 
    }: StatusEmailRequest = await req.json();
    
    console.log(`Sending status email to ${email} for reservation ${reservationNumber} - status: ${status}`);

    const isConfirmed = status === 'confirmed';
    const statusText = isConfirmed ? 'potvrdená' : 'odmietnutá';
    const statusColor = isConfirmed ? '#4CAF50' : '#f44336';

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
            <p>Ľutujeme, ale Vašu rezerváciu sme museli <strong style="color: ${statusColor};">odmietnuť</strong>.</p>
            ${rejectionReason ? `
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0;">
                <h4 style="margin: 0 0 10px 0; color: #856404;">Dôvod odmietnutia:</h4>
                <p style="margin: 0; color: #856404;">${rejectionReason}</p>
              </div>
            ` : ''}
          `}
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Detaily rezervácie:</h3>
            <p><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
            <p><strong>Služba:</strong> ${service}</p>
            <p><strong>Dátum:</strong> ${date}</p>
            <p><strong>Čas:</strong> ${time}</p>
          </div>
          
          <p style="margin-top: 30px;">
            S pozdravom,<br>
            <strong>Tím Salón TAMA</strong>
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending status email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);