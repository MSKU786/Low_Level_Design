/*
Identifying classes
->User Class 
->Ticket Class
->Theatre Class
->Movie Class


*/

class Cinema {
  constructor(
    public id: string,
    public name: string,
    public city: City,
    public halls: Hall[]
  ) {}

  getShowsByMovie(movieId: string): Show[] {
    return this.halls.flatMap((hall) =>
      hall.shows.filter((show) => show.movie.id === movieId)
    );
  }
}

class Hall {
  constructor(
    public id: string,
    public name: string,
    public capacity: number,
    public shows: Show[]
  ) {}
}

class Movie {
  constructor(
    public id: string,
    public title: string,
    public language: string,
    public releaseDate: Date,
    public duration: number // in minutes
  ) {}
}

class City {
  constructor(public id: string, public name: string) {}
}

class Show {
  constructor(
    public id: string,
    public movie: Movie,
    public hall: Hall,
    public startTime: Date,
    public endTime: Date,
    public availableSeats: Seat[]
  ) {}
}

class Seat {
  constructor(
    public seatNumber: string,
    public type: 'VIP' | 'Regular',
    public isAvailable: boolean = true
  ) {}
}

class User {
  constructor(public id: string, public name: string, public email: string) {}

  bookTicket(show: Show, selectedSeats: string[]): Booking {
    const seats = show.availableSeats.filter((seat) =>
      selectedSeats.includes(seat.seatNumber)
    );
    if (seats.some((seat) => !seat.isAvailable)) {
      throw new Error('One or more selected seats are unavailable.');
    }
    return new Booking(this, show, seats, new Date());
  }
}

class Booking {
  constructor(
    public user: User,
    public show: Show,
    public seats: Seat[],
    public bookingTime: Date
  ) {
    this.confirmBooking();
  }

  confirmBooking(): void {
    this.seats.forEach((seat) => (seat.isAvailable = false));
    NotificationService.sendConfirmation(this);
  }
}

class MovieService {
  static searchMovies(
    title?: string,
    language?: string,
    releaseDate?: Date,
    cityName?: string,
    movies: Movie[],
    cinemas: Cinema[]
  ): Movie[] {
    return movies.filter((movie) => {
      const matchesTitle = title ? movie.title.includes(title) : true;
      const matchesLanguage = language ? movie.language === language : true;
      const matchesDate = releaseDate
        ? movie.releaseDate.toDateString() === releaseDate.toDateString()
        : true;
      const matchesCity = cityName
        ? cinemas.some((cinema) => cinema.city.name === cityName)
        : true;
      return matchesTitle && matchesLanguage && matchesDate && matchesCity;
    });
  }

  static getCinemasForMovie(
    movieId: string,
    cityName: string,
    cinemas: Cinema[]
  ): Cinema[] {
    return cinemas.filter(
      (cinema) =>
        cinema.city.name === cityName &&
        cinema.halls.some((hall) =>
          hall.shows.some((show) => show.movie.id === movieId)
        )
    );
  }
}

class BookingService {
  static bookSeats(user: User, show: Show, seatNumbers: string[]): Booking {
    return user.bookTicket(show, seatNumbers);
  }
}

class PaymentService {
  static processPayment(amount: number, user: User): boolean {
    console.log(`Processing payment of ₹${amount} for user: ${user.name}`);
    return true; // Mock payment success
  }
}

class NotificationService {
  static sendConfirmation(booking: Booking): void {
    console.log(`Booking confirmed for ${booking.user.name}`);
    console.log(
      `Seats booked: ${booking.seats.map((seat) => seat.seatNumber).join(', ')}`
    );
  }
}

// Setup sample data
const city = new City('1', 'Bangalore');
const movie = new Movie(
  '1',
  'Inception',
  'English',
  new Date('2010-07-16'),
  148
);

const seats = [
  new Seat('A1', 'VIP'),
  new Seat('A2', 'Regular'),
  new Seat('A3', 'Regular'),
];
const hall = new Hall('1', 'Hall 1', 100, [
  new Show('1', movie, null as any, new Date(), new Date(), seats),
]);
const cinema = new Cinema('1', 'PVR Cinemas', city, [hall]);

hall.shows[0].hall = hall; // Update hall reference in show

const user = new User('1', 'Manish', 'manish@example.com');

// User searches for a movie
const movies = [movie];
const cinemas = [cinema];
const foundMovies = MovieService.searchMovies(
  'Inception',
  'English',
  undefined,
  'Bangalore',
  movies,
  cinemas
);
console.log('Movies Found:', foundMovies);

// Display cinemas running the movie
const runningCinemas = MovieService.getCinemasForMovie(
  movie.id,
  'Bangalore',
  cinemas
);
console.log('Cinemas Running Movie:', runningCinemas);

// Book seats
try {
  const booking = BookingService.bookSeats(user, hall.shows[0], ['A1', 'A2']);
  PaymentService.processPayment(400, user); // Mock payment
} catch (error) {
  console.error(error.message);
}
