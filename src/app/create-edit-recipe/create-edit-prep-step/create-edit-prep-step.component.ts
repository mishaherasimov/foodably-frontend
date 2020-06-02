import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Form, FormArray, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {RecipeFormService} from '../../shared/services/recipe-form.service';
import {Ingredient} from '../../shared/models/recipe/ingredient.model';

@Component({
  selector: 'app-create-edit-prep-step',
  templateUrl: './create-edit-prep-step.component.html',
  styleUrls: ['./create-edit-prep-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditPrepStepComponent implements OnInit, OnDestroy {

  @Input()
  isLast: number;
  @Input()
  total: number;

  @Input()
  stepForm: FormGroup;
  @Input()
  index: number;

  @Output()
  deleteStep: EventEmitter<number> = new EventEmitter();

  recipeFormSub: Subscription;
  ingredients: FormArray;

  constructor(private recipeFormService: RecipeFormService) { }

  ngOnInit(): void {
    this.recipeFormSub = this.recipeFormService.recipeForm$
      .subscribe(recipeForm => {
        const instruction = recipeForm.get('instruction') as FormArray;
        this.ingredients = instruction.at(this.index).get('ingredients') as FormArray;
      });
  }

  ngOnDestroy(): void {
    this.recipeFormSub.unsubscribe();
  }

  onDeleteStep() {
    this.deleteStep.emit(this.index);
  }

  addIngredient() {
    console.log('Add ingredient');
    this.recipeFormService.addStepIngredient(this.index);
  }

  deleteIngredient(index: number) {
    this.recipeFormService.deleteStepIngredient(this.index, index);
  }
}
