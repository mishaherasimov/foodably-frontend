import { RecipeItem } from './../shared/models/recipe-item.model';

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../shared/services/recipe.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  @Input()
  recipePageSections = [];
  error = null;
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.onFetchRecipes();
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  // inspired by https://stackoverflow.com/questions/8495687/split-array-into-chunks
  onFetchRecipes() {
    // Send Http request
    this.recipeSub = this.recipeService.fetchRecipes().subscribe(
      recipes => {

        let i;
        let j;
        const chunk = 4;
        console.log(recipes.length);
        for (i = 0, j = recipes.length; i < j; i += chunk) {
          const section = recipes.slice(i, i + chunk);
          const sectionItems = section.map(recipe => new RecipeItem(recipe.previewURL, `${recipe.preparationTime} min.`, recipe.title, recipe.author.name, recipe.id));
          this.recipePageSections.push({ recipes: sectionItems });
        }
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
