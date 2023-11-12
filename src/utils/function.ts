export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const throttle = (fn: Function, ms: number) => {
  let ready: boolean = true;
  return function (this: any, ...args: any[]) {
    if (!ready) return;

    ready = false;

    setTimeout(() => {
      ready = true;
    }, ms);

    return fn.apply(this, args);
  };
};
