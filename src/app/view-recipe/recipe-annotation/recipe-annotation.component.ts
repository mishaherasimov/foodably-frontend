import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-annotation',
  templateUrl: './recipe-annotation.component.html',
  styleUrls: ['./recipe-annotation.component.scss']
})
export class RecipeAnnotationComponent implements OnInit {

  @Input()
  hasBorder = true;

  @Input()
  annotation: string;

  constructor() { }

  ngOnInit(): void {
  }
}
