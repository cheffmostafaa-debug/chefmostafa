import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Phone normalization for Algerian and Mauritanian numbers
function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  
  // Handle Algerian numbers
  if (cleaned.startsWith('00213') || cleaned.startsWith('213') || cleaned.startsWith('0')) {
    let algerianNumber = cleaned;
    
    if (algerianNumber.startsWith('00213')) {
      algerianNumber = algerianNumber.substring(5);
    } else if (algerianNumber.startsWith('213')) {
      algerianNumber = algerianNumber.substring(3);
    } else if (algerianNumber.startsWith('0')) {
      algerianNumber = algerianNumber.substring(1);
    }
    
    if (/^[567]\d{7}$/.test(algerianNumber)) {
      return `+213${algerianNumber}`;
    }
  }
  
  // Handle Mauritanian numbers
  if (cleaned.startsWith('00222') || cleaned.startsWith('222')) {
    let mauritanianNumber = cleaned;
    
    if (mauritanianNumber.startsWith('00222')) {
      mauritanianNumber = mauritanianNumber.substring(5);
    } else if (mauritanianNumber.startsWith('222')) {
      mauritanianNumber = mauritanianNumber.substring(3);
    }
    
    // Validate it's a valid Mauritanian mobile number (starts with 2, 3, or 4 and has 8 digits)
    if (/^[234]\d{7}$/.test(mauritanianNumber)) {
      return `+222${mauritanianNumber}`;
    }
  }
  
  throw new Error('Invalid phone number');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse Twilio webhook data
    const formData = await req.formData()
    const messageSid = formData.get('MessageSid') as string
    const from = formData.get('From') as string // Customer's number
    const to = formData.get('To') as string // Your WhatsApp number
    const body = formData.get('Body') as string
    const numMedia = formData.get('NumMedia') as string

    console.log('Incoming WhatsApp message:', {
      messageSid,
      from,
      to,
      body,
      numMedia
    });

    // Normalize customer phone number
    const normalizedPhone = normalizePhoneNumber(from.replace('whatsapp:', ''))
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Log inbound message
    const { data: messageLog, error: logError } = await supabase
      .from('whatsapp_messages')
      .insert({
        recipient_phone: normalizedPhone,
        message_type: 'session',
        message_content: body || '[Media Message]',
        message_direction: 'inbound',
        status: 'delivered',
        twilio_message_sid: messageSid,
        sent_at: new Date().toISOString()
      })
      .select()
      .single()

    if (logError) {
      console.error('Failed to log inbound message:', logError)
      throw logError
    }

    console.log('Inbound message logged successfully:', messageLog.id)

    // Optional: Send auto-reply if you want to acknowledge customer messages
    // This would be within the 24-hour window since customer just messaged
    if (body && body.toLowerCase().includes('menu') || body.toLowerCase().includes('قائمة')) {
      try {
        const autoReplyResponse = await fetch(`${supabaseUrl}/functions/v1/send-whatsapp`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: {
              to: normalizedPhone,
              message: '🍽️ Welcome to Chef Mustafa! You can view our menu and place orders through our app. Download link: [your-app-link]',
              type: 'session'
            }
          })
        });
        
        if (!autoReplyResponse.ok) {
          console.error('Auto-reply failed:', await autoReplyResponse.text());
        }
      } catch (autoReplyError) {
        console.error('Auto-reply error:', autoReplyError);
      }
    }

    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { 
        headers: { ...corsHeaders, 'Content-Type': 'text/xml' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { 
        headers: { ...corsHeaders, 'Content-Type': 'text/xml' },
        status: 500 
      }
    )
  }
})
