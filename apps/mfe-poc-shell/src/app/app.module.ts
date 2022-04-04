import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@mfe-poc/mfe-poc-services-lib';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'my-account',
          loadChildren: () =>
            import('my-account/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'my-profile',
          loadChildren: () =>
            import('my-profile/Module').then((m) => m.RemoteEntryModule),
            canLoad: [AuthGuard]
        },
      ],
      { initialNavigation: 'enabledBlocking', useHash: true }
    ),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
