import { FormArray, FormControl } from '@angular/forms';
import { PreparationStep } from '../../../shared/models/recipe/preparation-step.model';

export class PrepStepForm {

  description = new FormControl();
  ingredients = new FormArray([]);

  constructor(step: PreparationStep) {

    this.description.setValue(step.description);
    // this.name.setValidators([Validators.required])
    this.ingredients.setValue(step.ingredients);
  }
}
