/*
Identifying classes
->User Class 
->Ticket Class
->Theatre Class
->Movie Class


*/

enum SeatType {
  'Gold',
  'Platinum',
  'Recliner',
}

enum Genre {
  'Horror',
  'Romantic',
  'Comedy',
  'Action',
  'Suspense',
  'Sci-fi',
}

interface User {}

class PVR {
  id: string;
  numOfSeats: number;
  seats: SeatType[];
  movies: Movie[];

  getAllMovies() {
    return this.movies;
  }
}

class Theatre {
  id: string;
  pvrList: PVR[];
  address: string;
}

class Movie {
  genre: Genre[];
  duration: string;
  startTime: string;
}
