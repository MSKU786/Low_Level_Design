// --------------------
// Common Types
// --------------------

type QueryResult<T = any> = {
  rows: T[];
};

// --------------------
// Interfaces (Domain-driven naming)
// --------------------

interface EventAnalyticsProvider {
  track(event: string, data: Record<string, unknown>): Promise<void>;
}

interface EventRepository {
  query<T = any>(q: string, params: unknown[]): Promise<QueryResult<T>>;
}

interface ReportStorage {
  upload(command: PutObjectCommand): Promise<void>;
}

interface NotificationService {
  notify(payload: { text: string }): Promise<void>;
}

// --------------------
// Event Tracking Service
// --------------------

class EventTracker {
  constructor(
    private providers: EventAnalyticsProvider[],
    private repository: EventRepository
  ) {}

  async trackEvent(
    userId: string,
    event: string,
    properties: Record<string, unknown>
  ): Promise<void> {
    // Send to all analytics providers
    await Promise.all(
      this.providers.map((provider) =>
        provider.track(event, {
          user_id: userId,
          ...properties,
        })
      )
    );

    // Store raw event
    await this.repository.query(
      `
      INSERT INTO events (user_id, event, properties, created_at)
      VALUES ($1, $2, $3, NOW())
      `,
      [userId, event, JSON.stringify(properties)]
    );
  }
}

// --------------------
// Report Service
// --------------------

class ReportService {
  constructor(
    private repository: EventRepository,
    private storage: ReportStorage
  ) {}

  async generateReport(
    startDate: Date,
    endDate: Date,
    format: "csv" | "json"
  ): Promise<string> {
    const result = await this.repository.query(
      `
      SELECT * FROM events
      WHERE created_at BETWEEN $1 AND $2
      `,
      [startDate, endDate]
    );

    const rows = result.rows;

    let content: string;

    if (format === "csv") {
      content = this.toCSV(rows);
    } else {
      content = JSON.stringify(rows);
    }

    await this.storage.upload(
      new PutObjectCommand({
        Bucket: "analytics-reports",
        Key: `reports/${startDate.toISOString()}-${endDate.toISOString()}.${format}`,
        Body: content,
      })
    );

    return content;
  }

  private toCSV(rows: any[]): string {
    if (!rows.length) return "";

    const headers = Object.keys(rows[0]).join(",");
    const values = rows
      .map((row) => Object.values(row).join(","))
      .join("\n");

    return `${headers}\n${values}`;
  }
}

// --------------------
// Anomaly Detection Service
// --------------------

class AnomalyDetector {
  constructor(
    private repository: EventRepository,
    private notifier: NotificationService
  ) {}

  async checkAnomalies(): Promise<void> {
    const recentRes = await this.repository.query<{ count: string }>(
      `
      SELECT COUNT(*) as count FROM events
      WHERE created_at > NOW() - INTERVAL '1 hour'
      `
    );

    const avgRes = await this.repository.query<{ avg: string }>(
      `
      SELECT AVG(hourly_count) as avg
      FROM event_hourly_stats
      `
    );

    const recentCount = Number(recentRes.rows[0]?.count || 0);
    const average = Number(avgRes.rows[0]?.avg || 0);

    if (recentCount < average * 0.5) {
      await this.notifier.notify({
        text: `⚠️ Event volume dropped to ${recentCount} (avg: ${average})`,
      });
    }

    if (recentCount > average * 3) {
      await this.notifier.notify({
        text: `🚨 Event spike: ${recentCount} (avg: ${average})`,
      });
    }
  }
}

// --------------------
// Facade (Orchestrator)
// --------------------

class AnalyticsFacade {
  constructor(
    private tracker: EventTracker,
    private reportService: ReportService,
    private anomalyDetector: AnomalyDetector
  ) {}

  trackEvent(
    userId: string,
    event: string,
    properties: Record<string, unknown>
  ) {
    return this.tracker.trackEvent(userId, event, properties);
  }

  generateReport(
    startDate: Date,
    endDate: Date,
    format: "csv" | "json"
  ) {
    return this.reportService.generateReport(startDate, endDate, format);
  }

  checkAnomalies() {
    return this.anomalyDetector.checkAnomalies();
  }
}