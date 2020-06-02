import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Ingredient} from '../../../shared/models/recipe/ingredient.model';
import {RecipeFormService} from '../../../shared/services/recipe-form.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-edit-step-ingredient',
  templateUrl: './create-edit-step-ingredient.component.html',
  styleUrls: ['./create-edit-step-ingredient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditStepIngredientComponent implements OnInit, OnDestroy {

  @Input() ingredientForm: FormGroup;
  @Input() index: number;
  @Output() deleteIngredient: EventEmitter<number> = new EventEmitter();

  availableIngredients: Array<string>;

  recipeFormSub: Subscription;

  styleGuide = {
    caretClass: 'dropdown__caret',
    selectBoxClass: 'dropdown__content',
    selectMenuClass: 'dropdown',
    optionsClass: 'dropdown__option'
  };

  constructor(private recipeFormService: RecipeFormService) { }

  ngOnInit(): void {
    this.recipeFormSub = this.recipeFormService.recipeForm$
      .subscribe(recipeForm => {
        const availableIngredients = recipeForm.get('ingredients') as FormArray;
        const items = (availableIngredients.value as Array<Ingredient>).map(item => item.name);
        this.availableIngredients = ['Select'].concat(items);
        console.log(this.availableIngredients);
      });
  }

  ngOnDestroy(): void {
    this.recipeFormSub.unsubscribe();
  }

  onDelete() {
    this.deleteIngredient.emit(this.index);
  }
}
