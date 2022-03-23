import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'windowed-observable';
const observable = new Observable('tpsAuthServiceLoaded');
declare let myService: any;
@Component({
  selector: 'mfe-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe-poc-shell';
  constructor(private renderer: Renderer2) {

    const script = this.renderer.createElement('script');
    script.src = `http://localhost:4299/my.service.js`;
    script.onload = () => {

      console.log('APP Component |my.service.js loaded');
      console.log(myService.helloWorld())
      observable.publish('myService loaded successfully');

    }
    this.renderer.appendChild(document.head, script);
    console.log('APPCOMPONENT | CONSTRUCTOR INIT FINISHED');
  }
}
