import {Component, Input, OnInit} from '@angular/core';
import { PreparationStep } from '../../shared/models/recipe/preparation-step.model';

@Component({
  selector: 'app-preparation-step',
  templateUrl: './preparation-step.component.html',
  styleUrls: ['./preparation-step.component.scss']
})
export class PreparationStepComponent implements OnInit {

  @Input()
  step: PreparationStep;
  @Input()
  currentIndex: number;
  @Input()
  total: number;

  constructor() { }
  ngOnInit(): void {}
}
