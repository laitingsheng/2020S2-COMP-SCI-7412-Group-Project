import cookie_parser from "cookie-parser"
import csurf from "csurf"
import express from "express"

import verifiers from "./verifiers.js"

const csrf = csurf({ cookie: { sameSite: true, secure: true } })

const app = express()

app.use(express.json())
app.use(cookie_parser())

app.get('/form', csrf, async (req, res) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() })
})

app.post("/verify", async (req, res) => {
    try {
        const body = req.body
        res.send(await verifiers[body.type](body.fields))
    } catch(e) {
        res.sendStatus(400)
    }
})

app.listen(8080)

export default app
