import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATE_USER = 'authenticateUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  executeJWTAuthenticationService(username, password){
    console.log(username);
    return this.
      httpClient.
      post<any>
      (`${API_URL}/authenticate`,
      {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATE_USER, username)
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
            return data
          }
        )
      )
    
  }

  
  
  executeAuthenticationService(username, password){

    let basicAuthenticationString = 'Basic ' + window.btoa(username + ':' + password);
    let header = new HttpHeaders(
      {
        Authorization: basicAuthenticationString
      }
    )
    return this.
      httpClient.
      get<AuthenticationBean>
      (`${API_URL}/basicauth`,
      {headers: header}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATE_USER, username)
            sessionStorage.setItem(TOKEN, basicAuthenticationString)
            return data
          }
        )
      )
    
  }

  

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser')
    return !(user ===null)
  }

  getAuthenticatedUser(){
    let user = sessionStorage.getItem('authenticateUser')
    return !(user ===null)
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem('token')
  }

  logout(){
    sessionStorage.removeItem('authenticateUser');
    sessionStorage.removeItem('token');
  }
}

export class AuthenticationBean{
  constructor(public message: string){}
}
