import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string
}

interface SigninCredentials {
  username: string;
  password: string
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}
interface SignInResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<any>(null);
  username: string = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http
      .post<UsernameAvailableResponse>(this.rootUrl + '/auth/username', {
            username: username
      });
  }

  signup(credentials: SignupCredentials){
    return this.http.post<SignupCredentials>(this.rootUrl + '/auth/signup', credentials)
    .pipe(
      tap(( { username }) => {
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }
  signin(credentials: SigninCredentials){
    return this.http.post<SignInResponse>(this.rootUrl + '/auth/signin', credentials)
    .pipe(
      tap(({ username }) => {
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }

  signout(){
    return this.http.post(this.rootUrl + '/auth/signout',{})
    .pipe(
      tap(()=>{
        this.signedIn$.next(false);
      })
    );
  }

  checkAuth(){
    return this.http.get<SignedInResponse>(this.rootUrl + '/auth/signedin')
      .pipe(
      tap(({ authenticated, username }) => {
        this.signedIn$.next(authenticated);
        this.username = username;
      })
    )
  }
}
