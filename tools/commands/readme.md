# Switch to public Micro Front End Remote Submodule
Micro Front End or MFEs are web apps that are hosted separately from each other. There are two types of MFE: Remote or Host. A Host app bootstraps Remote MFEs together into a cohesive experience for the user.
A Git Submodule is a repo that can be cloned by itself but it is apart of another repo. A MFE Remote Submodule is an MFE that is the remote type and is checked into a git submodule.
In this project, we are using a Host MFE (it's own sub module) and a bunch of Remotes. The project itself is checked into the Root repo. The Host and the Remotes are each in a submodule of that Root repo.

 `switch-to-public-mfe` is a NX Workspace Generator configures the project to use the publicly hosted mfe out on dev.
 Use `switch-to-local-mfe` to point back to localhost.

## Usage
```

nx run commands:switch-to-public-mfe --name=<name of the submodule>
```

# Switch to local Micro Front End Remote Submodule
 `switch-to-local-mfe` is a NX Workspace Generator that configures the project to use the locally hosted mfe rather than what is out on dev.

## Usage
```
nx run commands:switch-to-local-mfe --name=<name of the submodule> --port=<some port>
```

# Create a new MFE Remote Submodule
```
nx run commands:create-mfe-remote-submodule --name=<name of the submodule> --port=<some port>
```