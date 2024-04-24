import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator{

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    // throw new Error('Method not implemented.');
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( ( subscriber ) => {
      console.log({ email });

      if ( email === 'leonardotoba1998@gmail.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        // return;
      }

      subscriber.next( null );
      subscriber.complete();
    }).pipe(
      delay(3000)
    );

    return httpCallObservable;
  }

  /* validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    // throw new Error('Method not implemented.');
    const email = control.value;

    console.log({ email });

    return of({
      emailTaken: true
    })
  } */

  /*
    return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
      .pipe(
      // delay(3000),
        map( resp => {
          return ( resp.length === 0 ) ? null : { emailTaken: True }
        })
      )  */
}
