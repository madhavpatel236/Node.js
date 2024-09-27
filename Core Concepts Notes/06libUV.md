- We will use the libuv to do a Async task of the Nodejs.
- libuv is a librery which is handle all the Async task.

# Structure of the libuv
- There are basically 3 core things in the libuv.
    - (i) Callback Queue
    - (ii) Event loop
    - (iii) Thread pool

    ## (i) Callback Queue:
    - In the callback queue where we can store the callback after complete the operation.

    - There are also `priority queue for the process.nextTick() and promise.callback()`
    - When the callback is ready to execute in the main thread or in the V8 but if main thread will not empty then we cannot execute the callbacks.
    - So for check the main thread empty or not we use the event loop.

    ## (ii) Event Loop:
    - Event loop is also popular as a heart of the libuv.

    - It allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded. 
    - The main opration or work of the Event loop is to `check the callback queue` and `parellarly check the main thread`(Which is in the V8) status(empty or not for execute the Async callbackes).

    - ### Structure of the Event loop

        ![Event loop Structure](./Images/libuv-eventloop1.png)

    - from the image we see that there are main 4 stages of the event loop.
        - #### Stage:1 `timer` 
            - This is the innitial stage from where event loop starts.  
            - in this timer stage we have a two function which is execuded which is `setTimeout()` and `setInterval()`
        
        - #### Stage:2 `poll` 
            - After timers, the event loop enters the Poll phase, which is crucial because it handles I/O callbacks. For instance, when you perform a file read operation using `fs.readFile` , the callback associated with this I/O operation will be executed in this phase. The Poll phase is responsible for handling all I/O-related tasks, making it one of the most important phases in the event loop.
            - in this stage we have a `API request, file read, fs, crypto, http` ext.

        - #### Stage:3 `check` 
            - Next is the Check phase, where callbacks scheduled by the `setImmediate`  function are executed. This utility API allows you to execute  callbacks immediately after the Poll phase, giving you more control over the order of operations.

        - #### Stage:4 `close`   
            - Finally, in the Close Callbacks phase, any callbacks associated with closing operations, such as socket closures, are handled. This phase is typically used for cleanup tasks, ensuring that resources are properly released.


    - This is the very basic structure of the eventloop at the time of execution this is the half of the things.

    - Now we see the advance or actual way of how the eventloop works.

    ![Advanced eventloop working](./Images/libuv-eventloop2.png)

    - In the 2nd image we see that there are one another inner loop which has a `process.nextTick()` and `promise callback`
    - #### Full working path of the event loop
        - Check this one by one if present then send in the main thread otherwise move forward.

        - (1) process.nextTick()  
        - (2) promise callback
        - (3) timer 
        - (4) process.nextTick()
        - (5) promise callback
        - (6) poll 
        - (7) process.nextTick()
        - (8) promise callback
        - (9) check
        - (10) process.nextTick()
        - (11) promise callback

        ### Importent Concept of poll
        - When the `event loop is empty` and there are no more tasks to execute, it `enters the poll phase` and essentially waits for incoming events.
        - `NOTE`: At that time when the event loop is start then it execute in the clock wise which means that `check is executed before the timer.`

        ![poll concept](./Images/libuv-eventloop3.png)



<!-- write the code explaination for that event loop at the end of the `Full working path of the event loop ` -->
