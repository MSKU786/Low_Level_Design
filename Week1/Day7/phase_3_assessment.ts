/**
 * ============================================
 * MOVIE TICKET BOOKING SYSTEM
 * SOLID + LLD Design
 * ============================================
 */


/**
 * ============================================
 * DOMAIN MODELS
 * ============================================
 */

enum SeatType {
  REGULAR,
  PREMIUM,
  VIP
}

enum PaymentMethod {
  CREDIT_CARD,
  DEBIT_CARD,
  WALLET,
  NET_BANKING
}

class Seat {
  constructor(
    public id: string,
    public type: SeatType,
    public row: number,
    public number: string,
    public booked: boolean = false
  ) {}
}

class Movie {
  constructor(
    public id: string,
    public title: string,
    public genre: string[],
    public duration: number
  ) {}
}

class Show {
  constructor(
    public id: string,
    public movie: Movie,
    public startTime: Date,
    public theatreId: string,
    public seats: Seat[]
  ) {}
}

class Ticket {
  constructor(
    public id: string,
    public bookingId: string,
    public seats: Seat[],
    public totalAmount: number
  ) {}
}

class Booking {
  constructor(
    public id: string,
    public userId: string,
    public showId: string,
    public seats: Seat[],
    public totalAmount: number,
    public paymentStatus: string
  ) {}
}


/**
 * ============================================
 * REPOSITORIES (DIP)
 * ============================================
 */

interface MovieRepository {
  search(keyword: string, date: Date): Promise<Movie[]>;
}

interface ShowRepository {
  findById(showId: string): Promise<Show>;
}

interface BookingRepository {
  save(booking: Booking): Promise<void>;
}

interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
}


/**
 * ============================================
 * SEAT MANAGEMENT
 * SRP → only manages seat availability/locking
 * ============================================
 */

interface SeatManager {
  validateAvailability(
    showId: string,
    seatIds: string[]
  ): Promise<boolean>;

  lockSeats(
    showId: string,
    seatIds: string[]
  ): Promise<void>;

  releaseSeats(
    showId: string,
    seatIds: string[]
  ): Promise<void>;
}


/**
 * ============================================
 * SEAT PRICING STRATEGY (OCP)
 * ============================================
 */

interface SeatPricingStrategy {
  calculatePrice(basePrice: number): number;
}

class RegularPricing implements SeatPricingStrategy {
  // OCP → new seat pricing can be added without modifying existing code
  calculatePrice(basePrice: number): number {
    return basePrice;
  }
}

class PremiumPricing implements SeatPricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 1.5;
  }
}

class VIPPricing implements SeatPricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 2;
  }
}


/**
 * ============================================
 * PAYMENT STRATEGY (OCP)
 * ============================================
 */

interface PaymentStrategy {
  processPayment(amount: number): Promise<void>;
}

class CreditCardPayment implements PaymentStrategy {
  // OCP → new payment methods can be added easily
  constructor(private cardNumber: string) {}

  async processPayment(amount: number): Promise<void> {
    console.log("Processing credit card payment:", amount);
  }
}

class DebitCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  async processPayment(amount: number): Promise<void> {
    console.log("Processing debit card payment:", amount);
  }
}

class WalletPayment implements PaymentStrategy {
  constructor(private walletId: string) {}

  async processPayment(amount: number): Promise<void> {
    console.log("Processing wallet payment:", amount);
  }
}

class NetBankingPayment implements PaymentStrategy {
  constructor(private bankName: string) {}

  async processPayment(amount: number): Promise<void> {
    console.log("Processing net banking payment:", amount);
  }
}


/**
 * ============================================
 * PAYMENT FACTORY
 * SRP → runtime payment selection
 * ============================================
 */

class PaymentFactory {
  static getPaymentMethod(
    method: PaymentMethod
  ): PaymentStrategy {

    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return new CreditCardPayment("1234");

      case PaymentMethod.DEBIT_CARD:
        return new DebitCardPayment("5678");

      case PaymentMethod.WALLET:
        return new WalletPayment("paytm-user");

      case PaymentMethod.NET_BANKING:
        return new NetBankingPayment("HDFC");

      default:
        throw new Error("Unsupported payment method");
    }
  }
}


/**
 * ============================================
 * COUPON STRATEGY (OCP)
 * ============================================
 */

interface CouponStrategy {
  applyCoupon(amount: number): number;
}

class PercentageCoupon implements CouponStrategy {
  // OCP → easy to add new coupon types
  constructor(private percentage: number) {}

  applyCoupon(amount: number): number {
    return amount - (amount * this.percentage) / 100;
  }
}

class FlatCoupon implements CouponStrategy {
  constructor(private discount: number) {}

  applyCoupon(amount: number): number {
    return amount - this.discount;
  }
}

class BuyOneGetOneCoupon implements CouponStrategy {
  applyCoupon(amount: number): number {
    return amount / 2;
  }
}

class FirstTimeUserCoupon implements CouponStrategy {
  applyCoupon(amount: number): number {
    return amount - 200;
  }
}


/**
 * ============================================
 * NOTIFICATION TYPES
 * ============================================
 */

type EmailMessage = {
  to: string;
  subject: string;
  body: string;
};

type SMSMessage = {
  phone: string;
  text: string;
};

type DashboardAlert = {
  theatreId: string;
  message: string;
};


/**
 * ============================================
 * NOTIFIER ABSTRACTION (ISP + DIP)
 * ============================================
 */

interface Notifier<T> {
  send(message: T): Promise<void>;
}

class EmailNotifier implements Notifier<EmailMessage> {
  // DIP → depends on abstraction
  async send(message: EmailMessage): Promise<void> {
    console.log("EMAIL:", message.subject);
  }
}

