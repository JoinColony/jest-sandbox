import createSandbox, { JestSandbox } from '../index.js';

test('Initialises correctly', () => {
  const sandbox = new JestSandbox();
  expect(sandbox._mocks).toEqual([]);
});

test('Initialisation shortcut', () => {
  const sandbox = createSandbox();
  expect(sandbox._mocks).toEqual([]);
});

test('Provides jest mocks', () => {
  const sandbox = new JestSandbox();
  const mock = sandbox.fn();
  mock('a');
  expect(jest.isMockFunction(mock)).toBeTruthy();
  expect(mock).toBeCalledWith('a');
});

test('Keeps track of mocks', () => {
  const sandbox = new JestSandbox();
  const mock = sandbox.fn();
  expect(sandbox._mocks[0]).toBe(mock);
});

test('Supports spyOn', () => {
  const sandbox = new JestSandbox();
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
  const sandbox = new JestSandbox();
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
  const sandbox = new JestSandbox();
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
  const sandbox = new JestSandbox();
  class CoolClass {
    hello() {
      return 'hello';
    }
  }
  const fn = sandbox.fn();
  const spy = sandbox
    .spyOn(CoolClass.prototype, 'hello')
    .mockImplementation(() => 'yo, homie');
  fn('a');
  expect(fn).toBeCalledWith('a');
  expect(fn.mock.calls).toHaveLength(1);
  expect(fn.mock.instances).toHaveLength(1);
  const cool = new CoolClass();
  expect(cool.hello()).toBe('yo, homie');
  expect(spy.mock.calls).toHaveLength(1);
  expect(spy.mock.instances).toHaveLength(1);
  sandbox.restore();
  expect(fn.mock.calls).toHaveLength(1);
  expect(fn.mock.instances).toHaveLength(1);
  expect(cool.hello()).toBe('hello');
  expect(spy.mock.calls).toHaveLength(1);
  expect(spy.mock.instances).toHaveLength(1);
});