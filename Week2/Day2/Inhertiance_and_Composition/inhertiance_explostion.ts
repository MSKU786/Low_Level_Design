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