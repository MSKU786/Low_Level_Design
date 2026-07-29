// without flyweight - every character stores everythting

class Character {
  constructor(
    public char: string, // unique per character
    public x: number, // unique per charcater
    public y: number, // uniqe per character
    public fontFamily: string, // Same for most character
    public fontSize: number, // Same for most character
    public bold: boolean, // Same for most character
    public italic: boolean, // Same for most character
    public color: string, // Same for most character
    public fontData: ArrayBuffer, // // Same for most character
  ) {}
}

// A 100-page documment with 300000 characters
// 30000 * 50KB fone data + sytling - 15 gb of memory

// But 99% characters share the same font size and color
// We are duplication g50KB of font data 300000 times
