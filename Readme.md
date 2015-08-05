Pebble Time (aka Basalt)
========================

Pebble... It's a watch!
Here's some reasonable info about it:
[http://developer.getpebble.com/sdk/whats-new](http://developer.getpebble.com/sdk/whats-new)

Hardware
--------

* Microphone
* Accelerometer
* Compass
* 64-color e-paper display
* 4 Buttons
* 144 x 168 px resolution
* Max. resource size - 256k
* Max. app size (code + heap)	24k	64k
* Power + smart accessory port
* Seven-day battery life
* Water resistance
* Bluetooth

Getting set up
--------------

Get the SDK

```sh
$ brew install pebble/pebble-sdk/pebble-sdk
```

Generate a new hello world project
(if you're using this one,
you don't need to do this step,
just cd to this directory).

```sh
$ pebble new-project -vvv --javascript playing-with-pebble
$ cd playing-with-pebble
```

The new project printed out this data, which is probably not necessary to know, but might be relevant ...so keeping it in ;)

```javascript
Queueing analytics data:
{ platform: 'native_sdk',
  data: {},
  event: 'invoke_command_new-project',
  identity: { sdk_client_id: '5ca55520-990c-495a-b24e-d60275c36385' },
  sdk:
   { host:
      { platform: 'Darwin-13.2.0-x86_64-i386-64bit',
        python_version: '2.7.5',
        is_vm: false },
     version: '3.2' } }


Queueing analytics data:
{ platform: 'native_sdk',
  data: { javascript: true, worker: false },
  event: 'sdk_create_project',
  identity: { sdk_client_id: '5ca55520-990c-495a-b24e-d60275c36385' },
  sdk:
   { host:
      { platform: 'Darwin-13.2.0-x86_64-i386-64bit',
        python_version: '2.7.5',
        is_vm: false },
     version: '3.2' } }
```

Launch the emulator

```
$ pebble install --emulator basalt
```

Build the code and load it onto the emulator.

```
$ pebble build
$ pebble install
```

Use the arrow keys mimic the buttons:

* up: up
* down: down
* right: select
* left: something, idk

When you `console.log` from the JavaScript,
it prints to the logs, which you can see with `pebble logs`
and then pressing the arrow keys, like before.

```
$ pebble logs
[18:50:15] g-with-pebble.c:56> Done initializing, pushed window: 0x20020398
[18:50:15] javascript> Hello world! - Sent from your javascript application.
[18:50:17] ocess_manager.c:368> Heap Usage for App <playing-wi: Total Size <64672B> Used <368B> Still allocated <28B>
```


Installing Underscore
---------------------

Give JavaScript some reasonable enumerable methods with
[underscore.js](http://underscorejs.org/).
There is probably a way to do this with npm,
but IDK what it is, and this worked, so for now,
I'll just document this set of steps I ran through.

```
$ cd build
$ mkdir -p underscore
$ cd underscore
$ underscore_tgz="$(npm pack underscore)"
$ tar -xzf "$underscore_tgz"
$ cd ../..
$ cp underscore-min.js ../../src/js/underscore-min.js
```

Installing NPM
--------------

To test it, we'll use [mocha](https://github.com/mochajs/mocha/wiki).
We need to let [npm](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
know how to work with our app by making a `package.json` file.

Also included a couple of other useful scripts
(`env` to see the environment variables of the npm environment,
and `exec` to allow you to run arbitrary
shell commands inside of that environment)

```javascript
{
  "private": true,
  "name": "MY-APP-NAME",
  "scripts": {
    "test": "env NODE_PATH=src mocha",
    "exec": "exec",
    "env":  "env"
  },
  "devDependencies": {
    "mocha": "~2.2",
  },
  "files": [
    "src"
  ]
}
```

Now install these with (this command may take a while)

```sh
$ npm install
```

You should now see a `node_modules` directory,
which contains the source code for mocha.

We don't want to commit these downloaded packages,
so add it to the `.gitignore`

```sh
$ git status # you should see node_modules as a new directory
$ echo node_modules >> .gitignore
$ git status # you should not see node_modules anymore
```

And now verify that everything is setup correctly by running mocha with `npm run test`,
you should see that there are no tests for it to run.

```sh
$ npm run test

> playing-with-pebble@ test /Users/josh/deleteme/playing-with-pebble
> mocha
  0 passing (1ms)
```

Now would be a good time to commit :)


Adding a first test
-------------------

You need a test dir with a test in it.

```sh
$ mkdir test
$ touch test/test.js
```

Now edit the contents of `test/test.js` to look like this:

```javascript
var assert = require("assert")
describe('Array#indexOf()', function() {
  it('should return -1 when the value is not present', function () {
    assert.equal(-1, [1,2,3].indexOf(5));
    assert.equal(-1, [1,2,3].indexOf(0));
  });
});
```

And run the test with `npm run test` to see that it works (you should have 1 passing test):

```sh
$ npm run test

> playing-with-pebble@ test /Users/josh/deleteme/playing-with-pebble
> mocha
  Array#indexOf()
    ✓ should return -1 when the value is not present
  1 passing (3ms)
```

Lets load up the node environment so we can look at what assertion methods are available:

```javascript
$ npm run exec node

> playing-with-pebble@ exec /Users/josh/deleteme/playing-with-pebble
> exec node

> var a = require("assert") // require the assert code from mocha
undefined

> a
{ [Function: ok]
  AssertionError:
   { [Function: AssertionError]
     super_:
      { [Function: Error]
        captureStackTrace: [Function: captureStackTrace],
        stackTraceLimit: 10 } },
  fail: [Function: fail],
  ok: [Circular],
  equal: [Function: equal],
  notEqual: [Function: notEqual],
  deepEqual: [Function: deepEqual],
  notDeepEqual: [Function: notDeepEqual],
  strictEqual: [Function: strictEqual],
  notStrictEqual: [Function: notStrictEqual],
  throws: [Function],
  doesNotThrow: [Function],
  ifError: [Function] }


> a.ok(true) // the ok method looks promising, lets make sure it's for asserting truth
undefined
> a.ok(false) // and this one raises an error. nice
AssertionError: false == true
    at repl:1:4
    at REPLServer.self.eval (repl.js:110:21)
    // ...

> a.deepEqual([1,2], [1,2]) // there's also a deepEqual method, maybe we can use that to get around shitty array equality
undefined
> a.deepEqual([1,2], [1,3]) // yep ^_^
AssertionError: [1,2] deepEqual [1,3]
    at repl:1:4
    at REPLServer.self.eval (repl.js:110:21)
    at Interface.<anonymous> (repl.js:239:12)
    // ...

> // and now press Control+D to exit the repl
```

Cool. From here, you can edit the test, and write your implementation to get the code you want.
In my case, I wanted a game of life to display on the pebble, so I have code to make sure that
stuff works correctly.


