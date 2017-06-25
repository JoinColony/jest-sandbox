# jest-sandbox

Track jest spies and stubs easily.

[![Build Status](https://travis-ci.org/JoinColony/jest-sandbox.svg?branch=master)](https://travis-ci.org/JoinColony/jest-sandbox)

The one feature I really missed when switching from [sinon.js](http://sinonjs.org) to jest spies and mocks was _[sandboxes](http://sinonjs.org/releases/v2.1.0/sandbox/)_. They allow you to create as many spies and stubs as you want without having to track them all and clear them manually.

### Meet jest-sandbox:

```javascript
import createSandbox from 'jest-sandbox';

import cow from './moo.js';

describe('A cow 🐄', () => {
  const sandbox = createSandbox();

  // Create as many spies as you like
  const spyStomach = sandbox.fn();
  const spyPoop = sandbox.spyOn(cow, 'poop');

  // Clear 'em all with one call
  beforeEach(sandbox.clear);

  test('Eats grass', () => {
    return cow.eatGrass.then(spyStomach).then(() => {
      expect(spyStomach).toHaveBeenCalledWith('🌱');
      expect(spyPoop).toHaveBeenCalledTimes(0);
    });
  });

  test('Sometimes poops', () => {
    return cow.digest().then(() => {
      expect(spyStomach).toHaveBeenCalledTimes(0);
      expect(spyPoop).toHaveBeenCalledWith('💩');
    });
  });
});
```

### Install

```shell
yarn add jest-sandbox -D
```

Some people prefer `npm`;
```shell
npm i jest-sandbox -D
```

### API

Make a sandbox:

```javascript
import createSandbox from 'jest-sandbox';

const sandbox = createSandbox();
```

#### `sandbox.fn([implementation])`

Returns a new [mock function](https://facebook.github.io/jest/docs/mock-function-api.html) and keeps track of it. Similar to calling `jest.fn([implementation])`.

#### `sandbox.spyOn(object, methodName)`

Spies on a method and returns a the wrapped [mock function](https://facebook.github.io/jest/docs/mock-function-api.html). Similar to calling `jest.spyOn(object, methodName)`.

#### `sandbox.clear()`

Clears all spies in the sandbox. Actually calls `.mockClear()` on every spy it keeps track of.

#### `sandbox.reset()`

Resets all spies in the sandbox. Actually calls `.mockReset()` on every spy it keeps track of.

#### `sandbox.restore()`

Restores all spies in the sandbox. Actually calls `.mockRestore()` on every spy it keeps track of.

#### Note
Keep in mind that you can still clear, reset and restore the single spies manually, like you're used to.

### Contribute

I'm happy for every feature request, bugfix and / or PR.

Run tests:

```shell
yarn test # npm test is also ok
```

Build the whole shebang:

```shell
yarn build # npm build works as well
```
