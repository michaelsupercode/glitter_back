const express = require("express")
const cors = require("cors")
const { nanoid } = require("nanoid")

const { sendEmail } = require("./sendEmail");

const PORT = 6099
const app = express()

const usersArray = [
    {
        id: nanoid(),
        name: "Romy",
        email: "schneider@carre.fr",
    }
]

app.use(cors())
app.use(express.json())

app.use(express.static("uploads"))

app.get("/", (_, res) => res.send("do U see me naked??:)"));

app.get("/users", (req, res) => {
    res.json(usersArray)
})

const welcomeMessage = (name) => `
Hallo ${name}!
`

app.post("/users/registerUser", (req, res) => {
    const name = req.body.name
    const email = req.body.email

    const newUser = {
        id: nanoid(),
        name,
        email
    }

    const foundUser = usersArray.find(u => u.email === email)
    if(foundUser) {
        res.status(400).json({ error: "User already exists."})
        return
    }

    sendEmail({
        to: 'tsvjesingen@web.de',
        subject: "hey..",
        message: welcomeMessage(name)
    }).then(() => {
        usersArray.push(newUser)
        res.json(usersArray)
    }).catch((err) => {
        res.status(400).json({ error: "User wasn NOT registered, please try again, please use valid email."})
    })
})

app.listen(PORT, () => console.log("serving at...", PORT))