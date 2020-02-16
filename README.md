# lerna-repo Synsuite

This repository provides an example configuration for a monorepo using [lerna](https://github.com/lerna/lerna). There are a few features
baked into this relatively simple app.

1. Monorepo code splitting via [lerna](https://github.com/lerna/lerna)

1. Babel 7 building across packages.

1. A package with a webpack config that has dependencies on packages in the monorepo.

1. Code splitting and asynchronous loading.

1. Using "external" & code splitting to only load the code necessary

## Code splitting + Routing example

This is useful pattern for upgrading older sites that rely on page redirects (e.g. django).
We use this at Klaviyo to incrementally add react pages in a well factored way.

The navigation links on the main django site use 'hard' page redirects to reload the entire page.
on load of the page, the main.js bundle is loaded. If the current route matches in orchestra/src/Fonts.js
we then load the associated package and only that package to render.

## Commands

* [Bootstrap](https://github.com/lerna/lerna#bootstrap) all dependencies. This will hoist shared packages to the root dir for a faster install. It will also link your dependencies together via symlinks.
    > **NOTE - use yarn install on the root repository first to install the necessary devdependencies (lerna)**

    ```BASH
    yarn bootstrap
    ```

* Start a dev server. This will run babel in all packages and developer mode webpack in any package that has a `start` script.
    ```BASH
    yarn start
    ```

* Build babel & webpack across all packages
    ```BASH
    yarn build
    ```

* Lint all packages
    ```BASH
    yarn lint
    ```
    

## Directory structure

```txt
.
├── README.md
├── lerna.json
├── package.json    
├── apps/
│   ├── desktop/
│   │   └── self-service/       // working only with react struct inside a electron app
│   │       ├── package.json
│   │       ├── electron/
│   │       │   └── electron-main.js                          // electron main process
│   │       │   └── updateInjectMessage.js                    // inject messages from main to renderer 
│   │       ├── public/
│   │       │   ├── index.html
│   │       │   └── update.html
│   │       ├── src/
│   │       │   └── index.js
│   │       ├── webpack.config.js                             // react webpack
│   │       ├── webpack.electron.main.config.js               // provide main process to electron start 
│   │       └── webpack.electron.update.message.config.js     // provide an update screen injecting specifics scripts
│   │
│   ├── mobile/
│   │   └── */                  // react native struct
│   │       ├── package.json
│   │       └── src/
│   │           └── index.js    
│   │
│   └── web/
│       ├── enigma/             // react struct to work inside synsuite
│       │   ├── package.json
│       │   ├── public/
│       │   │   └── index.html
│       │   ├── src/
│       │   │   └── index.js
│       │   ├── webpack.config.js
│       │   └── gulpfile.js     // script that publishing the build to synsuite
│       │
│       └── marvel/
│           ├── package.json
│           ├── public/
│           │   └── index.html
│           ├── src/
│           │   └── index.js    // working only with react struct
│           └── webpack.config.js
│       
├── components/                 // components implementation to use them on differents apps/dashboards/features
│   ├── web/
│   │   └── */                      // react struct
│   │       ├── package.json
│   │       └── src/
│   │           └── index.js    
│   │  
│   └── mobile/
│       └── */                      // react native struct
│           ├── package.json
│           └── src/
│               └── index.js     
│
├── dashboards/                 // group of features to show it on same page
│   ├── web/
│   │   └── */                      // react struct
│   │       ├── package.json
│   │       └── src/
│   │           └── index.js    
│   │  
│   └── mobile/
│       └── */                      // react native struct
│           ├── package.json
│           └── src/
│               └── index.js    
│
├── features/                   // screens and pieces of features to show
│   ├── web/
│   │   └── */                      // react struct
│   │       ├── package.json
│   │       └── src/
│   │           └── index.js    
│   │  
│   └── mobile/
│       └── */                      // react native struct
│           ├── package.json
│           └── src/
│               └── index.js      
│
├── services/                   // communication protocol services (eg. HTTP)
│   ├── integrations/           // functions that know how do fetch (get, post, put, delete and download) data from web
│   │   ├── http/               
│   │   │   ├── package.json
│   │   │   └── src/
│   │   │       └── index.js    
│   │   ├── csharp-microservices/     // functions that know how do fetch (get, post, put, delete and download) data from C# Api            
│   │   │   ├── package.json
│   │   │   └── src/
│   │   │       └── index.js    
│   │   │
│   │   └── wiki/               // functions that know how do get data from Syntesis Wikipedia
│   │       ├── package.json
│   │       └── src/
│   │           └── index.js   
│   │  
│   ├── utils/
│   │   └── */                  // complement components from backend
│   │       ├── package.json
│   │       └── src/
│   │           └── index.js 
│   │
│   └── */                      // functions that import service/integrations/csharp-microservices and only know do specific http fetch
│       ├── package.json
│       └── src/
│           └── index.js
│
└── yarn.lock
```

## Global Dependencies

This project has global dependencies dependent of context.

So, if you install a global dependency on root package.json, this dependency will be linked as dependency that all apps, features, components and services.

If you install a dependency on `apps/**/*` level, this dependency will are linked as dependency of this specific app, and the dependency will be used on packages that you are importing on this app.

If you install a dependency on any another package.json, this dependency can be used only inside this specific package.

Check the package.json files to see the scopes dependencies.
