export const logger = (...args: any) => {
  // eslint-disable-next-line no-console
  console.log("🚀", ...args);
};

export const error = (...args: any) => {
  // eslint-disable-next-line no-console
  console.error("🚨", ...args);
};
