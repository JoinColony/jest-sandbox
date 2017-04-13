export class JestSandbox {
  constructor() {
    this._mocks = [];
  }
  _each(method, ...args) {
    this._mocks.forEach(mock => mock[method](...args));
  }
  fn(...args) {
    const mock = jest.fn(...args);
    this._mocks.push(mock);
    return mock;
  }
  clear() {
    this._each('mockClear');
  }
  reset() {
    this._each('mockReset');
  }
}

export default () => new JestSandbox();
