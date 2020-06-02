import { FormControl } from '@angular/forms';
import { Ingredient } from '../../../shared/models/recipe/ingredient.model';

export class IngredientForm {

  name = new FormControl();
  value = new FormControl();
  units = new FormControl();

  constructor(ingredient: Ingredient) {

    this.name.setValue(ingredient.name);
    // this.name.setValidators([Validators.required])
    this.value.setValue(ingredient.value);
    this.units.setValue(ingredient.units);
  }
}
