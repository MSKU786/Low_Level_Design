interface RoomAvailability {
  isAvailable: boolean;
  reason?: string;
}

interface RoomValidator {
  checkRoomAvailablity(roomId: string): RoomAvailability;
}

class DefaultRoomValidator implements RoomValidator {
  checkRoomAvailablity(roomId: string): RoomAvailability {
    return {
      isAvailable: true,
      reason: 'Room is available',
    };
  }
}

interface PaymentStrategy {
  processPayment(amount: number): Promise<void>;
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
}