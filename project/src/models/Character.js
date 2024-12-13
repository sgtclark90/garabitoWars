export class Character {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.inventory = [];
    this.location = 'Starting Point';
  }

  addItem(item) {
    this.inventory.push(item);
  }

  removeItem(item) {
    const index = this.inventory.indexOf(item);
    if (index > -1) {
      this.inventory.splice(index, 1);
    }
  }

  updateHealth(amount) {
    this.health = Math.max(0, Math.min(100, this.health + amount));
    return this.health;
  }

  setLocation(location) {
    this.location = location;
  }
}