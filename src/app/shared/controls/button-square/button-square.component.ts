import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-square',
  template: `
    <div class="button__background" [style.background-color]="color" [style.height.rem]="size" [style.width.rem]="size">
        <img [src]='icon' [style.height.px]="iconHeight ? iconHeight : 'auto'" class="button__icon" alt="button image">
    </div>
  `,
  styles: ['.button__icon { position: absolute; margin: 0; left: 50%; top: 50%; transform: translate(-50%, -50%);  }',
           '.button__background { position: relative; cursor: pointer; }']
})
export class ButtonSquareComponent {

  @Input()
  color: string;

  @Input()
  size: number;

  @Input()
  icon: string;

  @Input()
  iconHeight: number;

  constructor() { }
}
