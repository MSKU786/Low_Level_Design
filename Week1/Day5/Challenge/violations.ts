// Time: ~40 minutes

// YOUR CHALLENGE: Apply DIP to this analytics service
// This challenge tests ALL 5 SOLID principles together.

// --------------------
// Imports
// --------------------

import { Mixpanel } from "mixpanel";
import { GoogleAnalytics } from "@google/analytics";
import { Pool as PostgresPool } from "pg";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { IncomingWebhook as SlackWebhook } from "@slack/webhook";

// --------------------
// Analytics Service
// --------------------

class AnalyticsService {
  private mixpanel = new Mixpanel("MP_TOKEN");
  private ga = new GoogleAnalytics("GA_ID");
  private db = new PostgresPool({ connectionString: "DATABASE_URL" });
  private s3 = new S3Client({ region: "us-east-1" });
  private slack = new SlackWebhook("SLACK_URL");

  // --------------------
  // Track a user event
  // --------------------

  async trackEvent(
    userId: string,
    event: string,
    properties: Record<string, unknown>
  ): Promise<void> {
    // Send to both analytics providers
    await this.mixpanel.track(event, {
      distinct_id: userId,
      ...properties,
    });

    await this.ga.event({
      name: event,
      params: {
        user_id: userId,
        ...properties,
      },
    });

    // Store raw event in database
    await this.db.query(
      `
      INSERT INTO events (user_id, event, properties, created_at)
      VALUES ($1, $2, $3, NOW())
      `,
      [userId, event, JSON.stringify(properties)]
    );
  }

  // --------------------
  // Generate and export a report
  // --------------------

  async generateReport(
    startDate: Date,
    endDate: Date,
    format: "csv" | "json"
  ): Promise<string> {
    const rows = await this.db.query(
      `
      SELECT * FROM events
      WHERE created_at BETWEEN $1 AND $2
      `,
      [startDate, endDate]
    );

    let content: string;

    if (format === "csv") {
      content = this.toCSV(rows);
    } else {
      content = JSON.stringify(rows);
    }

    // Upload to S3
    await this.s3.send(
      new PutObjectCommand({
        Bucket: "analytics-reports",
        Key: `reports/${startDate.toISOString()}-${endDate.toISOString()}.${format}`,
        Body: content,
      })
    );

    return content;
  }

  // --------------------
  // Alert on anomalies
  // --------------------

  async checkAnomalies(): Promise<void> {
    const recentCount = await this.db.query(
      `
      SELECT COUNT(*) FROM events
      WHERE created_at > NOW() - INTERVAL '1 hour'
      `
    );

    const average = await this.db.query(
      `
      SELECT AVG(hourly_count)
      FROM event_hourly_stats
      `
    );

    if (recentCount < average * 0.5) {
      await this.slack.send({
        text: `⚠️ Event volume dropped to ${recentCount} (avg: ${average})`,
      });
    }

    if (recentCount > average * 3) {
      await this.slack.send({
        text: `🚨 Event spike: ${recentCount} (avg: ${average})`,
      });
    }
  }

  // --------------------
  // Helpers
  // --------------------

  private toCSV(rows: any): string {
    // CSV conversion logic (placeholder)
    return "";
  }
}