import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions = { //header per il login
    headers: new HttpHeaders(
      {'Content-type': 'Application/Json'}
    )
  }

  wsLogin = 'http://localhost:3000/login' // endpoint login

  authorize(user:User):Observable<any>{
    console.log(this.wsLogin, user, this.httpOptions);
    
    return this.http.post(this.wsLogin, user, this.httpOptions)
  }

  wsLoginAuthorize:string = 'http://localhost:3000/600/users/' // endpoint per il login tramite token

  loginAuthorize(token:any, id:number):Observable<any>{
    let authorize = { //header per il login
      headers: new HttpHeaders(
        {'Authorization': `Bearer ${token}`}
      )
    }
    
    return this.http.get(this.wsLoginAuthorize + id, authorize)
  }

  isLoggegIn:boolean = false;

  wsRegisterAuthorize:string = 'http://localhost:3000/register' // endpoint per la registrazione

  registerAuthorize(user:User):Observable<any>{
    return this.http.post(this.wsRegisterAuthorize, user, this.httpOptions)
  }

}
