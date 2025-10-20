import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  project_scope?: string;
  message: string;
  submission_id: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      organization,
      email,
      phone,
      project_scope,
      message,
      submission_id,
      created_at,
    }: ContactEmailRequest = await req.json();

    console.log("Processing contact form submission:", { submission_id, name, email });

    // Format the timestamp
    const submittedDate = new Date(created_at).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    // Build HTML email with RCG branding
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', Arial, sans-serif;
      background-color: #F4F7F9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
    }
    .header {
      background-color: #1B2B43;
      color: #FFFFFF;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .content {
      padding: 32px 24px;
      background-color: #F4F7F9;
    }
    .field {
      margin-bottom: 24px;
      background-color: #FFFFFF;
      padding: 16px;
      border-left: 3px solid #C4A04A;
    }
    .label {
      color: #C4A04A;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }
    .value {
      color: #2B2B2B;
      font-size: 16px;
      line-height: 1.6;
      word-wrap: break-word;
    }
    .message-field {
      white-space: pre-wrap;
    }
    .footer {
      background-color: #1B2B43;
      color: #FFFFFF;
      padding: 24px;
      text-align: center;
      font-size: 14px;
    }
    .footer p {
      margin: 8px 0;
    }
    .divider {
      border-top: 2px solid #C4A04A;
      margin: 24px 0;
    }
    .meta-info {
      background-color: #FFFFFF;
      padding: 16px;
      margin-top: 16px;
      border-top: 2px solid #C4A04A;
      font-size: 12px;
      color: #2B2B2B;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      
      ${organization ? `
      <div class="field">
        <div class="label">Organization</div>
        <div class="value">${organization}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #C4A04A; text-decoration: none;">${email}</a></div>
      </div>
      
      ${phone ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value"><a href="tel:${phone}" style="color: #C4A04A; text-decoration: none;">${phone}</a></div>
      </div>
      ` : ''}
      
      ${project_scope ? `
      <div class="field">
        <div class="label">Project Scope</div>
        <div class="value">${project_scope}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-field">${message}</div>
      </div>
      
      <div class="meta-info">
        <p><strong>Submitted:</strong> ${submittedDate} EST</p>
        <p><strong>Submission ID:</strong> ${submission_id}</p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Radcliff Construction Group</strong></p>
      <p>radcliffcg.com</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "RCG Construction <noreply@radcliffcg.com>",
      to: ["info@radcliffcg.com"],
      replyTo: email,
      subject: `New Contact Form Submission - ${name}`,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        email_id: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
