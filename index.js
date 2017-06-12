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
  spyOn(...args) {
    const mock = jest.spyOn(...args);
    this._mocks.push(mock);
    return mock;
  }
  clear() {
    this._each('mockClear');
  }
  reset() {
    this._each('mockReset');
  }
  restore() {
    this._each('mockRestore');
  }
}

export default () => new JestSandbox();
