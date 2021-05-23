const util = require('util');
const pwhas = require('password-hash-and-salt');

// json web token
const jwt = require('jsonwebtoken');

// print process.argv
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

const password = process.argv[2];
const promiseHash = util.promisify(pwhas(password).hash);

async function hashed() {
    let hash = await promiseHash();
    console.log('Hash value:', hash);

    pwhas('invalid password').verifyAgainst(
        hash,

        (err, verified) => {
            if (err) throw new Error(err);
            if (!verified) console.log('Incorrect password');
            else {
                console.log('Correct!');
            }
        },
    );
}

new Promise((resolve, reject) => {
    const authJwtToken = jwt.sign(
        {
            cool: 'test',
        },
        'secret key',
    );

    console.log('JSON Web Token:', authJwtToken);

    resolve({ authJwtToken });
});

hashed();
