import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeForm } from '../../create-edit-recipe/models/recipe-form.model';
import { IngredientForm } from '../../create-edit-recipe/create-edit-ingredient/models/ingredient-form.model';
import { Ingredient } from '../models/recipe/ingredient.model';
import { Recipe } from '../models/recipe/recipe.model';
import {PrepStepForm} from '../../create-edit-recipe/create-edit-prep-step/models/prep-step-form.model';
import {PreparationStep} from '../models/recipe/preparation-step.model';
import {StepIngredientForm} from '../../create-edit-recipe/create-edit-prep-step/create-edit-step-ingredient/models/step-ingredient-form.model';

@Injectable({ providedIn: 'root' })
export class RecipeFormService {
  private recipeForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
    this.fb.group(new RecipeForm(
    new Recipe('', '', '', '', 'Select', 'Select', 'Select', false, 1, [], [])
  )));
  recipeForm$: Observable<FormGroup> = this.recipeForm.asObservable();

  constructor(private fb: FormBuilder) {}

  /* ingredients */

  addIngredient() {
    const currentRecipe = this.recipeForm.getValue();
    const currentIngredients = currentRecipe.get('ingredients') as FormArray;

    currentIngredients.push(
      this.fb.group(
        new IngredientForm(new Ingredient('', 1, 'Select'))
      )
    );

    this.recipeForm.next(currentRecipe);
  }

  deleteIngredient(i: number) {
    const currentRecipe = this.recipeForm.getValue();
    const currentIngredients = currentRecipe.get('ingredients') as FormArray;

    currentIngredients.removeAt(i);

    this.recipeForm.next(currentRecipe);
  }

  /* instruction */

  addInstructionStep() {
    const currentRecipe = this.recipeForm.getValue();
    const currentInstruction = currentRecipe.get('instruction') as FormArray;

    currentInstruction.push(
      this.fb.group(
        new PrepStepForm(new PreparationStep('', []))
      )
    );

    this.recipeForm.next(currentRecipe);
  }

  deleteInstructionStep(i: number) {
    const currentRecipe = this.recipeForm.getValue();
    const currentInstruction = currentRecipe.get('instruction') as FormArray;

    currentInstruction.removeAt(i);

    this.recipeForm.next(currentRecipe);
  }

  /* instruction step */

  addStepIngredient(i: number) {
    const currentRecipe = this.recipeForm.getValue();
    const currentInstruction = currentRecipe.get('instruction') as FormArray;
    const currentStepIngredients = currentInstruction.at(i).get('ingredients') as FormArray;

    currentStepIngredients.push(
      this.fb.group(
        new StepIngredientForm(new Ingredient('Select', 1, ''))
      )
    );

    this.recipeForm.next(currentRecipe);
  }

  deleteStepIngredient(i: number, ingIndex: number) {
    const currentRecipe = this.recipeForm.getValue();
    const currentInstruction = currentRecipe.get('instruction') as FormArray;
    const currentStepIngredients = currentInstruction.at(i).get('ingredients') as FormArray;

    currentStepIngredients.removeAt(ingIndex);

    this.recipeForm.next(currentRecipe);
  }
}
