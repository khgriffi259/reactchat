const Validator = require('validator');

module.exports = function( data ) {

    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}