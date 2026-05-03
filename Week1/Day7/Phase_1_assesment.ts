/**
 * ============================================
 * Section A — Spot the Violations
 * ============================================
 * Instructions:
 * For each snippet (A1–A6), identify:
 * 1. Which principle(s) are violated
 * 2. Why (in 1–2 sentences)
 *
 * NOTE:
 * - Do NOT modify the code
 * - Do NOT implement fixes here
 * - Only analyze violations
 * ============================================
 */

/**
 * ============================================
 * A1 — Logger Interface & Implementation
 * ============================================
 * Focus:
 * - Interface design
 * - Implementation responsibilities
 * - Unsupported methods throwing errors
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
    // Method not supported by this implementation
    throw new Error('Not supported');
  }

  logToDatabase() {
    // Method not supported by this implementation
    throw new Error('Not supported');
  }

  logToCloudWatch() {
    // Method not supported by this implementation
    throw new Error('Not supported');
  }
}

/**
 * ============================================
 * A2 — Report Generator
 * ============================================
 * Focus:
 * - Conditional logic for formats
 * - Adding new formats (extensibility concern)
 * - Dependency loading inside method
 */
class ReportGenerator {
  async generate(data: SalesData[], format: string) {
    // Step 1: process data

    if (format === 'pdf') {
      const PDFKit = require('pdfkit');
      // generate PDF
    } else if (format === 'excel') {
      const ExcelJs = require('exceljs');
      // generate Excel
    } else if (format === 'csv') {
      // generate CSV
    }

    // NOTE:
    // New format planned: "html"
    // Think about how this impacts existing code
  }
}

/**
 * ============================================
 * A3 — Bird Hierarchy
 * ============================================
 * Focus:
 * - Inheritance design
 * - Behavior compatibility between parent and child
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
    // Penguins cannot fly, but parent class enforces this behavior
    throw new Error("Penguins can't fly!");
  }
}

/**
 * ============================================
 * A4 — Dashboard Controller
 * ============================================
 * Focus:
 * - Object creation inside class
 * - External service dependencies
 * - Tight coupling vs abstraction
 */
class DashboardController {
  private analyticsService = new MixpanelService(MP_KEY);
  private userRepo = new MongoUserRepository(MONGO_URI);
  private cache = new RedisClient(REDIS_URL);

  async getDashboard(userId: string) {
    // Fetch user data
    const user = await this.userRepo.find(userId);

    // Fetch analytics data
    const metrics = await this.analyticsService.getUserMetrics(userId);

    // Fetch cached dashboard
    const cached = await this.cache.get(`dashboard:${userId}`);

    // Build dashboard response
  }
}

/**
 * ============================================
 * A5 — User Profile Class
 * ============================================
 * Focus:
 * - Number of responsibilities in one class
 * - Mixing different domains (DB, auth, storage, email, GDPR, etc.)
 */
class UserProfile {
  constructor(private db: Database) {}

  async getProfile(userId: string) {
    /* fetch profile */
  }

  async updateProfile(userId: string, data: any) {
    /* update profile */
  }

  async changePassword(userId: string, newPass: string) {
    /* hash + save password */
  }

  async uploadAvatar(userId: string, file: Buffer) {
    /* resize + upload to S3 */
  }

  async sendVerificationEmail(userId: string) {
    /* compose & send via SES */
  }

  async deleteAccount(userId: string) {
    /* cascade delete everything */
  }

  async exportUserData(userId: string) {
    /* GDPR export to zip */
  }
}

/**
 * ============================================
 * A6 — Shipping Provider Implementation
 * ============================================
 * Focus:
 * - Contract expectations vs implementation behavior
 * - Input handling differences
 */
interface ShippingProvider {
  calculateRate(weight: number, destination: string): Promise<number>;
}

class InternationalShipping implements ShippingProvider {
  async calculateRate(weight: number, destination: string): Promise<number> {
    // Parent contract allows ANY destination string
    // This implementation restricts certain inputs

    if (destination.startsWith('US-')) {
      throw new Error('International shipping only!');
    }

    return weight * 2.5 + 50;
  }
}
