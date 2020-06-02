import { RecipeItem } from './../../shared/models/recipe-item.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipe-page-section',
  templateUrl: './recipe-page-section.component.html',
  styleUrls: ['./recipe-page-section.component.scss']
})
export class RecipePageSectionComponent implements OnInit {
  @Input()
  recipePageSection: {
    recipes: RecipeItem[]
  };
  constructor() { }

  ngOnInit() {
  }

}
