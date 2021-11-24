import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { IEmail } from './email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<IEmail> {

  constructor(
    private emailService: EmailService,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id  } = route.params;

    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('inbox/not-found');
        return EMPTY;
      })
    );

    // return {
    //   id: "sdfsaddf",
    //   subject: "ewrtetrt",
    //   text: "sdfsfdsdf",
    //   from: "sdfsdf",
    //   to: "sdfsfd",
    //   html: "sdfsfdsdf"
    // }
  }
}
