
export class Ingredient {

  constructor(public name: string,
              public value: number,
              public units: string) {
  }

  describe() {
    return `${this.describeValue()} ${this.name}`;
  }

  describeValue() {
    return `${this.value} ${this.units}`;
  }
}
