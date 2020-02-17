import { RecipeItem } from './../../shared/recipe-item.model';
import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-more-recipe-section',
  templateUrl: './more-recipe-section.component.html',
  styleUrls: ['./more-recipe-section.component.scss']
})
export class MoreRecipeSectionComponent implements OnInit {
  @Input()
  moreRecipeSection: {
    
    recipes: RecipeItem[]
  };
  constructor() { }

  ngOnInit() {
  }

}
