import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService){}
    validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const { value } = control;
        return this.authService.usernameAvailable(value)
            .pipe(
                map(value => {
                    return null;
                }),
                catchError((err) => {
                    console.log(err);
                    if(err.error.username === 'Username in use'){
                        return of({ nonUniqueUsername: true });
                    }else if(err.status === 0){
                        return of({ connectionError: 'Could not conecct to the server' });
                    }else{
                        return of({ unkownError: err.statusText });
                    }

                })
            )
    }
}
