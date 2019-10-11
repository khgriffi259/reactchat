const db = require('../models');
const bcrypt = require('bcryptjs');
const chatKit = require('../chatkitConfig');
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

exports.authenticate = async (req, res) => {
    try {
        const user = await db.User.findById(req.query.user_id);
        console.log(user);
        if (user) {
            //authenticate chatKit user
            const authData =  chatKit.authenticate({
                userId: req.query.user_id
            })
            console.log(authData);
            res.json(authData.body);

        } else {
            res.status(404).json({error: 'user not found'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.register = async (req, res) => {
    const { email, username, password, password2  } = req.body;
    
    const { isValid, errors } = validateRegisterInput(req.body);
    console.log(errors, isValid);

    if (!isValid) {
        res.status(404).json(errors);
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await db.User.create({email, username, password: hashed});
        
        const ckUser = await chatKit.createUser({
            id: user.id,
            name: user.username,
        });
        
        res.json({user, ckUser});

    } catch (error) {
        if (error.code === 11000){
            errors.invalid = "Sorry that email is already taken";
            res.status(404).json(errors);
            // res.status(404).json({error: "Sorry that email is already taken"})
        } else {
            res.status(400).json(error);
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    const {isValid, errors } = validateLoginInput(req.body);
    console.log(errors, isValid);

    if (!isValid) {
        res.status(404).json(errors);
    }

    try {
        const user = await db.User.findOne({email});
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch){
               res.json({userId: user.id});
            } else {
                errors.invalid = "Invalid username / password" ;
                res.status(404).json(errors);
            } 
        } else {
            errors.invalid = "Invalid username / password" ;
            res.status(404).json(errors);
        }
            
    } catch (error) {
        res.status(400).json(error);
        // error.message = 'Invalid username / password';
        // res.status(404).json({error: error.message});
    }
}

