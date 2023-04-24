const User = require('../models/User.model');
const { verifyPassword } = require('../utils/utillities');

async function signup(req, res) {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });

    const token = await user.generateAuthToken();

    return res.send({
        message: 'Success',
        token
    });
}

async function signin(req, res) {
    const { identifier, password } = req.body;
    const user = await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    });


    if (!user) return res.status(400).send({ message: 'Invalid credentials' });

    if (!(await verifyPassword(password, user.password)))
        res.status(400).send({ message: 'Invalid Credentials' });

    const token = await user.generateAuthToken();

    return res.send({
        message: 'Success',
        token
    });
}

async function signout(req, res) {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token);

    await req.user.save();
    return res.send({
        message: 'Success'
    });
}

module.exports = { signin, signup, signout };