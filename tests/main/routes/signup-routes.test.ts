import { app } from '@/main/config/app'

import request from 'supertest'

describe('SignUp Routes', () => {
  it('Should return an account on success', async () => {
    const { status } = await request(app)
      .post('/api/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })

    expect(status).toBe(200)
  })
})
