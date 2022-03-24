import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,
    RouterModule.forRoot([{
         path: 'workspace',
         loadChildren: () => import('workspace/Module').then(m => m.RemoteEntryModule)
     }, {
         path: 'my-account',
         loadChildren: () => import('my-account/Module').then(m => m.RemoteEntryModule)
     }], {initialNavigation: 'enabledBlocking'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
