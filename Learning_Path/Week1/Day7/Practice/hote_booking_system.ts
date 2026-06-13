interface RoomAvailability {
  isAvailable: boolean;
  reason?: string;
}

class RoomValidator {
  checkRoomAvailablity(roomId: string): RoomAvailability {
    return {
      isAvailable: true,
      reason: "Room is available",
    };
  }
}

interface PaymentStrategy {
  processPayment(amount: number): Promise<void>;
}

interface CouponStrategy {
  applyDiscount(price: number): number;
}

interface PricingStrategy {
  calculatePrice(
    roomId: string,
    checkin: Date,
    checkout: Date,
    promo: CouponStrategy | null
  ): number;
}

interface PaymentProcessor {
  processPayment(
    amount: number,
    paymentMethod: PaymentStrategy
  ): Promise<void>;
}

interface BookingRepository {
  saveBooking(booking: Booking): Promise<void>;

  getBooking(bookingId: string): Promise<Booking | null>;
}

interface Notifier<K, V> {
  notify(key: K, value: V): Promise<void>;
}

class CustomerNotifier implements Notifier<Customer, string> {
  notify(customer: Customer, message: string): Promise<void> {
    return Promise.resolve();
  }
}

class HotelNotifier implements Notifier<Hotel, string> {
  notify(hotel: Hotel, message: string): Promise<void> {
    return Promise.resolve();
  }
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

class BookingService {
  constructor(
    private validator: RoomValidator,
    private pricing: PricingStrategy,
    private payment: PaymentProcessor,
    private repo: BookingRepository,
    private customerNotifier: CustomerNotifier,
    private hotelNotifier: HotelNotifier
  ) {}

  async bookRoom(params: {
    customer: Customer;
    roomId: string;
    checkin: Date;
    checkout: Date;
    promo: CouponStrategy | null;
    paymentMethod: PaymentStrategy;
  }) {
    const {
      customer,
      roomId,
      checkin,
      checkout,
      promo,
      paymentMethod,
    } = params;

    const availability =
      this.validator.checkRoomAvailablity(roomId);

    if (!availability.isAvailable) {
      throw new Error(availability.reason);
    }

    const price = this.pricing.calculatePrice(
      roomId,
      checkin,
      checkout,
      promo
    );

    await this.payment.processPayment(
      price,
      paymentMethod
    );

    const booking = new Booking(
      customer,
      roomId,
      checkin,
      checkout,
      price,
      paymentMethod
    );

    await this.repo.saveBooking(booking);

    await this.customerNotifier.notify(
      customer,
      `Booking confirmed for ${roomId}`
    );

    await this.hotelNotifier.notify(
      hotel,
      `Booking confirmed for ${roomId}`
    );

    return booking;
  }
}