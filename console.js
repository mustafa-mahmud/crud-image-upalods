//call this file into your node entry js file like::: require('./helpers/console');
const path = require('path');

['debug', 'log', 'warn', 'error'].forEach((methodName) => {
  const originalLoggingMethod = console[methodName];
  console[methodName] = (firstArgument, ...otherArguments) => {
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const callee = new Error().stack[1];
    Error.prepareStackTrace = originalPrepareStackTrace;
    const relativeFileName = path.relative(process.cwd(), callee.getFileName());
    const prefix = `${relativeFileName}:${callee.getLineNumber()} 👉`;
    if (typeof firstArgument === 'string') {
      originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments);
    } else {
      originalLoggingMethod(prefix, firstArgument, ...otherArguments);
    }
  };
});
