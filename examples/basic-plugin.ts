/**
 * Example: Basic Justice OS Plugin
 *
 * Demonstrates how to create a plugin that listens for case lifecycle
 * events and performs custom actions. This example logs case activity
 * to an external webhook for integration with third-party systems.
 */

import type { JusticePlugin, PluginContext, Case, TimelineEvent } from '../src/types';

/**
 * Activity Logger Plugin
 *
 * Subscribes to case lifecycle events and forwards them to an
 * external webhook URL. Useful for Slack notifications, audit
 * systems, or CRM integrations.
 */
const activityLoggerPlugin: JusticePlugin = {
  name: 'activity-logger',
  version: '1.0.0',
  description: 'Forwards case lifecycle events to an external webhook',

  async onLoad(ctx: PluginContext) {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('[activity-logger] WEBHOOK_URL not set — skipping webhook registration');
      return;
    }

    // Listen for new cases
    ctx.caseManager.on('caseCreated', async (caseData: Case) => {
      await postToWebhook(webhookUrl, {
        event: 'case.created',
        caseId: caseData.id,
        caseNumber: caseData.caseNumber,
        title: caseData.title,
        timestamp: new Date().toISOString(),
      });
    });

    // Listen for status changes
    ctx.caseManager.on('caseUpdated', async (caseData: Case) => {
      await postToWebhook(webhookUrl, {
        event: 'case.updated',
        caseId: caseData.id,
        status: caseData.status,
        timestamp: new Date().toISOString(),
      });
    });

    // Listen for new timeline events (hearings, filings, etc.)
    ctx.caseManager.on('timelineEventAdded', async (event: TimelineEvent) => {
      await postToWebhook(webhookUrl, {
        event: 'timeline.event_added',
        caseId: event.caseId,
        eventType: event.type,
        label: event.label,
        date: event.date.toISOString(),
        timestamp: new Date().toISOString(),
      });
    });

    console.log('[activity-logger] Registered webhook listeners');
  },

  async onUnload() {
    console.log('[activity-logger] Plugin unloaded');
  },
};

/** Helper: POST JSON to a webhook endpoint */
async function postToWebhook(url: string, payload: Record<string, unknown>): Promise<void> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[activity-logger] Webhook returned ${response.status}`);
    }
  } catch (error) {
    console.error('[activity-logger] Webhook delivery failed:', error);
  }
}

export default activityLoggerPlugin;
