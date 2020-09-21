import cookie_parser from "cookie-parser"
import csurf from "csurf"
import express, { Request, Response } from "express"

import verifiers from "./verifiers"

const csrf = csurf({ cookie: { sameSite: true, secure: true } })

const app = express()

app.use(express.json())
app.use(cookie_parser())

app.get('/form', csrf, (req: Request, res: Response) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() })
})

app.post("/verify", (req: Request, res: Response) => {
    const body = req.body
})

app.listen(80)
