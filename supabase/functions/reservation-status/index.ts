import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface StatusUpdateData {
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
    const { reservationNumber, fullName, email, service, date, time, status, rejectionReason }: StatusUpdateData = await req.json();
    
    console.log(`Sending status email to: ${email} for reservation: ${reservationNumber} - Status: ${status}`);

    const isConfirmed = status === 'confirmed';
    const statusText = isConfirmed ? 'potvrdená' : 'odmietnutá';
    const statusColor = isConfirmed ? '#4CAF50' : '#f44336';
    const backgroundColor = isConfirmed ? '#f0f8ff' : '#fff0f0';

    const emailResponse = await resend.emails.send({
      from: "Salón TAMA <system@kadernictvotama.sk>",
      to: [email],
      subject: `Rezervácia ${statusText} - ${reservationNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: ${statusColor}; text-align: center; margin-bottom: 30px;">
              Rezervácia ${statusText}
            </h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Milý/á <strong>${fullName}</strong>,</p>
            
            ${isConfirmed ? `
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Vaša rezervácia bola <strong style="color: ${statusColor};">potvrdená</strong>! Tešíme sa na Vás.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Prosím, dostavte sa včas na dohodnutý termín.
              </p>
            ` : `
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Ľutujeme, ale Vašu rezerváciu sme museli <strong style="color: ${statusColor};">odmietnuť</strong>.
              </p>
              ${rejectionReason ? `
                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 5px;">
                  <h4 style="margin: 0 0 10px 0; color: #856404;">Dôvod odmietnutia:</h4>
                  <p style="margin: 0; color: #856404; font-style: italic;">${rejectionReason}</p>
                </div>
              ` : ''}
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Môžete si vybrať iný termín na našej webstránke alebo nás kontaktovať priamo.
              </p>
            `}
            
            <div style="background-color: ${backgroundColor}; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid ${statusColor};">
              <h3 style="color: #333; margin-top: 0;">Detaily rezervácie:</h3>
              <p style="margin: 8px 0; color: #333;"><strong>Rezervačné číslo:</strong> ${reservationNumber}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Služba:</strong> ${service}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Dátum:</strong> ${date}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Čas:</strong> ${time}</p>
              <p style="margin: 8px 0; color: ${statusColor};"><strong>Stav:</strong> ${statusText.toUpperCase()}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              S pozdravom,<br>
              <strong style="color: #4CAF50;">Tím Salón TAMA</strong>
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
              <p>Pre akékoľvek otázky nás kontaktujte:</p>
              <p>📞 Telefón: 0908 989 423</p>
              <p>📧 Email: tamara.gaborova@kadernictvotama.sk</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Status email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
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