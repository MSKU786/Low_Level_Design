enum SeatType {
  REGULAR,
  PRMEIMUM, 
  VIP
}

class Seat {
  type: SeatType
  row: number
  booked: boolean
  number: string
}

class Ticket {
  id: string
  seats: Seat[]
  movie: Movie
}

class Theatre {
  id: string
  seatMap: Seat[][]
}

class Movie {
  name: string
  genre: string[]
  title: string
  showTime: TimeRanges
  duration: string

}

interface PaymentStrategy {
  processPayment(amount: number)
}

class MovieFinder {
  static search(keyword, date) {}
}



class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber) {}
  processPayment(amount: number) {
    return ;
  }
}

class NetBanking implements PaymentStrategy {
  constructor() {}
  processPayment(amount: number) {
    return;
  }
}


interface CouponsStrategy {
  applyCoupoun() 
}


interface Notifier {
  
}

class BookingSystem {

  searchMovie(keyword, date) {
    return MovieFinder.search(keyword, date)
  }

  bookTickets(movie) {

  }
}
