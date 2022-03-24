import { Injectable } from '@angular/core';

import { Observable } from 'windowed-observable';

const myServiceLoadedSuccessfully$ = new Observable('myServiceLoadedSuccessfully');


declare let myService: any;


@Injectable({
  providedIn: 'root'
})
export class ServiceWrapperService {


  public init(renderer:any) {
    if (typeof myService === 'undefined') {
      const script = renderer.createElement('script');
      script.src = `http://localhost:4299/my.service.js`;
      script.onload = () => {
        console.log('APP Component |my.service.js loaded');
        console.log(myService.helloWorld());
        myServiceLoadedSuccessfully$.publish('Success');
      };
      renderer.appendChild(document.head, script);
    }
    console.log('APPCOMPONENT | CONSTRUCTOR INIT FINISHED');
  }
}
