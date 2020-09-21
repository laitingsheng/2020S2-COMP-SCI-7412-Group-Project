import cookie_parser from "cookie-parser"
import csurf from "csurf"
import express from "express"

import verifiers from "./verifiers"

const csrf = csurf({ cookie: { sameSite: true, secure: true } })

const app = express()

app.use(express.json())
app.use(cookie_parser())

app.get('/form', csrf, (req, res) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() })
})

app.post("/verify", (req, res) => {
    const body = req.body
    res.send(await verifiers[body.type](body.fields))
})

app.listen(80)
