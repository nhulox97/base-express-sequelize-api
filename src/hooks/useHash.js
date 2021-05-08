const bcrypt = require('bcrypt');

exports.useHash = async (pass) => {
    const bcrypt_salts = Number(process.env.BCRYPT_SALT);
    const pHash = await bcrypt.hash(pass, bcrypt_salts);
    if (!pHash) pHash = pass;
    return [pHash];
};
