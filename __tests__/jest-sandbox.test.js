import createSandbox, { JestSandbox } from '..';

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
