import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = ''
  welcomeMessageFromService:  string
  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage(){
    console.log(this.welcomeDataService.executeHelloWorldBeanService())
    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      response => console.log(this.welcomeMessageFromService=response.message),
      error => this.handleErrorResponse(error)
    );
    console.log("last line")
  }

  getWelcomeMessageWithParams(){
    console.log(this.welcomeDataService.executeHelloWorldBeanServiceWithPathVariable(this.name))
    this.welcomeDataService.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => console.log(this.welcomeMessageFromService=response.message),
      error => this.handleErrorResponse(error)
    );
    console.log("last line")
  }

  handleErrorResponse(error){
    this.welcomeMessageFromService = error.error.message;
  }

}
