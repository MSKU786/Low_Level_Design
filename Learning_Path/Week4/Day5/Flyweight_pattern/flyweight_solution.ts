// Fly weight - separate shard data from uniqe data

// Intrinisic state, shared imuutable stores once
class CharacterStyle {
  constructor(
    public readonly fontFamily: string,
    public readonly fontSize: number,
    public readonly bold: boolean,
    public readonly italic: boolean,
    public readonly color: string,
    public readonly fontData: ArrayBuffer,
  ) {}
}

// Fly weight factory - creates and caches shared styles

class StyleFactory {
  private cache = new Map<string, CharacterStyle>();

  getStyle(
    fontFamily: string,
    fontSize: number,
    bold: boolean,
    italic: boolean,
    color: string,
  ): CharacterStyle {
    // Geneatye a uniq key from the properties

    const key = `${fontFamily}-${fontSize}-${bold}-${italic}=${color}`;

    if (!this.cache.has(key)) {
      const fontData = this.loadFont(fontFamily, bold, italic);
      this.cache.set(
        key,
        new CharacterStyle(fontFamily, fontSize, bold, italic, color, fontData),
      );
    }

    return this.cache.get(key)!;
  }

  private loadFont(
    family: string,
    bold: boolean,
    italic: boolean,
  ): ArrayBuffer {
    console.log(`Loading font: ${family} bold = ${bold} italic=${italic}`);
    return new ArrayBuffer(50000);
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

class Character {
  constructor(
    public char: string,
    public x: number,
    public y: number,
    public readonly style: CharacterStyle,
  ) {}

  render(): void {
    console.log(`Render '${this.char}' at (${this.x}, ${this.y})`) +
      `font=${this.style.fontFamily} size=${this.style.fontSize}`;
  }
}

const facotry = new StyleFactory();

const normalStyle = facotry.getStyle('Arial', 14, false, false, '#333');
const boldStyle = facotry.getStyle('Arail', 14, true, false, '#333');
const headingStyle = facotry.getStyle('Arial', 24, true, false, '#111');

const chars: Character[] = [];

chars.push(new Character('H', 0, 0, headingStyle));
chars.push(new Character('e', 20, 0, headingStyle));
chars.push(new Character('i', 40, 0, headingStyle));

console.log(`Style caches: ${facotry.getCacheSize()}`);
