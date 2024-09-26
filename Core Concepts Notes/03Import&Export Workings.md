## Types of module pattern

- There are 2 types of modul pattern we follows: `CommonJS modules (CJS), ES modules (ESM)`

- `(i) CommonJS Modules(CJS)`
    - export: module.exports ={ } // module.export = { data } 
    - import: require("./path) // const { data } = require("./path)
    - by default use Node.js
    - older way
    - Syncronization
    - Not Strict 

- `(ii) ES modules(ESM) `
    - export: export  // export function data(){}
    - import: import // import data from "./path"
    - by default use react.js or othere frameworks
    - newer way
    - Async
    - Strict
    - ES modules typically use the .mjs extension.

` Synchronous vs. Asynchronous: ` CommonJS requires modules in a
synchronous manner, meaning the next line of code will execute only after the
module has been loaded. In contrast, ES modules load modules
asynchronously, allowing for more efficient and flexible code execution. This
distinction is a powerful feature. 

` Strict Mode:` Another significant difference is that CommonJS code runs in
non-strict mode, while ES modules execute in strict mode. This means that ES
modules enforce stricter parsing and error handling, making them generally
safer and more reliable. 


## Staps to use the Es Module: 

    (i) First, you need to create a new file called package.json.

    (ii) Now add the property like that: 
``` javascript
{
    "type" : "module"
}
```

## Behind the seen working at the time of the import the another modules:

- At the time of the import the any module(file/folder) with the use of the require("./path") then Node.js directly execute them (IIFE).

- But that module's variables and function cannot change by that imported file (where we use the require("./path)).

    - NOTE: IIFE in a self calling js functions that can imidiatlly call the function. 
        - Syntex: (function (){})() 

- Node.js make a bundle of that imorted folder or file so we cannot change their file property.

- Node.js make file functions and varibles private in any other file/folder or modules.