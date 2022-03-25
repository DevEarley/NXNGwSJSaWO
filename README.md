# NXNGwSJSaWO
NX - NG with Static JS and Windowed Observables

This repo is the result of the collaborative effort between Alex Earley, Doug Braxton and Mehmet "Mezo" Osmancik. Our goal was to design a FE solution that could be worked on by multiple teams using MFEs built with Angular and Git Submodules. "NXNGwSJSaWO" is a boilerplate NX project where each MFE is in it's own git submodule. Some submodules are required and are resolved on install. Others are optional and in their place the FE makes a request to some publicly hosted MFEs.
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

# Other Resources

```
nx generate @nrwl/angular:lib [name] [options,...]

Options:
  --name                  The name of the library.
  --directory             A directory where the library is placed.
  --publishable           Generate a publishable library.
  --buildable             Generate a buildable library.
  --prefix                The prefix to apply to generated selectors.
  --skipFormat            Skip formatting files.
  --simpleModuleName      Keep the module name simple (when using `--directory`).
  --addModuleSpec         Add a module spec file.
  --skipPackageJson       Do not add dependencies to `package.json`.
  --skipTsConfig          Do not update `tsconfig.json` for development experience.
  --routing               Add router configuration. See `lazy` for more information.
  --lazy                  Add `RouterModule.forChild` when set to true, and a simple array of routes when set to false.
  --parentModule          Update the router configuration of the parent module using `loadChildren` or `children`, depending on what `lazy` is set to.
  --tags                  Add tags to the library (used for linting).
  --unitTestRunner        Test runner to use for unit tests. (default: jest)
  --importPath            The library name used to import it, like `@myorg/my-awesome-lib`. Must be a valid npm name.
  --strict                Create a library with stricter type checking and build optimization options. (default: true)
  --linter                The tool to use for running lint checks. (default: eslint)
  --standaloneConfig      Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`.
  --compilationMode       Specifies the compilation mode to use. If not specified, it will default to `partial` for publishable libraries and to `full` for buildable libraries. The `full` value can not be used for publishable libraries.
  --setParserOptionsProjecWhether or not to configure the ESLint "parserOptions.project" option. We do not do this by default for lint performance reasons.
  --addTailwind           Whether to configure Tailwind CSS for the application. It can only be used with buildable and publishable libraries. Non-buildable libraries will use the application's Tailwind configuration.
  --skipModule            Whether to skip the creation of a default module when generating the library.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.

```

# Generate a Service
[Setup MFE with Angular](https://nx.dev/guides/setup-mfe-with-angular)



> Remember, only create and angular package if this logic needs to interface with your existing angular app! If you have standalone logic, create a stateless javascript service. If you have a "dumb" UI component, create a Web Component. Angular Services are stateful and require angular libraries. If your logic has nothing to do with angular or your app, then it doesn't need to be an Angular Library.
```
nx generate @nrwl/angular:lib mfe-poc-service-lib
```

```
nx g @nrwl/angular:service wrapper --project=mfe-poc-service-lib
```


Import into your App.Component...
```
//import { <Name of Service> } from '@<app-prefix>/<lib-prefix>';

import { WrapperService } from '@mfe-poc/mfe-poc-service-lib';
...
constructor(private wrapperService:WrapperService)
```

Now build the lib
```
nx build mfe-poc-service-lib
```

And build the app
```
nx build
```

# The steps to adding a submodule

Do it manually
1. create new repo
2. update the .gitmodules file
3. add empty directory
4. Commit and Push
5. git submodules update --init --recursive

Use the CLI
1. create new repo
2. cd into appropriate owning path (i.e. cd libs)
3. add submodule using Git: git submodule add [repo URL]
4. git commit -m "Add submodule X"; git push

When pulling:
1. git clone --recurse-submodules [url] -- or --
2. git clone [url], then git submodule update --init --recursive -- or --
3. Perform git submodule update for the singular repo you want to pull.

Removing a "local MFE"
1. update the .gitmodules file
2. update the

> NOTE Any repos that contain code that is "compile time" than it should be resolved on "yarn install"
> Any repos that contain complete MFEs should be optional. Not every developer needs to download each MFE.
## Adding `git pull` to post install step
## Using Remote MFEs vs Pulling and running MFEs locally
 Using Remote MFEs

 Pulling and running MFEs locally