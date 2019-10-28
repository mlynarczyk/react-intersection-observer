declare module 'raf-throttle' {
  type Callback = (...args: any[]) => any;
  function rafThrottle<T extends Callback>(callback: T): T & { cancel(): void };
  export = rafThrottle;
}
