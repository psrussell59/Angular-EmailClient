import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators';
import { IEmail } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: IEmail;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService) {
      this.email = this.route.snapshot.data['email']
      this.route.data.subscribe( ({ email }) => {
        this.email = email;
      });
     }

  ngOnInit(): void {
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe();
    // });
    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email: IEmail) => {
    //     this.email = email;
    // });
  }


}
