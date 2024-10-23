import 'dotenv/config'

import app from './app'

if (!process.env.PORT_EXPRESS) {
    throw new Error('🔴 Express port was not set')
}

const PORT = Number(process.env.PORT_EXPRESS)

app.listen(PORT, () => console.log(`🟢 Server listening on port ${PORT}`))
