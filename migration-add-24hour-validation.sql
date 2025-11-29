-- Migration script for existing databases to add 24-hour WhatsApp window validation
-- Run this script if you already have the whatsapp_messages table deployed

-- Step 1: Add message_direction column to track inbound/outbound messages
ALTER TABLE whatsapp_messages 
ADD COLUMN IF NOT EXISTS message_direction VARCHAR(10) DEFAULT 'outbound' CHECK (message_direction IN ('inbound', 'outbound'));

-- Step 2: Update existing messages to be marked as outbound (only if null)
UPDATE whatsapp_messages 
SET message_direction = 'outbound' 
WHERE message_direction IS NULL;

-- Step 3: Add index for faster queries on inbound messages (only if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_inbound 
ON whatsapp_messages(recipient_phone, created_at) 
WHERE message_direction = 'inbound';

-- Step 4: Verify the migration worked
SELECT 
  column_name, 
  data_type, 
  column_default,
  check_clause
FROM information_schema.columns 
WHERE table_name = 'whatsapp_messages' 
  AND column_name = 'message_direction';

SELECT 
  indexname, 
  indexdef 
FROM pg_indexes 
WHERE tablename = 'whatsapp_messages' 
  AND indexname = 'idx_whatsapp_messages_inbound';

-- Step 5: Count existing messages by direction (should show all as 'outbound' initially)
SELECT 
  message_direction,
  COUNT(*) as message_count
FROM whatsapp_messages 
GROUP BY message_direction
ORDER BY message_direction;
