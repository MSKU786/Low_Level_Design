// ============================================================
// YOUR CHALLENGE: Encapsulate this Shopping Cart properly
// Time Limit: ~30 minutes
// ============================================================

// This cart currently has ZERO protection.
// Anyone can directly mutate internal state and corrupt the cart.
//
// Your goal is to:
// 1. Protect internal state using proper access modifiers
// 2. Expose behavior methods instead of direct mutations
// 3. Enforce business invariants
// 4. Add safe computed getters
//
// NOTE:
// Do NOT fully redesign the system.
// Focus on encapsulation, invariants, and object-oriented design.

// ============================================================
// CURRENT PROBLEMATIC IMPLEMENTATION
// ============================================================

class ShoppingCart {
  readonly id: string;
  readonly customerId: string;
  private _items: CartItem[];

  protected coupon: string | null;

  readonly createdAt: Date;

  private _maxItems: number;

  constructor(id: string, customerId: string) {
    this.id = id;
    this.customerId = customerId;

    this._items = [];

    this.coupon = null;

    this.createdAt = new Date();

    this._maxItems = 20;
  }

  addItem(item: CartItem) : void {
    if (item.price < 0) {
      throw new Error("Negative Price")
    }

    if (item.quantity < 1) {
      throw new Error("Atleast one time should be present")
    }

    if (this._maxItems == this._items.length) {
      throw new Error("Maximum number of items added in cart")
    }

    this._items.push(item);
  }


  removeItem(item): void{
    this._items.filter(i => i.productId != item.productId)
  }


  updateQuantity(item, quantity): void {
    if (quantity < 1) {
      throw new Error("Quantity can't be zero")
    }
    this._items.forEach(i => {
      if (i.productId == item.productId) {
        i.quantity = quantity;
      }
    })
  }

  applyCoupon(code: string): void {
    if (this.coupon !== null) {
      throw new Error("A coupon is already applied. Remove it before applying a new one.");
    }
  
    if (!code || code.trim().length === 0) {
      throw new Error("Invalid coupon code.");
    }
  
    this.coupon = code.trim();
  }
  
  removeCoupon(): void {
    if (this.coupon === null) {
      throw new Error("No coupon is currently applied.");
    }
  
    this.coupon = null;
  }
  
  // Safe getter — read only, no direct mutation
  get appliedCoupon(): string | null {
    return this.coupon;
  }

  clear() {
    this._items = [];
  }


  get items(): CartItem[] {
    return this._items;
  }

  get totalAmount(): number {
    return this._items.reduce((sum, item) =>  sum += item.price*item.quantity, 0)
  }


  get itemCount(): number {
    return this._items.reduce((num, item) => num+=item.quantity, 0)
  }

  get isEmpty(): boolean {
    return this._items.length == 0
  }
}

// ============================================================
// CART ITEM
// ============================================================

interface CartItem {
  productId: string;

  name: string;

  price: number;

  quantity: number;
}

// ============================================================
// CURRENT ISSUES
// ============================================================

// Anyone can directly mutate the cart state.

const cart = new ShoppingCart("c1", "user1");

// ❌ Negative pricing
cart.items.push({
  productId: "x",
  name: "Free TV",
  price: -500,
  quantity: 1,
});

// ❌ Entire cart wiped externally
cart.items = [];

// ❌ Business limits bypassed
cart.maxItems = 999999;

// ❌ Cart ownership changed
cart.id = "someone-elses-cart";

// ❌ Invalid coupon applied directly
cart.coupon = "FAKE_100_PERCENT";

// ❌ Time manipulation
cart.createdAt = new Date(0);

// ============================================================
// WHAT YOU NEED TO DO
// ============================================================

// 1. Protect fields using appropriate modifiers
// ------------------------------------------------------------
// Think carefully about:
// - private
// - readonly
// - protected
//
// Which fields should NEVER change?
// Which fields should ONLY change through methods?

// 2. Replace direct mutations with behavior methods
// ------------------------------------------------------------
//
// Implement methods such as:
//
// - addItem()
// - removeItem()
// - updateQuantity()
// - applyCoupon()
// - removeCoupon()
// - clear()

// 3. Enforce these invariants
// ------------------------------------------------------------
//
// ✅ Price must always be positive
//
// ✅ Quantity must be at least 1
//
// ✅ Total items cannot exceed maxItems
//
// ✅ Coupon can only be applied once
//    (but may be removed and reapplied later)

// 4. Add safe computed getters
// ------------------------------------------------------------
//
// Add getters for:
//
// - items       -> should return a COPY
// - total       -> computed total price
// - itemCount   -> computed item count
// - isEmpty     -> computed boolean

// 5. Design Question
// ------------------------------------------------------------
//
// Should CartItem.quantity be mutable from outside?
//
// OR
//
// Should the ShoppingCart fully control quantity updates?
//
// Think carefully about encapsulation boundaries.

// ============================================================
// IMPORTANT
// ============================================================
//
// Do NOT expose mutable internal arrays.
//
// Do NOT allow invalid state transitions.
//
// The object should ALWAYS remain valid.
//
// Focus on:
// - Encapsulation
// - Invariants
// - OOP design
// - Defensive programming