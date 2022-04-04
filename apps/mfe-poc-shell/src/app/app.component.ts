import { Component, Renderer2 } from '@angular/core';

import { WrapperService } from '@mfe-poc/mfe-poc-services-lib';

declare let myService: any;

@Component({
  selector: 'mfe-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe-poc-shell';

  constructor( private _serviceWrapperService:WrapperService,
    private renderer:Renderer2) {
    _serviceWrapperService.init(this.renderer);
  }

  sendMessage =():void=>{
    console.log('APPCOMPONENT | sendMessage');
    console.log(myService.helloWorld());
  }
}
