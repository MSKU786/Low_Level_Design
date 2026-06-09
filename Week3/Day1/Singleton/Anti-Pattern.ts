// Anti Pattern using singleton to avoid depedency injection 

class OrderService {
  placeOrder(items: CartItem[]) {
    const db = DatabasePool.getInstance();
    const logger = AppLogger.getInstance();
    const config = AppConfig.getInstance();
  }

  // Problem:
  // Hidden dependency - can't seee them from constructor
  // Can't test - can't swap with fakes
  // DIP violation - depenends on concerete singleton
  // Tight Coupling = changing any singleton brekas this c