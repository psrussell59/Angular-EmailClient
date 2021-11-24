import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/match-password';
import { UniqueUsername } from '../Validators/unique-username';
import { AuthService } from '../auth.service';

interface SignupResponse {
  username: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
  ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  }, {validators: [this.matchPassword.validate]});

  constructor(private matchPassword: MatchPassword, 
              private uniqueUsername: UniqueUsername,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
      if(this.authForm.invalid){
        return;
      }
      this.authService.signup(this.authForm.value)
      .subscribe({
          next: () => {
            this.router.navigateByUrl("/inbox");
          },
          error: (err) => {
            if(!err.status){
              this.authForm.setErrors({noConnection: true});
            }else{
              this.authForm.setErrors({unknownError: true, errorStatus: err.status, errMessage: err.message});
            }
          }
      });
  }
}
