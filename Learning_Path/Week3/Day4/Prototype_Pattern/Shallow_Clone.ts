// Shallow clone - copies refernces , not values

class UserProfile {
  name: string;
  settings: { theme: string; fontSize: number };
  premissions: string[];

  clone(): UserProfile {
    const copy = Object.create(Object.getPrototypeOf(this));
    Object.assign(copy, this);
    return copy;
  }
}

const original = new UserProfile();
original.name = 'Rahul';
original.settings = { theme: 'dark', fontSize: 1 };
original.premissions = ['read', 'write'];

const clone = original.clone();
clone.name = 'Priya';

clone.settings.theme = 'light';
console.log(original.settings.theme);

clone.premissions.push('admin');
console.log(original.premissions);
