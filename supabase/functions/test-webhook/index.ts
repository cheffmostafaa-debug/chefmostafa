import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phoneNumber, message } = await req.json()
    
    if (!phoneNumber || !message) {
      return new Response(
        JSON.stringify({ error: 'phoneNumber and message are required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Simulate inbound message for testing
    const { data: testMessage, error: logError } = await supabase
      .from('whatsapp_messages')
      .insert({
        recipient_phone: phoneNumber,
        message_type: 'session',
        message_content: message,
        message_direction: 'inbound',
        status: 'delivered',
        sent_at: new Date().toISOString()
      })
      .select()
      .single()

    if (logError) {
      throw logError
    }

    // Check if this puts us within the 24-hour window
    const { data: inboundCount } = await supabase
      .from('whatsapp_messages')
      .select('id')
      .eq('recipient_phone', phoneNumber)
      .eq('message_direction', 'inbound')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    return new Response(
      JSON.stringify({ 
        success: true,
        testMessageId: testMessage.id,
        message: 'Test inbound message created successfully',
        withinWindow: true,
        recentInboundCount: inboundCount?.length || 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Test webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
