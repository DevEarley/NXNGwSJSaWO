import { Component } from '@angular/core';
import { Observable } from 'windowed-observable';

const myServiceLoadedSuccessfully$ = new Observable('myService loaded successfully');// move to service
declare let myService: any;
@Component({
  selector: 'mfe-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workspace';
  constructor() {
    //authService.subscribeToTpsAuthServiceLoaded(this.getUser);
    this.subscribeToMyServiceLoaded(this.myServiceIsReady); // move to service
  }


  myServiceIsReady() {
    console.log(myService.helloWorld());
  }


  subscribeToMyServiceLoaded(callback: any) {// move to service
    myServiceLoadedSuccessfully$.subscribe((eventMessage: any) => {
      if (eventMessage === 'Success') {
        callback();
      }
      console.log('Header Script Load : ', eventMessage)
    })
  }
}