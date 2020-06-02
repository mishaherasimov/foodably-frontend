import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

// https://alligator.io/angular/custom-form-control/ custom control

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})

export class StepperComponent implements ControlValueAccessor {

  value: number;

  @Input()
  annotation: string;

  @Input()
  step = 1;

  onChange = (value: number) => {};
  onTouched = () => {};

  constructor() {
    this.value = 1;
  }

  writeValue(value: number): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  onPlus() {
    if (this.value < this.step) {
      this.value = this.step;
    } else {
      this.value = this.value + this.step;
    }
    this.onChange(this.value);
  }

  onMinus() {
    const reducedValue = this.value - this.step;
    console.log(reducedValue);
    if (reducedValue < 1) {
      this.value = 1;
    } else {
      this.value = reducedValue;
    }
    this.onChange(this.value);
  }
}
