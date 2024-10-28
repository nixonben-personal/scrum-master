import { Component, Injector, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputType } from '../../../core/enum/common.enum';
import { NumberDirective } from '../../../core/directive/number-only.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scrum-input',
  standalone: true,
  imports: [NumberDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './scrum-input.component.html',
  styleUrl: './scrum-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ScrumInputComponent,
    },
  ],
})
export class ScrumInputComponent implements ControlValueAccessor {
  inputs = InputType;
  value: string = '';
  errorMessage!: string | null;
  inputControl = new FormControl();
  constructor(private injector: Injector) {}
  @Input() type!: string;
  @Input() placeholder!:string

  onChange = (quantity: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  getErrorMessages(): string {
    const control = this.injector.get(NgControl, null);
    if (control && control.control && control.control.touched) {
      const errors = control.control.errors;
      if (errors) {
        if (errors['required']) {
          return 'This field is required';
        }
        if (errors['email']) {
          return 'Please enter a valid email';
        }
      }
    }
    return '';
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    // Notify the form control about the new value
    this.onChange(this.value);
  }
}
