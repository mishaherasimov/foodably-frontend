import { FormArray, FormControl } from '@angular/forms';
import { Recipe } from '../../shared/models/recipe/recipe.model';

export class RecipeForm {

  title = new FormControl();
  category = new FormControl();
  videoURL = new FormControl();
  previewURL = new FormControl();
  description = new FormControl();
  cuisine = new FormControl();
  type = new FormControl();
  isVeg = new FormControl(false);
  preparationTime = new FormControl(1);
  ingredients = new FormArray([]);
  instruction = new FormArray([]);

  constructor(recipe: Recipe) {
    if (recipe.title) {
      this.title.setValue(recipe.title);
    }

    if (recipe.category) {
      this.category.setValue(recipe.category);
    }

    if (recipe.videoURL) {
      this.videoURL.setValue(recipe.videoURL);
    }

    if (recipe.previewURL) {
      this.previewURL.setValue(recipe.previewURL);
    }

    if (recipe.description) {
      this.description.setValue(recipe.description);
    }

    if (recipe.cuisine) {
      this.cuisine.setValue(recipe.cuisine);
    }

    if (recipe.type) {
      this.type.setValue(recipe.type);
    }

    if (recipe.isVeg) {
      this.isVeg.setValue(recipe.isVeg);
    }

    if (recipe.preparationTime) {
      this.preparationTime.setValue(recipe.preparationTime);
    }

    if (recipe.ingredients) {
      this.ingredients.setValue(recipe.ingredients);
    }

    if (recipe.instruction) {
      this.instruction.setValue(recipe.instruction);
    }
  }
}
