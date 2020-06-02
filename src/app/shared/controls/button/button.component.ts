import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <div class="button__background" [style.background-color]="color" [style.height.rem]="height" [style.width.rem]="width">
      <img *ngIf="icon" [src]='icon' [style.height.px]="iconHeight ? iconHeight : 'auto'" alt="button image">
      <h4 class="button-title">{{ title }}</h4>
    </div>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input('background')
  color: string;

  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  iconHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

}
