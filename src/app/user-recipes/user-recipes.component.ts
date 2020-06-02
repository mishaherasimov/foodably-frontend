import {Component, OnInit} from '@angular/core';
import {Recipe} from '../shared/models/recipe/recipe.model';
import {RecipeSection} from '../shared/models/recipe-section.model';
import {RecipeItem} from '../shared/models/recipe-item.model';
import {RecipeService} from '../shared/services/recipe.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit {

  recipes: Recipe[];
  error = null;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.onFetchUserRecipes();
  }

  onRecipeDeleted(recipeId) {
    this.recipes = this.recipes.filter(item => item.id !== recipeId);
  }

  onFetchUserRecipes() {
    // Send Http request
    this.recipeService.fetchUserRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
