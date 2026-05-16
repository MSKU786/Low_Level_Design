// Composition behaviour are objects not parent classes


interface AttackBehaviour{
  attack(): void;
}

interface MovementBehaviour{
  move(): void;
}

interface SpecialAbility{
  use(): void;
}



class SwordAttack implements AttackBehaviour {
  attack(): void {
    console.log("Sword attack")
  }
}


class BowAttack implements AttackBehaviour {
  attack(): void {
    console.log("Bow shot")
  }
}


class SpellAttack implements AttackBehaviour {
  attack(): void {
    console.log("Fireball Attack")
  }
}


class Walking implements MovementBehaviour {
  move(): void {
    console.log("Walking")
  }
}

class Fly implements MovementBehaviour {
  move(): void {
    console.log("Flying")
  }
}


class Riding implements MovementBehaviour {
  move(): void {
    console.log("Riding Horse")
  }
}

class HealAbility implements SpecialAbility {
  use(): void {
    console.log("Heal 100%")
  }
}



class Character {
  constructor(
    public readonly name: string,
    private attackType: AttackBehaviour,
    private movementType: MovementBehaviour,
    private specialAbility: SpecialAbility
  ){}

  attack() {
    this.attackType.attack()
  }

  move() {
    this.movementType.move()
  }

  useSpecial() {
    this.specialAbility.use()
  }
}