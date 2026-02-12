import express from 'express'
import client from '../config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()
const database = client.db("Hackathon")
const users = database.collection('Users')

router.post('/register', async (req, res, next) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.age || !req.body.email || !req.body.password) {
            return res.send({
                status: 0,
                message: "Fill out all the fields"
            })
        } else {
            const email = req.body.email.toLowerCase()
            const emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
            if (!email.match(emailFormat)) {
                return res.send({
                    status: 0,
                    message: "fill correct email pattern "
                })
            }
            if (!req.body.password.match(passwordValidation)) {
                return res.send({
                    status: 0,
                    message: "fill correct password pattern"
                })
            }
            const checkUser = await users.findOne({ email: email })
            if (checkUser) {
                return res.send({
                    status: 0,
                    message: "email already exist "
                })
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                email: email,
                password: hashedPassword,
            }
            const insertUser = await users.insertOne(newUser)

            if (!insertUser) {
                return res.send({
                    status: 0,
                    message: "Something went wrong while inserting"
                })
            }
            else {
                return res.send({
                    status: 1,
                    message: "User registered successfully."
                })
            }
        }
    } catch (error) {
        return res.send({
            status: 0,
            message: "something went wrong"
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send({
                status: 0,
                message: "Email and Password is required"
            })
        }
        let email = req.body.email.toLowerCase()
        const emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email.match(emailFormat)) {
            return res.send({
                status: 0,
                message: "email and password is incorrect"
            })
        }
        let user = await users.findOne({ email: email });
        if (!user) {
            return res.send({
                status: 0,
                message: "User is not registered"
            })
        }

        let checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) {
            return res.send({
                status: 0,
                message: "Email or Password is incorrect"
            })
        }
        let token = jwt.sign({
            _id: user._id,
            email,
            firstName: user.firstName,
        }, process.env.SECRET, { expiresIn: "24h" })

        res.send({
            status: 3,
            message: "User Login Successfully",
            "token": token
        })
        console.log(token)

    } catch (error) {
        res.send(error)
    }
})
router.get('/auth/me', (req, res) => {
    try {
        let authToken = req.headers['authorization'].split(' ')[1];
        if (!authToken) {
            return res.status(401).send({
                status: 0,
                message: 'Unauthorized'
            })
        }
        else {
            const decoded = jwt.verify(authToken, process.env.SECRET)
            console.log(decoded, "decoded")
            return res.status(200).send({
                status: 1,
                data: decoded
            })
        }
    }
    catch (error) {
        return res.send({
            status: 0,
            error: error,
            message: "Something Went Wrong"
        })

    }
})
export default router