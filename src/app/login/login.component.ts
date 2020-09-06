import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='in28minutes'
  password = ''
  errorMessage = ''
  invalidLogin = false
  constructor(private router: Router, private authenticationService: HardcodedAuthenticationService,
     private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    //console.log(this.password);
    console.log(this.invalidLogin);
      //if(this.username === 'in28minutes' && this.password === 'dummy'){
      if(this.authenticationService.authenticate(this.username, this.password)){
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false;
      } else{
        this.invalidLogin = true;
        this.errorMessage = "Invalid Message"
      }
  }

  handleBasicAuthLogin(){
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe
        (data => {
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false;
        }, error =>{
          console.log(error)
          this.invalidLogin = true;
        })
    }

    handleJWTAuthLogin(){
      this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe
          (data => {
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false;
          }, error =>{
            console.log(error)
            this.invalidLogin = true;
          })
      }
}
