// ============================================================
// FIXED SHOPPING CART
// ============================================================

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

class ShoppingCart {
  public readonly id: string;
  public readonly customerId: string;
  public readonly createdAt: Date;

  private readonly _items: CartItem[] = [];

  private _coupon: string | null = null;

  private readonly _maxItems: number;

  constructor(
    id: string,
    customerId: string,
    maxItems: number = 20
  ) {
    if (!id.trim()) {
      throw new Error("Cart id is required");
    }

    if (!customerId.trim()) {
      throw new Error("Customer id is required");
    }

    if (maxItems < 1) {
      throw new Error("Max items should be at least 1");
    }

    this.id = id;
    this.customerId = customerId;
    this.createdAt = new Date();
    this._maxItems = maxItems;
  }

  // ============================================================
  // PRIVATE HELPERS
  // ============================================================

  private validateItem(item: CartItem): void {
    if (!item.productId.trim()) {
      throw new Error("Product id is required");
    }

    if (!item.name.trim()) {
      throw new Error("Product name is required");
    }

    if (item.price <= 0) {
      throw new Error("Price must be positive");
    }

    if (item.quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }
  }

  private findItem(productId: string): CartItem | undefined {
    return this._items.find(
      item => item.productId === productId
    );
  }

  // ============================================================
  // PUBLIC BEHAVIOR METHODS
  // ============================================================

  addItem(item: CartItem): void {
    this.validateItem(item);

    const existingItem = this.findItem(item.productId);

    // If item already exists, increase quantity
    if (existingItem) {
      existingItem.quantity += item.quantity;
      return;
    }

    if (this._items.length >= this._maxItems) {
      throw new Error("Cart item limit exceeded");
    }

    // Defensive copy
    this._items.push({ ...item });
  }

  removeItem(productId: string): void {
    const itemIndex = this._items.findIndex(
      item => item.productId === productId
    );

    if (itemIndex === -1) {
      throw new Error("Item not found in cart");
    }

    this._items.splice(itemIndex, 1);
  }

  updateQuantity(
    productId: string,
    quantity: number
  ): void {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const item = this.findItem(productId);

    if (!item) {
      throw new Error("Item not found");
    }

    item.quantity = quantity;
  }

  applyCoupon(code: string): void {
    if (this._coupon !== null) {
      throw new Error(
        "Coupon already applied"
      );
    }

    if (!code || code.trim().length === 0) {
      throw new Error("Invalid coupon");
    }

    this._coupon = code.trim();
  }

  removeCoupon(): void {
    if (this._coupon === null) {
      throw new Error("No coupon applied");
    }

    this._coupon = null;
  }

  clear(): void {
    this._items.length = 0;
    this._coupon = null;
  }

  // ============================================================
  // SAFE GETTERS
  // ============================================================

  get items(): ReadonlyArray<CartItem> {
    // Defensive deep-ish copy
    return this._items.map(item => ({ ...item }));
  }

  get appliedCoupon(): string | null {
    return this._coupon;
  }

  get totalAmount(): number {
    return this._items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }

  get itemCount(): number {
    return this._items.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  get uniqueItemCount(): number {
    return this._items.length;
  }

  get isEmpty(): boolean {
    return this._items.length === 0;
  }
}