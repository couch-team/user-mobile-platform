// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout | null;
  
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      const context = this as ThisParameterType<T>;
  
      if (timeout) clearTimeout(timeout);
  
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
};
export default debounce;