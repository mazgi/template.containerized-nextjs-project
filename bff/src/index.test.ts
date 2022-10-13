import express from 'express'

describe('App', () => {
  test('should be the same port to config', async () => {
    const app = express()
    app.set('port', 4000)
    expect(app.get('port')).toBe(4000)
  })
})
