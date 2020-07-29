const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
}

const comparePasswords = async (password, passwordDigest) => {
    return await bcrypt.compare(password, passwordDigest); // TRUE if a match, FALSE if not
}

const formatStr = str => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}


module.exports = {
    hashPassword,
    comparePasswords,
    formatStr,
}