const express = require('express');
const router = express.Router();
const Todos = require('../models/todos.model');
const User = require('../models/User');

const jwt = require('jsonwebtoken');


//get all
router.get('/', verifyToken, async (req, res) => {
    try {
        const todos = await Todos.find();
        res.json(todos);
    } catch (err) {
        res.json({ message: err });
    }
});

//get by ID
router.get('/:todoId', async (req, res) =>{
    try {
        const todo = await Todos.findById(req.params.todoId);
        res.json(todo);
    } catch (err) {0
        res.json({ message: err });
    }
});

//create new
router.post('/', async (req, res) => {
    const todo = new Todos({
        title: req.body.title,
        description: req.body.description
    });
    
    try {
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (err) {
        res.json({ message: err });
    }
});

// update
router.patch('/:todoId', async (req, res) => {
    try {
        const updatedTodo = await Todos.updateOne(
            { _id: req.params.todoId },
            { $set: {
                title: req.body.title,
                description: req.body.description
            }}
        );
        res.json(updatedTodo);
    } catch (err) {
        res.json({ message: err });
    }
});

// delete 
router.delete('/:todoId', async (req, res) => {
    try {
        const removedTodo = await Todos.deleteOne({ _id: req.params.todoId });
        res.json(removedTodo);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

    const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;