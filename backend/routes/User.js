const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/User');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            status: "failed",
            code: 403,
            message: "Token not found Authentication failed",
        });
    }
    let token = req.headers.authorization.split(" ")[1];
    console.log(token)
    if (!token) {
        return res.status(403).json({
            status: false,
            message: "Token not found",
        });
    }
    try {
        const decoded = jwt.verify(token, 'home-care-app');

        console.log('Token is valid', decoded.userId);
        const user = await User.findOne({ _id: decoded.userId })
        console.log(user)

        if (decoded.userName !== user?.username) {
            return res.status(401).json({
                status: false,
                message: "Not Authorized",
            });
        }
        req.userId = decoded?.userId
        req.accessToken = token
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                statusCode: 401,
                status: "FAILURE",
                message: 'Token has expired !'
            });
        } else {
            console.error('Token verification failed', error);
            return res.status(401).json({
                statusCode: 401,
                status: "FAILURE",
                message: 'Authentication failed'
            });
        }
    }
};

//API TO SIGNUP A USER
router.post('/signup', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (validator.isEmpty(username) || validator.matches(username, /[\s.<>{}\[\]\/]/)) {
        return res.status(400).json({
            status: 'FAILURE',
            error: 'Invalid username'
        });
    }

    if (validator.isEmpty(password) || validator.matches(password, /[\s.<>{}\[\]\/]/)) {
        return res.status(400).json({
            status: 'FAILURE',
            error: 'Invalid username'
        });
    }
    try {
        const userExist = await User.findOne({ username })
        if (userExist) {
            return res.status(400).json({
                statusCode: 400,
                status: 'FAILURE',
                error: 'Username already exists'
            });
        }
        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
                username,
                password: hashedPassword
            });
            user.save();
        }).then(() => {
            return res.status(201).json({
                statusCode: 201,
                status: 'SUCCESS',
                message: "Please login to continue"
            })
        })
    } catch (err) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        next(err);
    }
})

//API TO LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const userpassword = req.body.password;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                status: 'FAILURE',
                message: 'No user found'
            })
        }

        const hashedPass = await bcrypt.compare(userpassword, user.password);

        if (!hashedPass) {
            return res.status(401).json({
                statusCode: 401,
                status: "FAILURE",
                message: 'Authentication failed'
            });
        }

        const token = jwt.sign({ userId: user._id, userName: user.username }, "home-care-app", { expiresIn: '30m' }); // Set the expiration time to 1 hour

        res.cookie("AccessToken", token, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

        const { password, ...userData } = user._doc
        return res.status(200).json({
            statusCode: 200,
            status: "SUCCESS",
            accessToken: token,
            data: userData,
            message: 'Authentication successful'
        });
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            statusCode: 403,
            status: "FAILURE",
            message: 'Bad request'
        });
    }
})

//API CREATE A NEW TODO
router.post('/createTodo', verifyToken, async (req, res) => {
    try {
        const { todoTitle } = req.body
        const todo = new Todo({
            todoTitle,
            createdBy: req.userId
        });
        todo.save();

        res.cookie("AccessToken", req.accessToken, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

        return res.status(201).json({
            statusCode: 201,
            status: "SUCCESS",
            accessToken: req.accessToken,
            message: "Todo created"
        })
    } catch (error) {
        return res.status(403).json({
            statusCode: 403,
            status: "FAILURE",
            message: 'Bad request'
        });
    }
})

//API TO GET TODOS
router.get('/getTodos', verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.userId })
        console.log(todos)
        if (!todos) {
            res.status(404).json({
                statusCode: 403,
                status: "FAILURE",
                message: 'Not found'
            });

        }

        res.cookie("AccessToken", req.accessToken, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

        return res.status(200).json({
            statusCode: 200,
            accessToken: req.accessToken,
            status: "SUCCESS",
            data: todos
        })
    } catch (error) {
        return res.status(403).json({
            statusCode: 403,
            status: "FAILURE",
            message: 'Bad request'
        });
    }
})

//API TO UPDATE
router.put('/completed', verifyToken, async (req, res) => {
    try {
        const { todoId } = req.body
        const todo = await Todo.findOne({ _id: todoId })
        console.log(todo.isCompleted)
        if (!todo) {
            return res.status(404).json({
                statusCode: 404,
                status: "FAILURE",
                message: 'Not Found'
            });
        }

        if (todo?.isCompleted === false) {
            await todo.updateOne({ isCompleted: true })
            res.cookie("AccessToken", req.accessToken, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

            return res.status(200).json({
                statusCode: 200,
                status: 'SUCCESS',
                isCompleted: true,
                message: `${todo?.todoTitle} marked as completed`
            })
        } else {
            await todo.updateOne({ isCompleted: false })
            res.cookie("AccessToken", req.accessToken, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

            return res.status(200).json({
                statusCode: 200,
                status: 'SUCCESS',
                isCompleted: false,
                message: `${todo?.todoTitle} marked as incompleted`
            })
        }

    } catch (error) {
        return res.status(404).json({
            statusCode: 404,
            status: "FAILURE",
            message: 'Not Found'
        });
    }
})

//API TO DELETE
router.delete('/delete/:todoId', verifyToken, async (req, res) => {
    try {
        const todoid = req.params.todoId
        const todo = await Todo.findOne({ _id: todoid, createdBy: req.userId })
        console.log(todo)
        if (!todo) {
            return res.status(404).json({
                statusCode: 404,
                status: "FAILURE",
                message: 'Not Found'
            });
        }

        await todo.deleteOne({ _id: todoid, createdBy: req.userId })
        res.cookie("AccessToken", req.accessToken, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

        return res.status(200).json({
            statusCode: 200,
            status: "SUCCESS",
            message: `${todo?.todoTitle} deleted`
        })

    } catch (error) {
        return res.status(404).json({
            statusCode: 404,
            status: "FAILURE",
            message: 'Not Found'
        });
    }
})

//

module.exports = router