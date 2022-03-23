import { Component } from '@angular/core';
//declare let myService: any;

@Component({
  selector: 'mfe-poc-workspace-entry',
  templateUrl: './entry.component.html'
})
export class RemoteEntryComponent {
  // constructor(private renderer: Renderer2) {

  //   const script = this.renderer.createElement('script');
  //   script.src = `http://localhost:4299/my.service.js`;
  //   script.onload = () => {

  //     console.log('Entry Component | my.service.js loaded');
  //     console.log(myService.helloWorld())

  //   }
  //   this.renderer.appendChild(document.head, script);
  //   console.log('Entry Component | CTOR DONE');
  // }
}