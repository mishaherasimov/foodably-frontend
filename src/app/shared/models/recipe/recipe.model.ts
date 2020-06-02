import { RecipeSection } from '../recipe-section.model';
import { PreparationStep } from './preparation-step.model';
import { Ingredient } from './ingredient.model';
import { Ranking } from '../ranking.model';
import { Type } from 'class-transformer';

export class Recipe {

  // @Type(() => RecipeSection)
  // public relatedRecipes: RecipeSection;
  @Type(() => Ranking)
  public ranking: Ranking;

  @Type(() => Ingredient)
  public ingredients: Ingredient[];

  @Type(() => PreparationStep)
  public instruction: PreparationStep[];

  get annotations(): string[] {
    return [this.type, this.cuisine, this.category];
  }

  get cookingTime(): string {
      return `${this.preparationTime} min.`;
  }

  // TOOD: Remove comments and load with comments request
  constructor(public videoURL: string,
              public previewURL: string,
              public title: string,
              public description: string,
              public cuisine: string,
              public category: string,
              public type: string,
              public isVeg: boolean,
              public preparationTime: number,
              ingredients: Ingredient[],
              instruction: PreparationStep[],
              ranking?: Ranking,
              public likes?: number,
              public author?: { name: string , id:any},
              public authorId?: string,
              public createdAt?: string,
              public relatedRecipes?: RecipeSection,
              public comments?: number,
              public id?: string) {

    this.ranking = ranking;
    this.ingredients = ingredients;
    this.instruction = instruction;
  }
}
