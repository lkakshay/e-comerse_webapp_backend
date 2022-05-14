
const jwt = require('jsonwebtoken')
require('dotenv').config()
const key=process.env.JWT_KEY

module.exports=(data)=>{

    return token = jwt.sign({ data}, key);

}

