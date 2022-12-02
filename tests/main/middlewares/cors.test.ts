import { app } from '@/main/app'

import request from 'supertest'

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-controll-allow-origin', '*')
      .expect('access-controll-allow-methods', '*')
      .expect('access-controll-allow-headers', '*')
  })
})
