export function isConcrete<T>(item: T | undefined | null): item is T {
  return item !== undefined && item !== null;
}

// FIXME will rename to testingBomb
export default function testingBomb<T>(originObj: Partial<T> = {}): T {
  const bomb = new Proxy(originObj, {
    get(target, prop) {
      if (isConcrete(target) && prop in target) {
        // @ts-ignore FIXME how to avoid the compilation error
        return target[prop];
      }
      console.log('### get', {target, prop});
      throw new Error(`Should not access testing-bomb object by getting "${String(prop)}"`);
    },
    set(target, prop, value: any): boolean {
      if (isConcrete(target) && prop in target) {
        // @ts-ignore FIXME how to avoid the compilation error
        target[prop] = value;
        return true;
      }
      console.log('### set', {target, prop, value});
      throw new Error(`Should not access testing-bomb object by setting "${String(prop)}=${value}"`);
    },
  });
  return bomb as T;
}
