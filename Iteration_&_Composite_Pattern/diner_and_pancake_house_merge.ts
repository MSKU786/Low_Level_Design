class MenuItem {
  name: string;
  description: string;
  vegetarion: boolean;
  price: number;

  constructor(
    name: string,
    description: string,
    vegetarion: boolean,
    price: number
  ) {
    this.name = name;
    this.description = description;
    this.vegetarion = vegetarion;
    this.price = price;
  }
}
