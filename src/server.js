import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import routes from '../src/routes/routes.js'

const main = async (req, res) => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))

    app.use(routes)

    app.listen(process.env.PORT, ()=>{
        console.log("Servidor online")
    })
}

main()
