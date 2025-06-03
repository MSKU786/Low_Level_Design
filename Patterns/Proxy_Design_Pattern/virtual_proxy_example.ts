// Real Subject
class Image {
  filename: string;
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk();
  }

  loadFromDisk() {
    console.log(`Loading ${this.filename} from disk...`);
  }

  display() {
    console.log(`Displaying ${this.filename}`);
  }
}

// Proxy
class ImageProxy {
  filename: string;
  realImage: typeof Image | null;
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }

  display() {
    if (this.realImage === null) {
      this.realImage = new Image(this.filename); // Lazy initialization
    }
    this.realImage?.display();
  }
}

// Usage
const image = new ImageProxy('myPhoto.png');
console.log('Image created');
image.display(); // Loads from disk and displays
image.display(); // Just displays, as it's already loaded
