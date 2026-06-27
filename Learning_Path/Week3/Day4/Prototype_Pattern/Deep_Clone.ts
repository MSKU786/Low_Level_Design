interface Clonable<T> {
  clone(): T;
}

class UserProfile implements Clonable<UserProfile> {
  constructor (
    public name: string,
    public settings: {theme: string, fontSize: number},
    public permissions: string[],
    public metadata: Map<string, string>
  ) {}

  clone(): UserProfile {
    return new UserProfile {
      this.name,
      {...this.settings},
      [...this.permissions],
      new Map(this.metadata)
    }
  }
}


const original = new UserProfile (
  "Rahul", 
  {theme: "dark", fontSize: 14},
  ["read", "write"],
  new Map([["role", "admin"]])
)


const clone = original.clone();
clone.name = "Priya"
clone.settings.theme = "light"
clone.premissions.push("admin");

