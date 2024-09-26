
## What is a server?

- A server is essentially a remote computer. You can think of it as a computer
whose CPU works remotely.
- Servers can be accessed over a network to provide resources and services to
other computer programs.
- ` A server is a computer or system that provides data, services, resources, or
programs to other computers, known as clients, over a network. `

## What is V8?

- `V8 is Google's open source high-performance javascript and webAssembly engine, written in C++.`
- it is used in Chrome and Node.js, among others. it implements `ECMAScript` and `WebAssembly`, and runs on Windows, macOS and Linux Systems that uses x64, IA-32 or ARM Processors. 

- `V8 can be embedded into any C++ application.`

## JS Code Execution Staps:

                |---------------------------------|
                |         JavaScript Code         |
                |---------------------------------|
                |       C++ Code (V8 engine)      | 
                |---------------------------------|            
                |          Machine Code           |
                |---------------------------------|
                |          Assembly Code          |
                |---------------------------------|
                |          Binary Code            |
                |---------------------------------|
                 

## What is ECMAScript?

- ECMAScript is a standard for scripting languages, including JavaScript,
JScript, and ActionScript. It is best known as the standard that defines
JavaScript.
- ECMAScript standards are followed by `JavaScript engines like V8,
SpiderMonkey, Chakra`, and others to ensure consistent behavior across
different environments.

#
`v8 engines has to follow this ECMA standards. and node.js has v8
engines, but node.js also has some superpowers, such as api calls on servers,
which make it more powerful than v8 engines alone, which cannot do
database connections, api calls, etc. because of ECMA standards. and this is
known as the JS runtime.`

#
- Node.js works based on the `REPL (Read-Evaluate-Print-Loop)`.

## Basic Structure:

            |----------------------------------|
            |               Node.js            |
            |                                  |
            |   |------------|                 |
            |   |            |    |--------|   |
            |   |   V8 Js    |    |  Super |   |
            |   |    Engine  |    | Powers |   |
            |   |            |    |--------|   |
            |   |------------|                 |
            |----------------------------------|

- Super Power includes a settimeout(), setInterval() global,globalThis etc..