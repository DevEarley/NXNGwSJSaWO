# NXNGwSJSaWO
NX - NG with Static JS and Windowed Observables
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
# NX README | mfe-pocAuthPoc
## Create Angular Component & Service Library project (Compile time only)
```
ng new mfe-poc-libs --directory=libs --skip-git  --new-project-root=libs --routing=false --create-application=false
```
> Black Magic Required - delete everything from libs except package.json angular.json and tsconfig.json. Copy dependencies from this package.json into the root's package.json and delete this package.json.
> NOTE - angular.json and tsconfig.json MUST live in the LIBS folder. Not in the root.

## Create mfe-poc Auth Service Lib
```ng g library mfe-poc-auth```
