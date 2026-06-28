// YOUR CHALLENGE: Build a game level editor with prototypes

// Time: 30 minutes

// You're building a 20 game level editor. Levels are built from
// pre-configured "prefab" objects that users can clone and place.
// PART A: Create Cloneable game objects

//1. GameObject (base) has position (x, y), size (w, h), layer (number)
// 2. Enemy extends GameObject, has health, speed, patrol path (array of (x,y) point
// 3. Platform //extends GameObject, has material ("wood" | "stone" | "ice"), has properties { friction: number, breakable: boolean }
// 4. Collectible extends GameObject, has type ("coin" | "gem" | "powerup"),
//has value (number)
// Each must implement clone() with PROPER deep cloning.
// The patrol path array and properties object must be deep cloned.

// PART B: Prefab registry
// Create a PrefabRegistry that stores named prototypes:
// registry.register("skeleton", new Enemy(...))
// registry.register("wooden-platform", new Platform(...))
//
// const enemy registry.create("skeleton") // fresh deep clone

// PART C: Level building

// A Level has a list of GameObjects. Build a small level:
//Clone 5 enemies from "skeleton" prefab, place at different positions
//
// Clone 3 platforms from "wooden-platform" prefab, different positions
//Modify one enemy's health without fecting others
// Modify one platform's properties out affecting the prefab

interface GameObject {
  position: { x: number; y: number };
  size: { w: number; y: number };
  layer: number;
}

interface Clonable<T> {
  clone(): T;
}

type position = { x: number; y: number };
type size = { w: number; h: number };

class Enemy implements GameObject, Clonable<Enemy> {
  constructor(
    public position: { x: number; y: number },
    public size: { w: number; h: number },
    public layer: number,
    public health: number,
    public speed: number,
    public patrolPath: { x: number; y: number }[],
  ) {}

  clone(): Enemy {
    return new Enemy(
      { x: this.position.x, y: this.position.y },
      { w: this.size.w, h: this.size.h },
      this.layer,
      this.health,
      this.speed,
      this.patrolPath.map((point) => ({ x: point.x, y: point.y })),
    );
  }
}

class Platform implements GameObject, Clonable<Platform> {}
