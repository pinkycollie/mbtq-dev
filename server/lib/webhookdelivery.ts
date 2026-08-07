import crypto from 'crypto';
import { supabase } from './supabase'; // your existing Supabase client

interface WebhookPayload {
  event: string;
  timestamp: string;
  data: any;
}

export class WebhookService {
  private static async deliverToWebhook(
    webhook: any,
    payload: WebhookPayload
  ): Promise<{ success: boolean; status: number; body: string }> {
    const signedPayload = JSON.stringify(payload);
    const signature = crypto
      .createHmac('sha256', webhook.secret)
      .update(signedPayload)
      .digest('hex');

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Signature': signature,
            'X-Webhook-Event': payload.event,
            'X-Webhook-Delivery': `del_${Date.now()}`,
          },
          body: signedPayload,
        });

        const body = await response.text();

        // Log delivery
        await supabase.from('webhook_deliveries').insert({
          webhook_id: webhook.id,
          event: payload.event,
          payload,
          response_status: response.status,
          response_body: body.slice(0, 500), // truncate
          attempts,
          status: response.ok ? 'success' : 'failed',
        });

        return { success: response.ok, status: response.status, body };
      } catch (error) {
        console.error(`Webhook delivery attempt ${attempts} failed:`, error);
        
        if (attempts === maxAttempts) {
          await supabase.from('webhook_deliveries').insert({
            webhook_id: webhook.id,
            event: payload.event,
            payload,
            response_status: 0,
            response_body: String(error),
            attempts,
            status: 'failed',
          });
        }
      }
    }
    return { success: false, status: 0, body: 'Max retries exceeded' };
  }

  // Main entry point - Call this whenever an important event happens
  static async emitEvent(event: string, data: any) {
    const { data: webhooks } = await supabase
      .from('webhooks')
      .select('*')
      .eq('active', true)
      .contains('events', [event]);

    if (!webhooks || webhooks.length === 0) return;

    const payload: WebhookPayload = {
      event,
      timestamp: new Date().toISOString(),
      data,
    };

    // Fire and forget (non-blocking)
    webhooks.forEach(webhook => {
      this.deliverToWebhook(webhook, payload).catch(console.error);
    });
  }
}
