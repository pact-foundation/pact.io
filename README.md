# README

pact.io home page

[![Netlify Status](https://api.netlify.com/api/v1/badges/cd85e418-2a51-404e-b8c5-a148317484dd/deploy-status)](https://app.netlify.com/sites/pact-io/deploys)

### Where are the docs?

* Formal documentation is located at http://leap.mediumra.re/documentation/index.html - accessible from the **Documentation** link on most demo pages.
* You can find lists of the styled components at pages/components-leap.html and pages/components-bootstrap.html

### Getting Set Up (optional)

Setup instructions are located in the docs mentioned above.

Node 14 or greater is required
Python 3 is required for some dependencies (sass)

The short version:

* npm install
* npx netlify-cli dev

## Redirects

### Unix (sh)

```sh
curl -fsSL pact.io/sh | sh -
```

### Windows (ps1)

```ps1
iwr -useb pact.io/ps1 | iex
```

### Windows (choco)

```ps1
curl pact.io/choco/<version> -OutFile <pkg_name>.nupkg
choco install -y <pkg_name> --source .
```

#### Choco x64

```ps1
curl pact.io/choco/pact.0.9.1.nupkg -OutFile pact.nupkg
choco install -y pact --source .
```

#### Choco arm64

```ps1
curl pact.io/choco/pact.0.9.1.nupkg -OutFile pact.nupkg
choco install -y pact --params "'/ForceARM64:true'"  --source .
```

### Windows (scoop)

```ps1
scoop bucket add pact pact.io/scoop
scoop install pact
```