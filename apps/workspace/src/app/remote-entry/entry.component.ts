import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'windowed-observable';

const myServiceLoadedSuccessfully$ = new Observable('myServiceLoadedSuccessfully');


declare let myService: any;

@Component({
  selector: 'mfe-poc-workspace-entry',
  templateUrl: './entry.component.html'
})
export class RemoteEntryComponent {
  title = 'mfe-poc-shell';
  constructor(private renderer: Renderer2) {
    if(typeof myService === 'undefined'){
      const script = this.renderer.createElement('script');
      script.src = `http://localhost:4299/my.service.js`;
      script.onload = () => {
        console.log('APP Component |my.service.js loaded');
        console.log(myService.helloWorld())
        myServiceLoadedSuccessfully$.publish('Success');
      }
      this.renderer.appendChild(document.head, script);
    }
    console.log('APPCOMPONENT | CONSTRUCTOR INIT FINISHED');
  }
}

