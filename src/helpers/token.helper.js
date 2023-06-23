const { User, validUser, validLoginUser } = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

const KEY = process.env.SECRET_KEY;

// const generateToken = async (meter_number, amount) => {
//     try {

//         const token = jwt.sign({ id: result._id }, KEY, { expiresIn: '6h' })       
//         return token;
//     }
//     catch (err) {
//         return null;
//     }
// }
// Function to generate a random string of specified length
function generateRandomString(length) {
    const min = 10000000; // Minimum value (inclusive) for an 8-digit number
    const max = 99999999; // Maximum value (inclusive) for an 8-digit number
  
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  
    return randomNumber.toString();
}
function generateToken(meterNbr, amount){
    const tokenLength = 8;
    const days = Math.floor(amount / 100);
    const tokenExpirationHours = days*24;
    const token = generateRandomString(tokenLength);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + tokenExpirationHours);
    
    // Log the generated token and expiration date
    console.log('Generated Token:', token);
    console.log('Expiration Date:', expirationDate);
    const tokenInfo = {
        token: token,
        token_value_days: days,
        expiryTime: expirationDate
    }
    return tokenInfo
}
// Generate a token of length 8 with an expiration date of 6 hours from now


module.exports = { generateToken }