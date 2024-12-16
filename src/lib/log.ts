export const debugLog = (...args: unknown[]) =>
  process.env.NODE_ENV === 'development' && console.debug(...args);
