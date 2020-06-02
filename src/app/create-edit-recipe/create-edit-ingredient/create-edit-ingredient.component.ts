import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-edit-ingredient',
  templateUrl: './create-edit-ingredient.component.html',
  styleUrls: ['./create-edit-ingredient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditIngredientComponent implements OnInit {

  @Input() isLast = true;
  @Input() ingredientForm: FormGroup;
  @Input() index: number;
  @Output() deleteIngredient: EventEmitter<number> = new EventEmitter();

  units = ['Select', 'g', 'kg', 'tbsp', 'tsp', 'pc.', 'ml', 'l', 'pkg.'];

  styleGuide = {
    caretClass: 'dropdown__caret',
    selectBoxClass: 'dropdown__content',
    selectMenuClass: 'dropdown',
    optionsClass: 'dropdown__option'
  };

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.deleteIngredient.emit(this.index);
  }
}
