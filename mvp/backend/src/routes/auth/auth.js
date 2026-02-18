const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { read, write } = require("../../config/db");

function generate_token(req, res, account) {
    const token = jwt.sign({"user_id": account.user_id, "pseudo": account.pseudo}, process.env.SECRET);

    res.status(200).send(({"token": token}));
}

router.post("/register", async(req, res) => {
    const {email, password, pseudo} = req.body;

    if (typeof email !== "string" || typeof password !== "string" || typeof pseudo !== "string" || !email || !password || !pseudo) {
        throw new TypeError();
    }

    const result = await read("account");
    const verif = result.filter((item) => item.email === email)[0];
    if (verif) return res.status(401).send({ "msg": "Account already exists"});

    const user_id = crypto.randomUUID();
    const account = {
        email: email,
        password: await bcrypt.hash(password, 12),
        pseudo: pseudo,
        user_id: user_id
    }

    await write(account, "account");
    generate_token(req, res, account);
});

router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
        throw new TypeError();
    }

    const result = await read("account");

    const account = result.filter((item) => item.email === email)[0];
    const compare = account ? await bcrypt.compare(password, account.password) : null;
    if (!account || !compare) return res.status(401).send({"msg": "Invalid Credentials"});

    generate_token(req, res, account);
});

module.exports = router;