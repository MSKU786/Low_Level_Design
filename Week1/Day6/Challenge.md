# Day 6 — Combined Challenge

## Design a Food Delivery Order System

Apply all 5 SOLID principles to design and implement a real-world food delivery system. Start from raw requirements, produce TypeScript interfaces and classes.

**Target:** 45–60 minutes

---

## Business Requirements

### 1. Order Placement
A customer selects items from a restaurant menu and places an order. The system must:
- Validate the order (restaurant is open, items are available, minimum order met)
- Calculate the total with taxes and delivery fee
- Process payment
- Persist the order

---

### 2. Pricing & Discounts
The system supports multiple discount types:
- Percentage off
- Flat amount off
- Free delivery
- Buy-2-get-1-free

New discount types are added every few weeks by the marketing team.

Delivery fees vary by method:
- Standard (flat fee)
- Express (distance-based)
- Scheduled (time-slot based)

---

### 3. Payment Processing
Currently supports:
- UPI
- Credit card
- Cash-on-delivery (COD)

New payment methods are added periodically.

Each method has different validation rules:
- UPI → requires valid VPA
- Credit card → requires CVV + expiry
- COD → has a max order limit

Payment can:
- Succeed
- Fail
- Require retry

---

### 4. Notifications
After order placement:
- Send confirmation to customer (push + SMS)
- Notify the restaurant (email + dashboard)
- Alert the nearest delivery partner (push)

Different recipients get different channels — the system should **not be hardcoded to any one channel**.

---

### 5. Order Tracking
Orders move through states:


Other possibilities:
- Cancelled (only before "preparing")
- Failed (payment failure)

State transitions must be validated:
- You **cannot** go from "delivered" back to "preparing"

---

## Where Each SOLID Principle Must Appear

### SRP (Single Responsibility Principle)
Each class should have exactly one reason to change.

Separate concerns:
- Validation
- Pricing
- Payment
- Notification
- Persistence

---

### OCP (Open/Closed Principle)
Adding a new:
- Discount type
- Payment method
- Delivery fee model

Should require **zero changes to existing code**.

👉 Strategy pattern is your friend.

---

### LSP (Liskov Substitution Principle)
Every payment method must honor the payment interface contract.

Example:
- COD has a max order limit — handle this **without breaking substitutability**

---

### ISP (Interface Segregation Principle)
Notification recipients need different channel combinations:
- Customer → push + SMS
- Restaurant → email + dashboard

👉 Do NOT force one fat notification interface on all.

---

### DIP (Dependency Inversion Principle)
`OrderService` should have:
- Zero imports from payment gateways
- Zero imports from notification providers
- Zero imports from database clients

👉 All infrastructure should be behind interfaces.

---

## Approach Suggestion

1. Start with interfaces (10 min)  
2. Build the state machine for order tracking (10 min)  
3. Create specialist classes (15 min)  
4. Build orchestrator + composition root (10 min)  
5. Review against all 5 SOLID principles (5 min)

---

## What Makes Day 6 Different

There’s no "before" code to refactor.

You’re designing from a blank slate.

👉 This tests whether you can **think in SOLID from the start**, not just fix violations later.

---

## Things to Watch Out For

### 1. COD Payment Limit is an LSP Trap
Cash-on-delivery has a max order amount.

Make sure:
- You don’t break the payment abstraction
- You still respect substitutability