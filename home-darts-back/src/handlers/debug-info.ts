/**
 * TODO: req typing
 * @param {import('express').Request} req
 * @param {import('express').Response<any, Record<string, any>, number>} res
 * @param {import('express').NextFunction} next
 */
export const debugInfo = (req, res, next) => {
  console.log('------------------------------------');
  console.info(req.method, req.url);
  next();
};
