import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),

  })

  constructor( private fb: FormBuilder){}


  public get favoriteGames() {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {

    return this.dynamicForm.controls[field].errors
      && this.dynamicForm.controls[field].touched;

  }

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.dynamicForm.controls[ field ] ) {
      return null
    }

    const errors = this.dynamicForm.controls[ field ].errors || {};

    for ( const key of Object.keys(errors) ) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength} caracteres`
      }
    }

    return null;

  }

  onDeleteFavorite( index: number): void {

    this.favoriteGames.removeAt(index);

  }

  onSubmit(): void {

    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log(this.dynamicForm.value);

    this.dynamicForm.reset();
  }
}
