# NXNGwSJSaWO
NX - NG with Static JS and Windowed Observables
## What is NX?

From [NX Getting Started](https://nx.dev/getting-started/intro):
>"Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations. It has a powerful core and a rich plugin ecosystem."

And from [Setup MFE with Angular](https://nx.dev/guides/setup-mfe-with-angular):
>"...We made some changes to our @nrwl/angular:app generator to aid in the scaffolding of Module Federation configuration required for setting up a Micro Frontend Architecture.
>Therefore, using Nx it can be fairly straightforward to scaffold and build a Micro Frontend Architecture from a monorepo with all the additional benefits of Nx."

## Basic flow with angular
![https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/1.png](https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/1.png)

## How NX is used for local development
![https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/2.png](https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/2.png)

## How can two MFEs communicate?
![https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/3.png](https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/3.png)


## What if we need a service to sit between two Feature MFEs?
![https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/4.png](https://raw.githubusercontent.com/DevEarley/NXNGwSJSaWO/main/4.png)

## What does the workspace look like?
```
apps\  MFE Shell applications. Each app is hosted individually. A shell app contains routing that points to these remote applications. At this level, the apps should contain very little logic. Just the things necessary for routing and very basic layouts.
libs\ The "guts" of the apps. Most of the logic and UI binding will live here.
tools\ These are build steps, generators  amd schematics. Things to help standardize the dev environment.
static\ Stateless Javascript files that are loaded at runtime. Not related to Angular.
```

# Requirements
- VS Code
- Node
- Yarn

# Get Started
Clone this repo and run the following commands:
```
yarn global add nx
yarn install
yarn start
```

# Creating this project from scratch using CLI commands
## Create NX Workspace
```
yarn create nx-workspace mfe-poc --packageManager=yarn
>apps
>do not use cloud
```
At this point, it will have created a folder called "mfe-poc". ```cd mfe-poc``` before continuing.
## Add Scaffolding for NX MFES
```yarn add -D @nrwl/angular```

## Add Host MFE
```
yarn nx g @nrwl/angular:app mfe-poc-shell --mfe --mfeType=host --routing=true
>sass (scss) - or whatever works for your team =D
```

## Add Remote MFEs
```
yarn nx g @nrwl/angular:app workspace --mfe --mfeType=remote --port=4201 --host=mfe-poc-shell --routing=false
yarn nx g @nrwl/angular:app my-account --mfe --mfeType=remote --port=4202 --host=mfe-poc-shell --routing=false
```
## Configuring Remote MFE
Out of the box, Angular MFEs are set up with a single module and two components. One is your standard App.Component and the other is an Entry.Component.

```
apps/my-feature/src/
  /app
    /remote-entry
        entry.component
        entry.module
    app.component
    app.module
  /assets
  /environments
```
If you are to navigate to ```localhost:4201``` You will see the contents of app.component.
Add the RouterModule to RemoteEntryMopdule
```
import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,

      },
    ]),
  ],
  providers: [],
  exports: [RemoteEntryComponent],
})
export class RemoteEntryModule {}
```

Then add RemoteEntryComponent to AppComponent.html
```
<mfe-poc-my-account-entry></mfe-poc-my-account-entry>
```
And finally add ```RemoteEntryModule``` to AppModule imports
```
  imports: [
    BrowserModule,
    RemoteEntryModule
  ],
  ```

Now if you visit ```localhost:4200/my-account``` you should see the shell app and My Account's **Entry** Component

## Adding Windowed Observable
```
yarn add windowed-observable
```
## Host static js

```
yarn add -global http-server
```
Once installed, add the following to your package.json scripts or create .cmd file
```
cd static && http-server -a localhost -p 4299 -d
```
## Inject static js into a component
in your app component's constructor, inject Renderer2. Then create a script element, subscribe to it's onload event, and add it to the document.
```
import { Component,Renderer2 } from '@angular/core';
declare let myService: any;

@Component({
  selector: 'mfe-poc-workspace-entry',
  templateUrl: './entry.component.html'
})
export class RemoteEntryComponent {
  constructor(private renderer: Renderer2) {
    const script = this.renderer.createElement('script');
    script.src = `http://localhost:4299/my.service.js`;
    script.onload = () => {
      console.log('Entry Component | my.service.js loaded');
      console.log(myService.helloWorld())
    }
    this.renderer.appendChild(document.head, script);
    console.log('Entry Component | CTOR DONE');
  }
}
```
>Note: If multiple MFEs rely on the same static JS, do the injection at the shell level and publish a message when it's ready. Check the example on github. It is injecting the service att the shell level and publishes a message. The MyAccount MFE subscribes to this message. Search "myService loaded successfully" to see the pub/sub setup.

# Remote JS Services
These are stateless JS services that are loaded at runtime. So when these js services change, previously compiled code doesn't have to be updated and recompiled.

Just use plain JS or Webpack. Do not use angular for stateless services!

These files should extend the window object. Once loaded into an angular component, the component waits for the script to be fully loaded and processed. Once it is done, the angular script will react to this static file however it needs to. If certain components rely on a static JS lib, they should be disabled till the JS has loaded.

This pattern is best for stateless JS services that need to be shared across MFEs. These services may change but the MFEs using them don't have to. This is good for 3rd party configurations that are used in multiple MFEs. Like an authentication system integration. Wrap the implementation into a static JS service and inject it anywhere you need this service. If its injected and added to the window already, you don't have to do it again. You could inject it at the app shell level and use Windowed Observables to let the other components know when it's ready.
Or you could have multiple components try to load it and if it already exists, just exit. Lots of ways you can use this pattern to deliver stateless services remotely across MFEs.

## Add Scaffolding for Domain Libraries
```
yarn add @angular-architects/ddd
ng g @angular-architects/ddd:init
```
# Domain Driven Design
## Why DDD?
Domain Driven Design is an approach to software development that helps teams accurately abstract business needs, write maintainable code, and ensure all stakeholders are on the same page.

## What is DDD?
DDD is made up of many concepts. The 5 core concepts are as follows:
1) The Domain
2) The Model
3) The Ubiquitous Language
4) The Context
5) The Bounded Contexts and the "Big Ball of Mud"

## Recommended Reading:
DDD Reference by Eric Evans (ISBN 978-1-4575-0119-7)
Here are some samples from Vaughn Vernon's books on DDD  - these samples do a fine job of outlining some of the key concepts.
https://ptgmedia.pearsoncmg.com/images/9780134434421/samplepages/9780134434421.pdf
https://ptgmedia.pearsoncmg.com/images/9780321834577/samplepages/0321834577.pdf