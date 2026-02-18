const jwt = require('jsonwebtoken');

const verif_token = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(403).send({"msg": "No token, authorization denied"});
        return;
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET);
        console.log(payload)
        req.user_auth = {user_id: payload.user_id, pseudo: payload.pseudo};
        if (payload) next();
    } catch { res.status(403).send({"msg": "Token is not valid"}); }
}

module.exports = verif_token;