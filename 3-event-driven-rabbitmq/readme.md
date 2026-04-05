POST /order
 → Save order
 → Send message to queue 📨
 → Return response immediately ✅

Worker (separate process):
 → Picks message
 → Sends email
 → Updates DB