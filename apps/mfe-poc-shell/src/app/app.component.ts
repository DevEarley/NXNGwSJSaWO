import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'windowed-observable';
import { ServiceWrapperService } from '@mfe-poc/mfe-poc-lib';
const myServiceLoadedSuccessfully$ = new Observable('myServiceLoadedSuccessfully');

const messageFromShell$ = new Observable('messageFromShell');

declare let myService: any;

@Component({
  selector: 'mfe-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe-poc-shell';

  constructor( private _serviceWrapperService:ServiceWrapperService,
    private renderer:Renderer2) {
    _serviceWrapperService.init(this.renderer);
  }

  sendMessage =():void=>{
    console.log('APPCOMPONENT | sendMessage');
    console.log(myService.helloWorld());
  }
}
