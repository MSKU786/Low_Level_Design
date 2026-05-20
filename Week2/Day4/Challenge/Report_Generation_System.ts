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


interface Report {
  generate(sources: string): ReportOutput
}


interface DeliveryStrategy<T>{
  deliver(args: T)
}

class EmailDeliveryStrategy implements DeliveryStrategy<string> {
  deliver(args: string) {
    this.sendEmail()
  }
}

abstract class BaseReport implements Report {
  generate(sources: string) : ReportOutput {
    const data = this.fetchData(sources);
    
    this.validateData(data);

    const output = this.formatOutput(data);


  }
}