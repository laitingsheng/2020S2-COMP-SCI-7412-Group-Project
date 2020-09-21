import cookie_parser from "cookie-parser"
import csurf from "csurf"
import express, { Request, Response } from "express"

const _csrf = csurf({ cookie: { sameSite: true, secure: true } })

const _app = express()

_app.use(express.json())
_app.use(cookie_parser())

_app.get('/form', _csrf, (req: Request, res: Response) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() })
})

_app.post("/verify", (req: Request, res: Response) => {
})

_app.listen(80)
