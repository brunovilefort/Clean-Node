import { RequestHandler } from 'express'

export const cors: RequestHandler = (req, res,next): void => {
  res.set('access-controll-allow-origin', '*')
  res.set('access-controll-allow-methods', '*')
  res.set('access-controll-allow-headers', '*')
  next()
}
