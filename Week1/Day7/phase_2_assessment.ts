/**
 * ============================================
 * Section B — Refactor Challenge (15 min, 30 pts)
 * ============================================
 *
 * Task:
 * Refactor this class to fix ALL SOLID violations.
 *
 * Deliverables:
 * - Proper interfaces
 * - Refactored classes
 * - Explanation of design decisions
 *
 * NOTE:
 * - Do NOT solve here (this is the given problem)
 * - Focus on understanding current issues
 * ============================================
 */

// Problem: DIP voilated. Highlevel modules are depend on low level modules

interface DBRepository {
  query(query: string, params: string[]): Promise<void>;
}

interface Notifier<T> {
  send(message: T);
}

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
};

type PushMessage = {
  text: string;
};

class PostgresClient implements DBRepository {
  client: PostgresClient;
  constructor(private DB_URL: string) {
    this.client = new PostgresClient(this.DB_URL);
  }

  async query(query: string, params: []): Promise<void> {
    return this.client.query(query, params);
  }
}

class PushNotifier implements Notifier<PushMessage> {
  constructor(private url: string) {}

  async send(message: PushMessage) {
    console.log('Sending push:', message.text);
  }
}

class EmailProvider implements Notifier<EmailMessage> {
  constructor(private clientKey: string) {}

  async send(message: EmailMessage) {
    console.log('Sending email:', message.to, message.subject);
  }
}

class ProductValidator {
  validate(product: Product) {
    if (!product.name || product.name.length < 2) {
      throw new Error('Invalid name');
    }

    if (product.price <= 0) {
      throw new Error('Invalid price');
    }

    if (product.sku.length !== 8) {
      throw new Error('SKU must be 8 characters');
    }
  }
}

interface ReportFormatter {
  format(products: Product[]): string;
}

class CSVFormatter implements ReportFormatter {
  format(products: Product[]): string {
    return products
      .map((p) => `${p.sku},${p.name},${p.stock},${p.price}`)
      .join('\n');
  }
}

class JSONFormatter implements ReportFormatter {
  format(products: Product[]): string {
    return JSON.stringify(products, null, 2);
  }
}

class InventoryManager {
  constructor(
    private validator: ProductValidator,
    private db: DBRepository,
    private pushVendor: PushNotifier,
    private emailVendor: EmailProvider,
  ) {}
  /**
   * ============================================
   * Add Product
   * ============================================
   */
  async addProduct(product: Product): Promise<void> {
    // Validation
    this.validator.validate(product);

    // Save to DB
    await this.db.query(
      'INSERT INTO products (name, price, sku, stock) VALUES ($1, $2, $3, $4)',
      [product.name, product.price, product.sku, product.stock],
    );
  }

  /**
   * ============================================
   * Update Stock
   * ============================================
   */
  async updateStock(sku: string, quantity: number): Promise<void> {
    // Fetch product
    const product = await this.db.query(
      'SELECT * FROM products WHERE sku = $1',
      [sku],
    );

    const newStock = product.stock + quantity;

    // Update DB
    await this.db.query('UPDATE products SET stock = $1 WHERE sku = $2', [
      newStock,
      sku,
    ]);

    /**
     * ============================================
     * Low Stock Alert
     * ============================================
     */
    if (newStock < 10) {
      await this.pushVendor.send({
        text: `⚠️ Low stock: ${product.name} (${newStock} remaining)`,
      });

      await this.emailVendor.send({
        to: 'warehouse@company.com',
        subject: `Low stock alert: ${product.name}`,
        text: `Only ${newStock} units remaining for ${product.name} (${sku}).`,
      });
    }

    /**
     * ============================================
     * Out of Stock Alert
     * ============================================
     */
    if (newStock <= 0) {
      await this.pushVendor.send({
        text: `❌ OUT OF STOCK: ${product.name}`,
      });

      await this.emailVendor.send({
        to: 'warehouse@company.com',
        subject: `OUT OF STOCK: ${product.name}`,
        text: `${product.name} (${sku}) is now out of stock!`,
      });
    }

    /**
     * ============================================
     * Audit Logging
     * ============================================
     */
    await this.db.query(
      'INSERT INTO stock_audit (sku, old_stock, new_stock, changed_at) VALUES ($1, $2, $3, NOW())',
      [sku, product.stock, newStock],
    );
  }

  /**
   * ============================================
   * Get Product
   * ============================================
   */
  async getProduct(sku: string): Promise<Product> {
    return this.db.query('SELECT * FROM products WHERE sku = $1', [sku]);
  }

  /**
   * ============================================
   * Generate Stock Report
   * ============================================
   */
  async generateStockReport(format: 'csv' | 'json'): Promise<string> {
    const products = await this.db.query('SELECT * FROM products');

    if (format === 'csv') {
      return products
        .map((p: Product) => `${p.sku},${p.name},${p.stock},${p.price}`)
        .join('\n');
    } else {
      return JSON.stringify(products, null, 2);
    }
  }
}