class SMSNotifier implements Notifier<SMSMessage> {
  async send(message: SMSMessage): Promise<void> {
    console.log("SMS:", message.text);
  }
}

class DashboardNotifier implements Notifier<DashboardAlert> {
  async send(message: DashboardAlert): Promise<void> {
    console.log("DASHBOARD ALERT:", message.message);
  }
}


/**
 * ============================================
 * NOTIFICATION SERVICE
 * SRP → handles all notifications
 * ============================================
 */

class NotificationService {
  constructor(
    private emailNotifier: Notifier<EmailMessage>,
    private smsNotifier: Notifier<SMSMessage>,
    private dashboardNotifier: Notifier<DashboardAlert>
  ) {}

  async sendBookingConfirmation(
    booking: Booking
  ): Promise<void> {

    await this.emailNotifier.send({
      to: "customer@gmail.com",
      subject: "Booking Confirmed",
      body: `Booking successful for ${booking.id}`
    });

    await this.smsNotifier.send({
      phone: "9999999999",
      text: `Your booking ${booking.id} is confirmed`
    });

    await this.dashboardNotifier.send({
      theatreId: "THEATRE_1",
      message: `New booking created: ${booking.id}`
    });
  }
}


/**
 * ============================================
 * PRICE CALCULATOR
 * SRP → pricing responsibility only
 * ============================================
 */

class PriceCalculator {
  calculateTotal(
    seats: Seat[],
    pricingMap: Map<SeatType, SeatPricingStrategy>,
    basePrice: number
  ): number {

    let total = 0;

    for (const seat of seats) {
      const strategy = pricingMap.get(seat.type)!;
      total += strategy.calculatePrice(basePrice);
    }

    return total;
  }
}


/**
 * ============================================
 * BOOKING ORCHESTRATOR
 * SRP → orchestration only
 * ============================================
 */

class BookingOrchestrator {

  // DIP → depends only on abstractions
  constructor(
    private movieRepo: MovieRepository,
    private showRepo: ShowRepository,
    private bookingRepo: BookingRepository,
    private ticketRepo: TicketRepository,
    private seatManager: SeatManager,
    private notificationService: NotificationService,
    private priceCalculator: PriceCalculator
  ) {}

  async searchMovie(
    keyword: string,
    date: Date
  ): Promise<Movie[]> {
    return this.movieRepo.search(keyword, date);
  }

  async bookTickets(
    userId: string,
    showId: string,
    seatIds: string[],
    paymentMethod: PaymentMethod,
    coupon: CouponStrategy
  ): Promise<Ticket> {

    /**
     * Step 1 → Validate seats
     */
    const available =
      await this.seatManager.validateAvailability(
        showId,
        seatIds
      );

    if (!available) {
      throw new Error("Seats not available");
    }

    /**
     * Step 2 → Lock seats
     */
    await this.seatManager.lockSeats(showId, seatIds);

    try {

      /**
       * Step 3 → Fetch show
       */
      const show = await this.showRepo.findById(showId);

      const selectedSeats =
        show.seats.filter(s => seatIds.includes(s.id));

      /**
       * Step 4 → Pricing
       */
      const pricingMap =
        new Map<SeatType, SeatPricingStrategy>();

      pricingMap.set(
        SeatType.REGULAR,
        new RegularPricing()
      );

      pricingMap.set(
        SeatType.PREMIUM,
        new PremiumPricing()
      );

      pricingMap.set(
        SeatType.VIP,
        new VIPPricing()
      );

      let totalAmount =
        this.priceCalculator.calculateTotal(
          selectedSeats,
          pricingMap,
          200
        );

      /**
       * Step 5 → Apply coupon
       */
      totalAmount =
        coupon.applyCoupon(totalAmount);

      /**
       * Step 6 → Payment
       */
      const paymentProcessor =
        PaymentFactory.getPaymentMethod(paymentMethod);

      await paymentProcessor.processPayment(totalAmount);

      /**
       * Step 7 → Create booking
       */
      const booking = new Booking(
        "BOOKING_1",
        userId,
        showId,
        selectedSeats,
        totalAmount,
        "SUCCESS"
      );

      await this.bookingRepo.save(booking);

      /**
       * Step 8 → Generate ticket
       */
      const ticket = new Ticket(
        "TICKET_1",
        booking.id,
        selectedSeats,
        totalAmount
      );

      await this.ticketRepo.save(ticket);

      /**
       * Step 9 → Send notifications
       */
      await this.notificationService
        .sendBookingConfirmation(booking);

      return ticket;

    } catch (error) {

      /**
       * Release seats on failure
       */
      await this.seatManager.releaseSeats(
        showId,
        seatIds
      );

      throw error;
    }
  }
}


/**
 * ============================================
 * COMPOSITION ROOT (PROD)
 * ============================================
 */

const emailNotifier =
  new EmailNotifier();

const smsNotifier =
  new SMSNotifier();

const dashboardNotifier =
  new DashboardNotifier();

const notificationService =
  new NotificationService(
    emailNotifier,
    smsNotifier,
    dashboardNotifier
  );

/**
 * In real systems these would be actual DB-backed repos
 */
const movieRepo = {} as MovieRepository;
const showRepo = {} as ShowRepository;
const bookingRepo = {} as BookingRepository;
const ticketRepo = {} as TicketRepository;
const seatManager = {} as SeatManager;

const bookingSystem =
  new BookingOrchestrator(
    movieRepo,
    showRepo,
    bookingRepo,
    ticketRepo,
    seatManager,
    notificationService,
    new PriceCalculator()
  );


/**
 * ============================================
 * COMPOSITION ROOT (TEST)
 * ============================================
 */

class FakeMovieRepository
  implements MovieRepository {

  // DIP → testable fake implementation
  async search(): Promise<Movie[]> {
    return [];
  }
}