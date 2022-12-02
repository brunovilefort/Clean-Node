import './config/module-alias'
import { app } from './config/app'

import 'dotenv/config'

const port = process.env.API_PORT

app.listen(port, () => console.log(`🏃 Server is running on http://localhost:${port}`))
