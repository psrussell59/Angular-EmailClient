import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';
import { IEmail } from '../email';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: IEmail;

  constructor(
    private authService: AuthService,
    private emailService: EmailService) { 
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: this.authService.username + '@angular-email.com'

    };
  }

  ngOnInit(): void {
  }

    onSubmit(email: IEmail){
      this.emailService.sendEmail(email).subscribe(() => {
          this.showModal = false;
      });
    }
}
