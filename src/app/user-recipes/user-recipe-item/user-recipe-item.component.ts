import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe.model';
import {RecipeService} from '../../shared/services/recipe.service';

@Component({
  selector: 'app-user-recipe-item',
  templateUrl: './user-recipe-item.component.html',
  styleUrls: ['./user-recipe-item.component.scss']
})
export class UserRecipeItemComponent implements OnInit {

  @Input()
  recipeItem: Recipe;

  @Output()
  recipeDeleted = new EventEmitter<string>();

  isOverlayHidden = true;
  error = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
  }

  onDeleteRecipe() {
    // Send Http request
    this.recipeService.deleteRecipe(this.recipeItem.id).subscribe(
      success => {
        this.recipeDeleted.emit(this.recipeItem.id);
      },
      error => {
        this.error = error.message;
      }
    );
  }

  // event handling

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isOverlayHidden = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isOverlayHidden = true;
  }
}
