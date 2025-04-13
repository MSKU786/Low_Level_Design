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

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  isVegetarian(): boolean {
    return this.vegetarion;
  }
}

interface Menu {
  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number
  ): void;
  getMenuItems(): MenuItem[];
}

class PancakeHouseMenu implements Menu {
  private menuItems: MenuItem[];

  constructor() {
    this.menuItems = new Array();
    this.addItem(
      "K&B's Pancake Breakfast",
      'Pancakes with scrambled eggs, and toast',
      true,
      2.99
    );
    this.addItem(
      'Regular Pancake Breakfast',
      'Pancakes with fried eggs, sausage',
      false,
      2.99
    );
    this.addItem(
      'Blueberry Pancakes',
      'Pancakes made with fresh blueberries',
      true,
      3.49
    );
    this.addItem(
      'Waffles',
      'Waffles, with your choice of blueberries or strawberries',
      true,
      3.59
    );
  }

  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number
  ): void {
    const menuItem = new MenuItem(name, description, vegetarian, price);
    this.menuItems.push(menuItem);
  }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}

class DinerMenu implements Menu {
  private menuItems: MenuItem[];
  private numberOfItems: number = 0;
  private readonly MAX_ITEMS: number = 6;

  constructor() {
    this.menuItems = new Array(this.MAX_ITEMS);
    this.addItem(
      'Vegetarian BLT',
      "(Fakin') Bacon with lettuce & tomato on whole wheat",
      true,
      2.99
    );
    this.addItem(
      'BLT',
      'Bacon with lettuce & tomato on whole wheat',
      false,
      2.99
    );
    this.addItem(
      'Soup of the day',
      'Soup of the day, with a side of potato salad',
      false,
      3.29
    );
    this.addItem(
      'Hotdog',
      'A hot dog, with saurkraut, relish, onions, topped with cheese',
      false,
      3.05
    );
  }

  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number
  ): void {
    if (this.numberOfItems >= this.MAX_ITEMS) {
      console.log("Sorry, menu is full! Can't add item to menu");
      return;
    }
    const menuItem = new MenuItem(name, description, vegetarian, price);
    this.menuItems[this.numberOfItems] = menuItem;
    this.numberOfItems++;
  }

  getMenuItems(): MenuItem[] {
    return this.menuItems.slice(0, this.numberOfItems);
  }
}
