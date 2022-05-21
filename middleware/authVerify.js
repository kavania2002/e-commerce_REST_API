const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT;

async function genPassword(password) {
    return await bcrypt.hash(password, saltRounds); 
}

async function validatePassword(textPassword, hashedPassword) {
    return await bcrypt.compare(textPassword, hashedPassword);
}

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;