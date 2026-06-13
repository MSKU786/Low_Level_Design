//YOUR CHALLENGE: Design a report generation system

// Time: -35 minutes

// Uses both abstract classes AND interfaces together.

// REQUIREMENTS:

// 1. Reports can be generated from different data sources (database query, API call, file read)

// 2. Every report follows the same lifecycle: fetchData validateData formatOutput deliver

// 3. "fetchData" and "formatOutput" vary per report type

// 4. "validateData" is the same for all reports (check non-empty, check required fields exist)

// 5. "deliver" has multiple strategies: email, save to disk, upload to $3 and these can be mixed with ANY report type

// 6. A SalesReport fetches from DB and formats as a table

// 7. An AnalyticsReport fetches from an API and formats as charts

// 8. A third-party CustomReport might have a completely different

//lifecycle that doesn't follow the standard flow

// YOUR DESIGN DECISIONS:

// What's the interface? (for DIP consumers depend on this)

// What's the abstract class? (for DRY shared lifecycle)

// What's a strategy interface? (for delivery composition)

// How does CustomReport fit in without using the base class?

// Where does each SOLID principle show up?


// DELIVERABLES:
// 1. Te Report interface
// 2. The BaseReport abstract class (template method)
// 3. The DeliveryStrategy interface
// 4. SalesReport and AnalyticsReport extending BaseReport
// 5. CustomReport implemnting Report directly (not extending BaseReport)
// 7. The ReportService orchestrator


// --- Types ---
interface ReportData {
  fields: Record<string, unknown>;
  rows: unknown[];
}

interface ReportOutput {
  content: string;
  generatedAt: Date;
}

// --- DIP boundary: consumers depend on this ---
interface Report {
  generate(source: string): Promise<ReportOutput>;
}

// --- Strategy interface (OCP: add new strategies without modifying reports) ---
interface DeliveryStrategy {
  deliver(output: ReportOutput): Promise<void>;
}

// --- Concrete strategies (config goes in constructor, not deliver()) ---
class EmailDeliveryStrategy implements DeliveryStrategy {
  constructor(private toEmail: string) {}

  async deliver(output: ReportOutput): Promise<void> {
    console.log(`Sending report to ${this.toEmail}`, output);
  }
}

class SaveToDiskStrategy implements DeliveryStrategy {
  constructor(private filePath: string) {}

  async deliver(output: ReportOutput): Promise<void> {
    console.log(`Saving report to ${this.filePath}`, output);
  }
}

class S3DeliveryStrategy implements DeliveryStrategy {
  constructor(private bucketPath: string) {}

  async deliver(output: ReportOutput): Promise<void> {
    console.log(`Uploading report to S3: ${this.bucketPath}`, output);
  }
}

// --- Template Method pattern lives here (DRY: validateData once) ---
abstract class BaseReport implements Report {
  constructor(private deliveryStrategies: DeliveryStrategy[]) {}

  // Template method — lifecycle is fixed, steps are overridden
  async generate(source: string): Promise<ReportOutput> {
    const data = await this.fetchData(source);
    this.validateData(data);                   // same for all reports
    const output = await this.formatOutput(data);

    for (const strategy of this.deliveryStrategies) {
      await strategy.deliver(output);          // mixed delivery
    }

    return output;
  }

  // LSP: subclasses override these without breaking the lifecycle contract
  protected abstract fetchData(source: string): Promise<ReportData>;
  protected abstract formatOutput(data: ReportData): Promise<ReportOutput>;

  // SRP: validation is one responsibility, lives in one place
  private validateData(data: ReportData): void {
    if (!data.rows || data.rows.length === 0) {
      throw new Error("Report data is empty");
    }
    if (!data.fields || Object.keys(data.fields).length === 0) {
      throw new Error("Report is missing required fields");
    }
  }
}

// --- Concrete reports (only override what varies) ---
class SalesReport extends BaseReport {
  protected async fetchData(source: string): Promise<ReportData> {
    console.log(`Querying DB: ${source}`);
    return { fields: { region: "North" }, rows: [{ sale: 100 }] };
  }

  protected async formatOutput(data: ReportData): Promise<ReportOutput> {
    const table = data.rows.map(r => JSON.stringify(r)).join("\n");
    return { content: `TABLE:\n${table}`, generatedAt: new Date() };
  }
}

class AnalyticsReport extends BaseReport {
  protected async fetchData(source: string): Promise<ReportData> {
    const res = await fetch(source);
    const json = await res.json();
    return { fields: json.meta, rows: json.data };
  }

  protected async formatOutput(data: ReportData): Promise<ReportOutput> {
    return { content: `CHART: ${data.rows.length} data points`, generatedAt: new Date() };
  }
}

// --- CustomReport: completely different lifecycle, just honours the Report contract ---
class CustomReport implements Report {
  async generate(source: string): Promise<ReportOutput> {
    // Does its own thing — no validateData, no delivery strategies
    console.log(`Custom report from ${source}`);
    return { content: "Custom output", generatedAt: new Date() };
  }
}

// --- Orchestrator (SRP: only job is to run reports) ---
class ReportService {
  async run(report: Report, source: string): Promise<void> {
    const output = await report.generate(source);
    console.log("Report complete:", output.generatedAt);
  }
}

// --- Usage ---
const service = new ReportService();

const sales = new SalesReport([
  new EmailDeliveryStrategy("manager@company.com"),
  new S3DeliveryStrategy("s3://reports/sales")
]);

await service.run(sales, "SELECT * FROM sales");