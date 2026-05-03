/**
 * ============================================
 * Section A — Spot the Violations (FINAL)
 * ============================================
 * Each snippet includes:
 * - Violated principle(s)
 * - Concise interview-ready explanation
 * ============================================
 */

/**
 * ============================================
 * A1 — Logger Interface & Implementation
 * ============================================
 * Violations:
 * - Interface Segregation Principle (ISP)
 * - Single Responsibility Principle (SRP)
 *
 * Why:
 * The Logger interface forces implementations to support multiple unrelated logging mechanisms.
 * ConsoleLogger is forced to implement methods it does not support, violating ISP.
 * Also, the interface mixes multiple responsibilities (file, DB, cloud logging), giving it multiple reasons to change.
 */
interface Logger {
  log(message: string): void;
  logToFile(path: string, message: string): void;
  logToDatabase(table: string, message: string): void;
  logToCloudWatch(stream: string, message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }

  logToFile() {
    throw new Error('Not supported');
  }

  logToDatabase() {
    throw new Error('Not supported');
  }

  logToCloudWatch() {
    throw new Error('Not supported');
  }
}

/**
 * ============================================
 * A2 — Report Generator
 * ============================================
 * Violations:
 * - Open/Closed Principle (OCP)
 * - Single Responsibility Principle (SRP)
 * - Dependency Inversion Principle (DIP)
 *
 * Why:
 * Adding a new format requires modifying the existing method, violating OCP.
 * The class handles multiple responsibilities: format selection, report generation, and dependency loading.
 * It directly depends on concrete libraries (pdfkit, exceljs), violating DIP.
 */
class ReportGenerator {
  async generate(data: SalesData[], format: string) {
    // process data

    if (format === 'pdf') {
      const PDFKit = require('pdfkit');
      // generate PDF
    } else if (format === 'excel') {
      const ExcelJs = require('exceljs');
      // generate Excel
    } else if (format === 'csv') {
      // generate CSV
    }

    // New format next sprint: "html"
  }
}

/**
 * ============================================
 * A3 — Bird Hierarchy
 * ============================================
 * Violations:
 * - Liskov Substitution Principle (LSP)
 *
 * Why:
 * The Penguin class cannot honor the contract of the Bird class (fly method).
 * Replacing Bird with Penguin breaks expected behavior, violating substitutability.
 */
class Bird {
  fly(): void {
    console.log('Flying');
  }

  swim(): void {
    console.log('Swimming');
  }

  makeSound(): void {
    console.log('Chirp');
  }
}

class Penguin extends Bird {
  fly(): void {
    throw new Error("Penguins can't fly!");
  }
}

/**
 * ============================================
 * A4 — Dashboard Controller
 * ============================================
 * Violations:
 * - Dependency Inversion Principle (DIP)
 * - Single Responsibility Principle (SRP)
 *
 * Why:
 * The controller directly creates concrete dependencies instead of depending on abstractions, violating DIP.
 * It also has multiple responsibilities (data fetching, analytics, caching), giving it multiple reasons to change.
 */
class DashboardController {
  private analyticsService = new MixpanelService(MP_KEY);
  private userRepo = new MongoUserRepository(MONGO_URI);
  private cache = new RedisClient(REDIS_URL);

  async getDashboard(userId: string) {
    const user = await this.userRepo.find(userId);
    const metrics = await this.analyticsService.getUserMetrics(userId);
    const cached = await this.cache.get(`dashboard:${userId}`);

    // build dashboard
  }
}

/**
 * ============================================
 * A5 — User Profile Class
 * ============================================
 * Violations:
 * - Single Responsibility Principle (SRP)
 * - (Design Smell: God Class)
 *
 * Why:
 * The class handles multiple unrelated responsibilities such as profile management, authentication,
 * file uploads, email sending, and GDPR compliance. It has many reasons to change.
 */
class UserProfile {
  constructor(private db: Database) {}

  async getProfile(userId: string) {
    /* fetch profile */
  }

  async updateProfile(userId: string, data: any) {
    /* update */
  }

  async changePassword(userId: string, newPass: string) {
    /* hash + save */
  }

  async uploadAvatar(userId: string, file: Buffer) {
    /* resize + upload to S3 */
  }

  async sendVerificationEmail(userId: string) {
    /* compose & send via SES */
  }

  async deleteAccount(userId: string) {
    /* cascade delete */
  }

  async exportUserData(userId: string) {
    /* GDPR export */
  }
}

/**
 * ============================================
 * A6 — Shipping Provider Implementation
 * ============================================
 * Violations:
 * - Liskov Substitution Principle (LSP)
 *
 * Why:
 * The base contract allows any destination, but this implementation rejects certain valid inputs.
 * This breaks the expected contract and violates substitutability.
 */
interface ShippingProvider {
  calculateRate(weight: number, destination: string): Promise<number>;
}

class InternationalShipping implements ShippingProvider {
  async calculateRate(weight: number, destination: string): Promise<number> {
    if (destination.startsWith('US-')) {
      throw new Error('International shipping only!');
    }

    return weight * 2.5 + 50;
  }
}
