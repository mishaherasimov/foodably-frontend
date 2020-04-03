import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeFormService } from '../shared/services/recipe-form.service';
import {Subscription} from 'rxjs';
import {RecipeService} from '../shared/services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeSection} from '../shared/models/recipe-section.model';
import {RecipeItem} from '../shared/models/recipe-item.model';
import {Recipe} from '../shared/models/recipe/recipe.model';

@Component({
  selector: 'app-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.scss']
})
export class CreateEditRecipeComponent implements OnInit, OnDestroy {

  categories = ['Breakfast', 'Lunch', 'Dinner'];
  cuisines = ['Indian', 'Ukrainian', 'Italian', 'French'];
  dishTypes = ['Dessert', 'Soup', 'Curry', 'Pizza', 'Stew', 'Drinks'];

  styleGuide = {
    caretClass: 'dropdown__caret',
    selectBoxClass: 'dropdown__content',
    selectMenuClass: 'dropdown',
    optionsClass: 'dropdown__option'
  };

  recipeForm: FormGroup;
  recipeFormSub: Subscription;
  recipeServiceSub: Subscription;
  ingredients: FormArray;
  instruction: FormArray;
  formInvalid = false;
  error = null;

  constructor(private recipeFormService: RecipeFormService,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.recipeFormSub = this.recipeFormService.recipeForm$
      .subscribe(recipe => {
        this.recipeForm = recipe;
        this.ingredients = this.recipeForm.get('ingredients') as FormArray;
        this.instruction = this.recipeForm.get('instruction') as FormArray;
      });
  }

  onSubmit() {
    console.log('Recipe saved!');
    console.log(this.recipeForm.value as Recipe);

    const recipe = this.recipeForm.value as Recipe;
    this.recipeServiceSub = this.recipeService.createRecipe(recipe).subscribe(
      recipeId => {
        console.log(recipeId);
        this.router.navigate(['profile', 'myrecipes']);
      },
      error => {
        this.error = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.recipeFormSub.unsubscribe();
    this.recipeServiceSub.unsubscribe();
  }

  /* ingredients */

  addIngredient() {
    this.recipeFormService.addIngredient();
  }

  deleteIngredient(index: number) {
    this.recipeFormService.deleteIngredient(index);
  }

  /* instruction */

  addInstructionStep() {
    this.recipeFormService.addInstructionStep();
  }

  deleteInstructionStep(index: number) {
    this.recipeFormService.deleteInstructionStep(index);
  }
}
