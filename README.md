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


# Get Started
(use command)
npm install -g nx
```
> yarn install
> hostLibs.cmd
> yarn start
```

# Commands
## Create NX Workspace
```
yarn create nx-workspace mfe-poc --packageManager=yarn
>apps
>cloud build is faster - not sure if it violates anything though. check with your client.
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

## Add Scaffolding for Domain Libraries
```
yarn add @angular-architects/ddd
ng g @angular-architects/ddd:init
```
## Adding Windowed Observable
```
yarn add windowed-observable
```
# Remote Runtime JS Libs
Just use plain JS or Webpack. Do not use angular for stateless services!

# MS Auth
```
htmfe-poc://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser

htmfe-poc://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/VanillaJSTestApp2.0/app/default

htmfe-poc://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/VanillaJSTestApp2.0
```
# ARCHIVE - OLD
## Create Angular Component & Service Library project (Compile time only)
```
ng new mfe-poc-libs --directory=libs --skip-git  --new-project-root=libs --routing=false --create-application=false
```
> Black Magic Required - delete everything from libs except package.json angular.json and tsconfig.json. Copy dependencies from this package.json into the root's package.json and delete this package.json.
> NOTE - angular.json and tsconfig.json MUST live in the LIBS folder. Not in the root.

## Create mfe-poc Auth Service Lib
```ng g library mfe-poc-auth```
