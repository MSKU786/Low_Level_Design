class Character {
  move() {
    console.log("Walking.....")
  }
}

class Warrior extends Character {
  attack() {
    console.log("Sword slash")
  }
}


class Mage extends Character {
  castSpell() {
    console.log("Fireball...")
  }
}

class Archer extends Character {
  shoot() {
    console.log("Arrow Shot...")
  }
}

// Then the requirements grow...
// We need a magewarrior that can slash and cast
// We need a mounted Acher that rides instead of walks 

// Class explosioin begins:

class MageWarrior extends Warrior {
  castSpell() {
    console.log("Fireballl")
  }
}

class MountedArcher extends Archer {
  move() {
    console.log("Riding horse")
  }
}


// The problem with the inheritance approach..


// Problem 1: Code depulication
// Magewarrior copies castSpell() from Mage. 
// Fix a bug in Mage.castSpell()? Must fix magewarrior too.
// And MageArcher. and MagePaladin.


// Problem 2: Combinatorial Explosion
// 4 attack type * 3 movement types * 2 defence types
// = 24 classes just for combination


// Problem 3: No runtime changes
// Character picks up a magin staff mid-game?
// Can't become a MageWarrior at runtime --
// class is fixed at construction time


// Problem 4: Fragile base class
// Change Character.move() - breaks MountArcher
// because MountedArcher overrides moves() and might
// depend on the old behaviour via super.move()


// Problem 5: Forced inheritance of unwanted behaviour
// What about a Ghost that can cast spells but can't move?
// It inhertis move() from Character. Overrides with throw? 
// That's an LSP violations from Day 3!