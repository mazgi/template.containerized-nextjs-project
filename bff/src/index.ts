import cookieParser from 'cookie-parser'
// import cors from 'cors'
import express from 'express'

const start = async (): Promise<void> => {
  const app = express()
  app.set('port', 4000)
  app.use(cookieParser())

  app.listen(app.get('port'), () => {
    app.get('/api/status', (req, res) => res.json({}))
    console.log(
      `⚡ App is running at :%d in %s mode`,
      app.get('port'),
      app.get('env')
    )
    console.log('  Press CTRL-C to stop' + '\n')
  })
}
start()
