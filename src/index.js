/* @flow */
/* eslint-env jest */
/* global JestMockFn */

class JestSandbox {
  _mocks: Array<JestMockFn<*, *>>;
  constructor() {
    this._mocks = [];
  }
  _each(method: string, ...args: Array<any>): void {
    this._mocks.forEach(mock => mock[method](...args));
  }
  fn(...args: Array<any>): Function {
    const mock = jest.fn(...args);
    this._mocks.push(mock);
    return mock;
  }
  spyOn(...args: Array<any>): Function {
    const mock = jest.spyOn(...args);
    this._mocks.push(mock);
    return mock;
  }
  clear(): void {
    this._each('mockClear');
  }
  reset(): void {
    this._each('mockReset');
  }
  restore(): void {
    this._each('mockRestore');
  }
}

const createSandbox = () => new JestSandbox();

module.exports = createSandbox;
