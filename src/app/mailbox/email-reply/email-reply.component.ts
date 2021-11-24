import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';
import { IEmail } from '../email';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email: any;

  constructor(private emailService: EmailService) {

   }

  ngOnChanges(): void {
    const text = this.email.text.replace(/\n/gi, '\n>');
      this.email = {
        ...this.email,
        from: this.email.to,
        to: this.email.from,
        subject: 'RE: ' + this.email.subject,
        text: '\n\n----' + this.email.from + ' wrote:\n>' + text
      }
  }

  onSubmit(email: IEmail){
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
  });
  }
}
