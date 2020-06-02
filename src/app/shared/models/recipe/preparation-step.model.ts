import { Ingredient } from './ingredient.model';
import { Type } from 'class-transformer';

export class PreparationStep {

  @Type(() => Ingredient)
  public ingredients: Ingredient[];

  constructor(public description: string,
              ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  describeIngredients() {
    return this.ingredients.map(i => i.describe()).join(' | ');
  }
}
