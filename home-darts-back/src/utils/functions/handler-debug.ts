import { isProduction } from '../../config/is-production.js'

const formatDebugHandler = (name: string): string => `  - ${name}`;

export const handlerDebug = (name: string): void => {
  if (!isProduction) {
    console.info(formatDebugHandler(name));
  }
}
