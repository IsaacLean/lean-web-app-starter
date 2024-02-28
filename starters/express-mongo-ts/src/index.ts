import 'dotenv/config'

import app from './app'

if (!process.env.PORT_APP) {
    throw new Error('🔴 App port was not set')
}

const PORT = Number(process.env.PORT_APP)

app.listen(PORT, () => console.log(`🟢 Example app listening on port ${PORT}`))
