FROM n8nio/n8n:latest

# Let Railway inject PORT variable
ENV N8N_HOST=0.0.0.0

# Expose Railway's port
EXPOSE $PORT

# Start n8n
CMD ["sh", "-c", "n8n start"]
