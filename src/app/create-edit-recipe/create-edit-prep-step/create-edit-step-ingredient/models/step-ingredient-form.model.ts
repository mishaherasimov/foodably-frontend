import { FormControl } from '@angular/forms';
import { Ingredient } from '../../../../shared/models/recipe/ingredient.model';

export class StepIngredientForm {

  name = new FormControl();
  value = new FormControl();

  constructor(ingredient: Ingredient) {

    this.name.setValue(ingredient.name);
    // this.name.setValidators([Validators.required])
    this.value.setValue(ingredient.value);
  }
}
