-- Fix WhatsApp messages table schema
-- Run this in your Supabase SQL Editor

-- First, check if the table exists and what columns it has
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'whatsapp_messages';

-- Add the missing message_direction column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'whatsapp_messages' 
        AND column_name = 'message_direction'
    ) THEN
        ALTER TABLE whatsapp_messages ADD COLUMN message_direction TEXT DEFAULT 'outbound' CHECK (message_direction IN ('inbound', 'outbound'));
    END IF;
END $$;

-- Update existing records to have the default direction
UPDATE whatsapp_messages SET message_direction = 'outbound' WHERE message_direction IS NULL;

-- Show the current schema
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'whatsapp_messages' 
ORDER BY ordinal_position;
