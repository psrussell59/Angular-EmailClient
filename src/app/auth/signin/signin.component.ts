import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    this.authService.signin(this.authForm.value)
    .subscribe({
        next: (response) => {
            this.router.navigateByUrl("/inbox");
        },
        error: (err) => {
          console.log(err);
          if(!err.status){
            this.authForm.setErrors({noConnection: true});
          }else if(err.status === 422 && (err.error.username || err.error.password)){
            this.authForm.setErrors({invalidCredentials: true});
          }else{
            this.authForm.setErrors({unknownError: true, errorStatus: err.status, errMessage: err.message});
          }
        }
    });  
  }
}
