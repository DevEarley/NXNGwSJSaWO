import { Injectable } from '@angular/core';

import { Observable } from 'windowed-observable';

const WrapperService$ = new Observable('WrapperService');

declare let myService: any;

@Injectable({
  providedIn: 'root'
})
export class WrapperService {

// myService is declared here only for testing purposes.
// declare let myService: any; needs to happen in any TS it's used
  public init(renderer:any) {
    if (typeof myService === 'undefined') {
      const script = renderer.createElement('script');
      script.src = `http://localhost:4299/my.service.js`;
      script.onload = () => {
        console.log('APP Component |my.service.js loaded');
        console.log(myService.helloWorld());
        WrapperService$.publish('loaded myService'); // avoid using magic strings, replace with a shared enum (compile time)
      };
      renderer.appendChild(document.head, script);
    }
    console.log('APPCOMPONENT | CONSTRUCTOR INIT FINISHED');
  }
}
