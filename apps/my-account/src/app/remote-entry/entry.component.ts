import { Component } from '@angular/core';
import { Observable } from 'windowed-observable';

const WrapperService$ = new Observable('WrapperService');// move to service

const message$ = new Observable('messageFromShell');// move to service

declare let myService: any;

@Component({
  selector: 'mfe-poc-my-account-entry',
  templateUrl: './entry.component.html'
})
export class RemoteEntryComponent {
  constructor() {
    console.log("My Account Entry | CTOR");
    //authService.subscribeToTpsAuthServiceLoaded(this.getUser);
    this.subscribeToMyServiceLoaded(this.myServiceIsReady); // move to service
    message$.subscribe((eventMessage: any) => {
      console.log('My Account Entry | messageFromShell: ', eventMessage)
    });
  }

  myServiceIsReady() {
    console.log("My Account Entry | myServiceIsReady");
    console.log(myService.helloWorld());
  }

  subscribeToMyServiceLoaded(callback: any) {// move to service
    console.log("My Account Entry | subscribeToMyServiceLoaded");
    WrapperService$.subscribe((eventMessage: any) => {
      console.log('My Account Entry | WrapperService : ', eventMessage)
      if (eventMessage === 'loaded myService') {
        callback();
      }
    })
  }
}
