export type ReturnVoid<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? (...args: P) => void : () => void;
