import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean{
  constructor(public message: string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private httpClient: HttpClient) { }

  executeHelloWorldBeanService(){
    
    return this.httpClient.get<HelloWorldBean>(`${API_URL}/hello-world-bean`)
    
  }

  executeHelloWorldBeanServiceWithPathVariable(name){

    // let basicAuthenticationString = this.createBasicAuthenticationHttpHeader();
    // let header = new HttpHeaders(
    //   {
    //     Authorization: basicAuthenticationString
    //   }
    // )
    
    return this.
      httpClient.
      get<HelloWorldBean>
      (`${API_URL}/hello-world-bean/path-variable/${name}`
      // ,
      // {headers: header}
      )
    
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username='in28minutes'
  //   let password = 'dummy'
  //   let basicAuthHeaderString  = 'Basic ' + window.btoa(username + ':' + password)
  //   return basicAuthHeaderString;
  // }

  
}
