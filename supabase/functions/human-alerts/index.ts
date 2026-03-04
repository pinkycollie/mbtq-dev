// supabase/functions/human-alert/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { event, severity, magician } = await req.json();
  
  // If a Magician hits an error or needs "Human Root" approval
  if (severity === 'CRITICAL' || event === 'APPROVAL_REQUIRED') {
    await sendToHumanPWA({
      title: `🚨 ${magician} Needs You`,
      body: `Event: ${event}. Action required in the MBTQ Dashboard.`,
      url: "https://mbtq.dev/admin"
    });
  }
  
  return new Response("Alert Dispatched");
});
