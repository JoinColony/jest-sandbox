/* @flow */
/* eslint-env jest */
/* eslint-disable no-underscore-dangle, class-methods-use-this */

const createSandbox = require('..');

test('Initialises correctly', () => {
  const sandbox = createSandbox();
  expect(sandbox._mocks).toEqual([]);
});

test('Initialisation shortcut', () => {
  const sandbox = createSandbox();
  expect(sandbox._mocks).toEqual([]);
});

test('Provides jest mocks', () => {
  const sandbox = createSandbox();
  const mock = sandbox.fn();
  mock('a');
  expect(jest.isMockFunction(mock)).toBeTruthy();
  expect(mock).toBeCalledWith('a');
});

test('Keeps track of mocks', () => {
  const sandbox = createSandbox();
  const mock = sandbox.fn();
  expect(sandbox._mocks[0]).toBe(mock);
});

test('Supports spyOn', () => {
  const sandbox = createSandbox();
  class CoolClass {
    hello() {
      return 'hello';
    }
  }
  const mock = sandbox.spyOn(CoolClass.prototype, 'hello');
  const cool = new CoolClass();
  cool.hello();
  expect(mock).toHaveBeenCalled();
  sandbox.clear();
  expect(mock.mock.calls).toHaveLength(0);
});

test('Clears all mocks', () => {
  const sandbox = createSandbox();
  const mockA = sandbox.fn();
  const mockB = sandbox.fn();
  mockA('a');
  mockB('b');
  expect(mockA).toBeCalledWith('a');
  expect(mockB).toBeCalledWith('b');
  sandbox.clear();
  expect(mockA.mock.calls).toHaveLength(0);
  expect(mockB.mock.calls).toHaveLength(0);
});

test('Resets all mocks', () => {
  const sandbox = createSandbox();
  const mockA = sandbox.fn(() => 'a');
  const mockB = sandbox.fn(() => 'b');
  const a = mockA();
  const b = mockB();
  expect(a).toEqual('a');
  expect(b).toEqual('b');
  sandbox.reset();
  const x = mockA();
  const y = mockB();
  expect(x).toBeUndefined();
  expect(y).toBeUndefined();
});

test('Restores all spies', () => {
  const sandbox = createSandbox();
  class CoolClass {
    hello() {
      return 'hello';
    }
  }
  sandbox
    .spyOn(CoolClass.prototype, 'hello')
    .mockImplementation(() => 'yo, homie');
  const cool = new CoolClass();
  expect(cool.hello()).toBe('yo, homie');
  sandbox.restore();
  expect(cool.hello()).toBe('hello');
});
