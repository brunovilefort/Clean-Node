<<<<<<< Updated upstream
import { app } from '@/main/config/app'
=======
import { app } from '@/main/app'
>>>>>>> Stashed changes

import request from 'supertest'

describe('ContentType Middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  it('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
