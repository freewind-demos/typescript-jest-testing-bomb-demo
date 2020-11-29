import testingBomb from './testingBomb';

describe('testingBomb', () => {
  it('throws error if access to non-provided values', () => {
    const obj: { name: string } = testingBomb();
    expect(() => obj.name).toThrowError(`Should not access testing-dummy object by getting "name"`);
  });

  it('throws error if set a non-provided value', () => {
    const obj: { name: string } = testingBomb();
    expect(() => {
      obj.name = 'new-name';
    }).toThrowError(`Should not access testing-dummy object by setting "name=new-name"`);
  });

  it('allows to access pre-provided values', () => {
    const obj: { name: string } = testingBomb({ name: 'hello' });
    expect(obj.name).toBe('hello');

    obj.name = 'new-hello';
    expect(obj.name).toBe('new-hello');
  });
});
