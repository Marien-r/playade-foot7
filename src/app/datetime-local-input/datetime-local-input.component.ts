// datetime-local-input.component.ts
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datetime-local-input',
  templateUrl: './datetime-local-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeLocalInputComponent),
      multi: true
    }
  ]
})
export class DatetimeLocalInputComponent implements ControlValueAccessor {
  value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Optionally, handle disabling logic here
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onChange(new Date(inputValue));
  }
}
